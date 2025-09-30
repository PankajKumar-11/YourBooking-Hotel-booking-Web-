import express from "express";
import {
  deleteHotel,
  createHotel,
  updateHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
  getFeaturedHotels,
} from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import Hotel from "../models/Hotel.js"; // Import the Hotel model

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const hotelId = req.params.id;
    console.log("Attempting to delete hotel with ID:", hotelId);

    // Check if hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    next(err);
  }
});

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/featured", getFeaturedHotels);

export default router;


