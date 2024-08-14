import express from "express";
import { createCat, deleteCat, editCat, getAllCats, getOneCat, testCats } from "../controllers/cats.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getCatById } from "../controllers/listing.controller.js";

const router = express.Router();


router.get('/test', testCats);
router.post('/create',verifyToken, createCat);
router.get('/', getAllCats);
router.get('/:id', getCatById);
router.put('/:catId/details/edit', verifyToken, editCat)
router.delete('/:catId', verifyToken, deleteCat);


export default router;