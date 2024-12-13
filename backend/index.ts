import express from "express";
import MainRouter from "./routes/0.index";

const app = express();
app.use(express.json());    

app.use('/api', MainRouter);
require("./config/configs");

require("dotenv").config();

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});