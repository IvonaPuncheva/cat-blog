import express from 'express';
import { createComment, getComments } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/:catId/comments', createComment);
router.get('/:catId/comments', getComments);

export default router;
