import express from 'express';
import {
    createKeys,
    deleteKeys,
    getKkeys,
    updateKeys,
    getKeys,
  } from "../controller/Kkeys.js";

const router = express.Router();

//CREATE
router.post("/", createKeys);

//UPDATE
router.put("/:id", updateKeys);
//DELETE
router.delete("/:id", deleteKeys);
//GET

router.get("/find/:id", getKkeys);
//GET ALL

router.get("/", getKkeys);
router.get("/", getKeys);
export default router