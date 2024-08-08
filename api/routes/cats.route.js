import express from "express";
import { createCat, getAllCats, getOneCat, testCats } from "../controllers/cats.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getCatById } from "../controllers/listing.controller.js";

const router = express.Router();


router.get('/test', testCats);
router.post('/create',verifyToken, createCat);
router.get('/', getAllCats);
router.get('/:id', getCatById);


export default router;