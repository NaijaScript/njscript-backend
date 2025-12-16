import express from "express";
import { generateDraft } from "../services/natlas.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            error: "Missing request body or Content-Type header",
        });
    }
    try {
        const { prompt, language, mode } = req.body;

        if (!prompt || !language || !mode) {
            return res.status(400).json({
                error: "prompt, language, and mode are required",
            });
        }

        const text = await generateDraft({
            prompt,
            language,
            mode,
        });

        res.json({ text });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to generate draft",
        });
    }
});

export default router;
