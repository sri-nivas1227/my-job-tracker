import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION_NAME,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
type fileUploadType = {
  fileName: string;
  fileType: string;
  userId: string;
};

export async function POST(req: NextRequest) {
  console.log("file upload route hit");
  const body: fileUploadType = await req.json();
  const fileName = body.fileName;
  const fileType = body.fileType;
  const userId = body.userId;
  const folderName = process.env.AWS_S3_ROOT_FOLDER;
  const s3Key = `${folderName}/${userId}/${Date.now()}_${fileName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: s3Key,
    ContentType: fileType,
  });
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const viewUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION_NAME}.amazonaws.com/${s3Key}`;
  return NextResponse.json({
    success: true,
    data: { signedUrl: signedUrl, viewUrl: viewUrl, s3Key: s3Key },
  });
}
// Compare this snippet from src/app/api/applications/route.ts:
