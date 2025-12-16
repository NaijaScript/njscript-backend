import express from "express";
import { editText } from "../services/natlas.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text, language, action } = req.body;

    if (!text || !language || !action) {
      return res.status(400).json({
        error: "text, language, and action are required"
      });
    }

    if (!["improve", "rewrite", "paraphrase"].includes(action)) {
      return res.status(400).json({
        error: "Invalid action"
      });
    }

    const result = await editText({ text, language, action });

    res.json({ text: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Edit operation failed"
    });
  }
});

export default router;
