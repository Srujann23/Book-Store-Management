import express, { request, response } from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookmodel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
// const cors = require('cors');
const app = express();

//Middleware for parsing request body
app.use(express.json());
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

//Middleware for handling  CORS (Cross-Origin Resource Sharing) Policy

//Option 1: Allow all origins with default of cors(*)
app.use(cors());

//Option 2: Allow custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowHeaders: ['application/json'],
//     })
// );

// Route for save a new book

app.use('/books', booksRoute);

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        // console.log(MONGODB_URI);
        console.log('Connection failed!');
        console.log(error);
    });