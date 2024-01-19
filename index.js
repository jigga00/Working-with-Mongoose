import mongoose from 'mongoose';
import express from 'express';
import './loadEnv.js';

import grades from './routes/grades.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/grades', grades);

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});




// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});


app.listen(PORT, async () => {
  try {
      console.log(`Server running on port: ${PORT}`);
      await mongoose.connect(process.env.ATLAS_URI);
      console.log(`Connected to MongoDB`);
    } catch (error) {
      console.log(error);
    }
});