import mongoose, { Schema } from "mongoose";
import { Icontact } from "../interfaces/models";

const contactSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model<Icontact>("Contact", contactSchema);
