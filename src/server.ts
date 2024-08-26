import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import router from "./router/index";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/v1/',router)

const port = process.env.PORT || 3000;
const database = process.env.DATABASE;
app.use(bodyParser.urlencoded({extended: true}))

if (!database) {
  throw new Error('DATABASE environment variable is not defined');
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose.connect(database, {
}).then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection error:', error);
});
