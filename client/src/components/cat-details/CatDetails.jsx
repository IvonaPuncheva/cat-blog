import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetOneCat } from "../../hooks/useCats";
import catsAPI from "../../api/catsAPI.js";
import { useForm } from '../../hooks/useForm.js'
import {useCreateComment, useGetAllComments} from "../../hooks/useComments.js";
import { AuthContext, useAuthContext } from "../../context/AuthContext.jsx";


 
const initialValues = {
    comment: '',
    // email: '',
};

export default function CatDetails() {
    const { catId } = useParams();
    const [comments, setComments] = useGetAllComments(catId);
    const createComment = useCreateComment();
    const [cat] = useGetOneCat(catId);
    const {user, email, isAuthenticated} = useAuthContext();
    console.log('Current user:', user);
    console.log('Current user email:', email);

    if (!isAuthenticated) {
        return <p>Please log in to view and add comments.</p>;
      }
    
    const {
        changeHandler,
        submitHandler,
        values,
     } = useForm(initialValues, async ({ comment }) =>{
        console.log('comment:',values.comment);
        try{
         const newComment = await createComment(catId, email, comment);
         setComments(oldComments =>[...oldComments, newComment]);
        }catch(err){
            console.log(err.message);
        }
    });



    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    console.log(isOwner);
    const { userId } = useAuthContext(AuthContext);

    

    useEffect(() => {
     
        if (cat && userId) {
            setIsOwner(cat.owner?._id === userId);

        }
    }, [cat, userId]);
    console.log(isOwner);



    const handleDelete = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete ${cat.name} cat?`);
        if (!isConfirmed) {
            return;
        }

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
                        {comments.map(comment => (
                                <li key={comment._id} className="comment mb-2">
                                    <p className="text-gray-700">
                                        <span className="font-bold">{comment.email}:</span> {comment.text}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                   {comments.length === 0 && <p className="text-gray-500">No comments.</p>}
                </div>

                {isOwner && (
                    <div className="flex justify-between mt-4">
                        <Link to={`/cats/${catId}/edit`}
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
                {isAuthenticated && (
            <article className="create-comment mt-6">
                <label className="block text-lg font-semibold mb-2">Add new comment:</label>
                <form className="form space-y-4" onSubmit={submitHandler}>
                    <textarea
                        type="text"
                        name="comment"
                        placeholder="Comment......"
                        className="w-full p-3 border border-gray-300 rounded"
                        onChange={changeHandler}
                        value={values.comment}
                    ></textarea>
                    <input
                        className="btn submit bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
            )}
        </section>
    );
}