import { ObjectId } from "bson";

export const createObjectId = () => {
  return new ObjectId().toHexString();
};

export function titleCase(str) {
  return str.trim().replace(/\b\w/g, (char) => char.toUpperCase());
}
