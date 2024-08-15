import { useEffect, useState } from 'react';
import commentsAPI from '../../api/commentsAPI.js';


const CommentsComponent = ({ catId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
        try {
            const fetchedComments = await commentsAPI.getAll(catId);
            console.log('Fetched comments:', fetchedComments); 
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    fetchComments();
}, [catId]);

return (
    <div>
        {comments.map(comment => (
            <div key={comment._id}>
                <p>{comment.email}: {comment.text}</p>
            </div>
        ))}
    </div>
  );
};
export default CommentsComponent;

