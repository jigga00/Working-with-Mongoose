import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const gradeSchema = new mongoose.Schema({
    learner_id: {
        type: Number,
        required: true
      },
      class_id: {
        type: Number,
        required: true
      },
      scores: [
        {
            score_type: String,
            score: Number 
        }
    ]
});

const Grade = mongoose.model("grade", gradeSchema);

router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id);
    if (!result) res.status(404).send("Not found");
    else res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



export default router
