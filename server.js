import "dotenv/config";
import express from "express";
import cors from "cors";

import generateRoute from "./src/routes/generate.js";
import autocompleteRoute from "./src/routes/autocomplete.js";
import editRoute from "./src/routes/edit.js";
import audioRoute from "./src/routes/audio.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/generate", generateRoute);
app.use("/api/edit", editRoute);
app.use("/api/autocomplete", autocompleteRoute);
app.use("/api/audio", audioRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/api/generate", (req, res) => {
  res.send("Generate is running");
});
app.get("/api/edit", (req, res) => {
  res.send("Edit is running");
});
app.get("/api/autocomplete", (req, res) => {
  res.send("Autocomplete is running");
});
app.get("/api/audio", (req, res) => {
  res.send("Audio service is running");
});

// ✅ Use Render's injected PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
