
import { AuthContext } from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import commentsAPI from "../../api/commentsAPI.js";
import { useGetOneCat } from "../../hooks/useCats";
import catsAPI from "../../api/catsAPI.js";
// import { useCurrentUser } from "../../hooks/useAuth.js"; // Добав
import { useContext } from "react";

export default function CatDetails() {
    const { catId } = useParams();
   
    const [cat, setCat] = useGetOneCat(catId);
    
    const [username, setUserName] = useState('');
    const [comment, setComment] = useState('');
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    
    console.log(cat.owner);
    console.log(userId);
    
    useEffect(() => {
        // Проверка дали текущият потребител е собственик на котката
        if (cat && userId) {
            setIsOwner(cat.owner?._id === userId);

        }
    }, [cat, userId]);
    console.log(isOwner);

    const commentSubmitHandler = async (e) => {
        e.preventDefault();
        const newComment = await commentsAPI.create(catId, username, comment);

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

    const handleDelete = async () => {
        try {
            await catsAPI.remove(catId);
            navigate('/cats');
        } catch (error) {
            console.error('Failed to delete cat:', error);
        }
    }

    const toggleConfirmModal = () => {
        setShowConfirmModal((prev) => !prev);
    };

    return (
        <section id="cat-details" className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">CAT Details</h1>
            <div className="info-section bg-white p-6 rounded-lg shadow-md">
                <div className="cat-header flex flex-col items-center mb-6">
                    <img className="cat-img rounded-lg mb-4" src={cat.imageUrl} alt={`${cat.name}`} />
                    <h1 className="text-2xl font-semibold text-gray-800">{cat.name}</h1>
                    <span className="levels text-gray-600">Age: {cat.age}</span>
                    <p className="type text-gray-500">{cat.breed}</p>
                </div>

                <p className="text-gray-700 mb-6">{cat.description}</p>

                <div className="details-comments mb-6">
                    <h2 className="text-xl font-semibold mb-4">Comments:</h2>
                    <ul>
                        {Object.keys(cat.comments || {}).length > 0
                            ? Object.values(cat.comments).map(comment => (
                                <li key={comment._id} className="comment mb-2">
                                    <p className="text-gray-700">
                                        <span className="font-bold">{comment.username}</span>: {comment.text}
                                    </p>
                                </li>
                            ))
                            : <p className="text-gray-500">No comments.</p>
                        }
                    </ul>
                </div>

                {isOwner && (
                    <div className="flex justify-between mt-4">
                        <Link to={`/cats/${catId}/details/edit`}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={toggleConfirmModal}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                )}

                {showConfirmModal && (
                    <div>
                        <div>
                            <p className="text-gray-800 mb-4">
                                Are you sure you want to delete this item?
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={toggleConfirmModal}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <article className="create-comment mt-6">
                <label className="block text-lg font-semibold mb-2">Add new comment:</label>
                <form className="form space-y-4" onSubmit={commentSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Pesho"
                        name="username"
                        className="w-full p-3 border border-gray-300 rounded"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        className="w-full p-3 border border-gray-300 rounded"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></textarea>
                    <input
                        className="btn submit bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
}