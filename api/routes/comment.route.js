import express from 'express';
import { createComment, getComments } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/:catId', createComment);
router.get('/:catId', getComments);

export default router;