import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useCreateCat } from "../../hooks/useCats";
import { useAuthContext } from "../../context/AuthContext.jsx";


const initialValues = {
    name: '',
    breed: '',
    age: '',
    imageUrl: '',
    description: '',

};

export default function CatCreate() {

    const { userId } = useAuthContext();

    const navigate = useNavigate();
    const createCat = useCreateCat();

    console.log(userId);

    const createHandler = async (values) => {
        try {

            const { _id: catId } = await createCat(values);
            navigate(`/cats`);
            //     const result = await createCat(values);
            // console.log('Cat created:', result);
            // navigate(`/cats/${catId}/details`);

        } catch (err) {
            console.log('Error creating cat:', err.message);
        }
    };

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, createHandler);

    return (
        <section id="create-page" className='p-3 max-w-4xl mx-auto'>
            <form id="create" onSubmit={submitHandler} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <h1 className='text-3xl font-semibold text-center my-7'>Create Cat</h1>

                    <label htmlFor="name" className='flex flex-col gap-4 flex-1'>Cat name:</label>
                    <input
                        type="text"
                        className='border p-3 rounded-lg'
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={changeHandler}
                        placeholder="Enter cat name..."
                        required
                    />

                    <label htmlFor="breed">Breed:</label>
                    <input
                        type="text"
                        className='border p-3 rounded-lg'
                        id="breed"
                        name="breed"
                        value={values.breed}
                        onChange={changeHandler}
                        placeholder="Enter cat breed..."
                        required
                    />

                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        className='border p-3 rounded-lg'
                        id="age"
                        name="age"
                        min="0"
                        step="0.01"
                        value={values.age}
                        onChange={changeHandler}
                        placeholder="0.0"
                        required
                    />

                    <label htmlFor="imageUrl">Image:</label>
                    <input
                        type="text"
                        className='border p-3 rounded-lg'
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                        placeholder="Upload a photo..."
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        className='border p-3 rounded-lg'
                        value={values.description}
                        onChange={changeHandler}
                        id="description"
                        required
                    />

                    <input
                        className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                        type="submit"
                        value="Create Cat"
                    />
                </div>
            </form>
        </section>
    );
}
