import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.js";
import Grade from '../models/grades.js';

const router = express.Router();


/**
 * GET /
 */
router.get('/', async (req, res) => {
    // const collection = await db.collection("grades");
    // const result = await collection.find();
    const result = await Grade.find({});
    res.send(result);

});

/**
 * GET /:id
 */
router.get("/:id", async (req, res) => {
//   const collection = await db.collection("grades");
//   const query = { _id: new ObjectId(req.params.id) };
//   const result = await collection.findOne(query);

    const result = await Grade.findById(req.params.id);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

/**
 * POST /
 */
router.post('/', async(req, res) => {
    // const collection = await db.collection('grades');
    const newDocument = req.body;
    console.log(newDocument);

    if (newDocument.student_id) {
        newDocument.learner_id = newDocument.student_id;
        delete newDocument.student_id;
    }

    // const result = await 
    collection.insertOne(newDocument);
    const result = await Grade.create(newDocument);
    res.send(result).status(204);
});



/**
 * GET /student/:id
 */
router.get('/student/:id', async (req, res) => {
   res.redirect(`/grades/learner/${req.params.id}`);
});

/**
 * GET /learner/:id
 */
router.get('/learner/:id', async (req, res) => {
    // const collection = await db.collection("grades");
    // const query = {learner_id: Number(req.params.id)};
    // const result = await
     collection.find(query).toArray();
     const result = await Grade.find({learner_id: req.params.id});

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


/**
 * GET /class/:id
 */
router.get('/class/:id', async (req, res) => {
    const collection = await db.collection('grades');
    const query = {class_id: Number(req.params.id)};
    const result = await collection.find(query).toArray();

    if (result.length < 1) res.status(404).send("Not Found");
    else res.send(result).status(200);
})

/**
 * PATCH /:id/class
 */
router.patch('/:id/score/add', async (req, res) => {
    const collection = await db.collection('grades');
    const query = { _id: new ObjectId(req.params.id) };
    const update = { $set: { class_id: req.body.class_id } };

    const result = await collection.updateOne(query, update);

    if (result.modifiedCount === 0) {
        res.status(404).send("Not Found");
    } else {
        res.status(204).send("Class ID Updated Successfully");
    }
});
/**
 * DELETE /:id/scores/remove
 */
router.delete('/', async(req, res) => {
  const collection = await db.collection('grades');
  const newDocument = req.body;
  console.log(newDocument);

  if (newDocument.student_id) {
      newDocument.learner_id = newDocument.student_id;
      delete newDocument.student_id;
  }

  const result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

export default router;