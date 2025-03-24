import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const applications = await prisma.application.findMany();
  return NextResponse.json({
    success: true,
    data: { applications: applications },
  });
}
type createApplicationType = {
  id?: string;
  role: string;
  company: string;
  job_link: string;
  date_applied: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  resume_link: string;
  cover_letter_link: string;
  notes: string;
  status: string;
};
export async function POST(req: NextRequest) {
  const data: createApplicationType = await req.json();
  const application = await prisma.application.create({
    data: {
      role: data.role,
      company: data.company,
      job_link: data.job_link,
      date_applied: new Date(data.date_applied),
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone,
      status: data.status,
      notes: data.notes ? data.notes : "",
      resume_link: data.resume_link,
      cover_letter_link: data.cover_letter_link,
      userId: "201bc91a-5406-4666-a209-04bd00c4c3c2",
    },
  });
  return NextResponse.json({
    success: true,
    data: { application: "" },
  });
}
type editApplicationType = {
  id: string;
  update_data: {
    role: string;
    company: string;
    job_link: string;
    date_applied: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    status: string;
  };
};

export async function PUT(req: NextRequest) {
  const reqData: editApplicationType = await req.json();
  const id = reqData.id;
  const oldData = await prisma.application.findUnique({
    where: { id },
  });
  const data = reqData.update_data;
  const updatableData = {};
  Object.keys(data).forEach((key) => {
    if (data[key] && data[key] !== oldData[key]) {
      updatableData[key] = data[key];
    }
  });
  const application = await prisma.application.update({
    where: { id },
    data: updatableData,
  });
  return NextResponse.json({
    success: true,
    data: { application: application },
  });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const application = await prisma.application.delete({
    where: { id },
  });
  return NextResponse.json({
    success: true,
    data: { application: application },
  });
}

// The  GET  function fetches all applications from the database. The  POST  function creates a new application. The  PUT  function updates an existing application. The  DELETE  function deletes an application.
// Now, let's create a new file to define the route for the application API.
