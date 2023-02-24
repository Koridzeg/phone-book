import { Request, Response } from "express";
import { Icontact } from "../interfaces/contact.model";
import Contact from "../models/Contact";

export const createContact = async (req: Request, res: Response) => {
  const { name, surname, phone } = req.body;

  try {
    const contact = await Contact.create({ name, surname, phone });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: "Failed to create contact", err });
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve contacts", err });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, surname, phone } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(
      id,
      { name, surname, phone },
      { new: true }
    );
    res.status(200).json(updateContact);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contacts", err });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteContact = await Contact.findByIdAndDelete(id);
    res.status(200).json(deleteContact);
  } catch (err) {
    res.status(500).json({ message: "Failed deleting contacts", err });
  }
};
