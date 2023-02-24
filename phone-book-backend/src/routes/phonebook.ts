import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from "../controllers/phonebook.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/test", auth, (req, res) => {
  res.send("works");
});

router.post("/", auth, createContact);

router.get("/", auth, getAllContacts);

router.put("/:id", auth, updateContact);

router.delete("/:id", auth, deleteContact);

export default router;
