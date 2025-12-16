import "dotenv/config";
import express from "express";
import cors from "cors";

import generateRoute from "./src/routes/generate.js";
import autocompleteRoute from "./src/routes/autocomplete.js";
import editRoute from "./src/routes/edit.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/generate", generateRoute);
app.use("/api/edit", editRoute);
app.use("/api/autocomplete", autocompleteRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

// ✅ Use Render's injected PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
