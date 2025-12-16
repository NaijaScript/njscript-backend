import "dotenv/config";
import express from "express";
import cors from "cors";
import generateRoute from "./src/routes/generate.js";
import autocompleteRoute from "./src/routes/autocomplete.js";
import editRoute from "./src/routes/edit.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoute);
app.use("/api/edit", editRoute);
app.use("/api/autocomplete", autocompleteRoute);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
