import express from "express";
import { queryAudioModel } from "../services/audio.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { audio } = req.body;

    if (!audio) {
      return res.status(400).json({ error: "Audio data (base64) is required" });
    }

    // The model expects "inputs" with the base64 string
    const result = await queryAudioModel({
      inputs: audio,
      parameters: {}
    });

    res.json(result);
  } catch (error) {
    console.error("Audio processing error:", error);
    res.status(500).json({ error: "Failed to process audio" });
  }
});

export default router;
