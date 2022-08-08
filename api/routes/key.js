import express from 'express';
import {
    createKey,
    deleteKey,
    getKey,
    getKeys,
    updateKey,
    getKeysByKey
    } from "../controller/key.js";

const router = express.Router();

//CREATE
router.post("/", createKey);

//UPDATE
router.put("/:id", updateKey);
//DELETE
router.delete("/:id", deleteKey);
//GET

router.get("/find/:id", getKey);
//GET ALL

router.get("/", getKeys);
router.get("/getkeysbykey/:id", getKeysByKey);

export default router