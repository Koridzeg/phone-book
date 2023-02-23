import { Document } from "mongoose";

export interface Icontact extends Document {
  name: string;
  surname: string;
  phone: string;
}
