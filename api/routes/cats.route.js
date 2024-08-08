import express from "express";
import { createCat, getAllCats, testCats } from "../controllers/cats.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get('/test', testCats);
router.post('/create',verifyToken, createCat);
router.get('/', getAllCats)


export default router;