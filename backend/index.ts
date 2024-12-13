import MainRouter from './routes/0.index';
import express from "express";

const app = express();
app.use(express.json());    

const route = express.Router();
route.use('/api', MainRouter);

require("./config/configs");

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});