import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";
import {  useGetOneCat } from "../../hooks/useCats.js";
import catsAPI from "../../api/catsAPI.js";


export default function CatEdit() {
    const navigate = useNavigate();
    const { catId } = useParams();
    const [cat] = useGetOneCat(catId);
    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(cat, async(values) => {
        const isConfirmed = confirm('Are you sure you want to update this cat?');
        if (isConfirmed) {
            await catsAPI.update(catId, values);

            navigate(`/cats/${catId}/details`);
        }
   
    });

    return (
        <section id="edit-page" className='p-3 max-w-4xl mx-auto'>
            <form id="edit" onSubmit={submitHandler} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <h1 className='text-3xl font-semibold text-center my-7'>Edit Cat</h1>

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
                        min="1"
                        value={values.age}
                        onChange={changeHandler}
                        placeholder="1"
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
                        value="Update Cat"
                    />
                </div>
            </form>
        </section>
    );
}










