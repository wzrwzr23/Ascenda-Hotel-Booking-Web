import express from 'express';
import {
    createHotel,
    deleteHotel,
    getHotel,
    getHotels,
    updateHotel,
    countByCity,
    getHotelRooms,
  } from "../controller/hotels.js";

const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/room/:id", getHotelRooms);

export default router