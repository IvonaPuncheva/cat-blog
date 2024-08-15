import Comment from '../modals/comment.modal.js';

export const createComment = async (req, res) => {
  try {
    const { catId, email, text } = req.body; 
    const newComment = await Comment.create({ catId, email, text });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getComments = async (req, res) => {
  try {
    const { catId } = req.params;
    const comments = await Comment.find({ catId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

