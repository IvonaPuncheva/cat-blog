import {  useState } from "react";
import { useParams } from "react-router-dom";
import commentsAPI from "../../api/commentsAPI";
import { useGetOneCats } from "../../hooks/useCats";


export default function CatDetails() {
    const { catId } = useParams()
    const [cat, setCat] = useGetOneCats(catId);
    const [username, setUserName] = useState('');
    const [comment, setComment] = useState('');
  


    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        const newComment = await commentsAPI.create(catId, username, comment);

        //    TODO: this should be refractored
        setCat(prevState => ({
            ...prevState,
            comments: {
                ...prevState.comments,
                [newComment._id]: newComment,
            }
        }));
      
        setUserName('');
        setComment('');


    }

    return (
        <section id="game-details">
            <h1>CAT Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={cat.imageUrl} />
                    <h1>{cat.title}</h1>
                    <span className="levels">Age: {cat.maxLevel}</span>
                    <p className="type">{cat.category}</p>
                </div>

                <p className="text">{cat.description} </p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {Object.keys(cat.comments || {}).length > 0
                            ? Object.values(cat.comments).map(comment => (
                                <li key={comment._id} className="comment">
                                    <p>{comment.username}: {comment.text}</p>
                                </li>
                            ))
                            : <p className="no-comment">No comments.</p>
                        }
                    </ul>

                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={commentSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Pesho"
                        name="username"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                    />

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>

    );
}