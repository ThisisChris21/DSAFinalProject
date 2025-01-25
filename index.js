import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoute from './routes/booksRoute.js';

const app = express();

app.use(express.json());

app.get("/", function (request, response) {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT || 8080 , () => {
      console.log(`App listening on port: ${PORT || 8080}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//middleware for handling CORS policy
//===================================

//option 1: Allow all origins with default of cors(*)
app.use(cors());
//option 2: Allow cusotm origins
/*
app.use({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-type'],
});
*/

//middleware communicate with booksRoute.js

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist"))); // Adjust path if necessary



// Serve static files from the React app
app.use(express.static(path.join(__dirname, "dist"))); // Adjust path if necessary

// Catch-all handler to serve React's index.html for unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use('/books', bookRoute);
