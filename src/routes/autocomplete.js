import { autocompleteText } from "../services/natlas.service.js";
import express from "express";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({
        error: "text and language are required"
      });
    }

    // Prevent calling model on very short input
    if (text.trim().length < 10) {
      return res.json({ text: "" });
    }

    const suggestion = await autocompleteText({ text, language });

    res.json({ text: suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Autocomplete failed"
    });
  }
});

export default router;