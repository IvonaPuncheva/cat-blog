// export default function CatEdit() {
//  return (
//     <section id="edit-page" className="auth">
//     <form id="edit">
//         <div className="container">

//             <h1>Edit Game</h1>
//             <label htmlFor="leg-title">Name:</label>
//             <input type="text" id="name" name="name" value="" />

//             <label htmlFor="category">Breed:</label>
//             <input type="text" id="breed" name="breed" value="" />

//             <label htmlFor="levels">Age:</label>
//             <input type="number" id="age" name="age" min="1" value="" />

//             <label htmlFor="game-img">Image:</label>
//             <input type="text" id="imageUrl" name="imageUrl" value="" />

//             <label htmlFor="summary">Description:</label>
//             <textarea name="description" id="description"></textarea>
//             <input className="btn submit" type="submit" value="Edit Game" />

//         </div>
//     </form>
// </section>
//   );
// }
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
import { object, string, number } from 'yup';
import { useEffect, useState } from "react";

import * as devicesService from '../../../services/devicesService'

import styles from './EditDevice.module.css';

const validationSchema = object().shape({
    name: string().required('Namw Type is required').max(15, 'The word is too long!'),
    breed: string().required('Breed is required').max(15, 'The word is too long!'),
    age: number().typeError('Age must be a number').required('Age is required'),
    description: string().required('Description is required'),
    imageUrl: string().required('Please enter image url'),
 
  });

const EditDevice = () => {
    const { deviceId } = useParams();
    const [error, setError] = useState('');
    const navigate = useNavigate();

  const onEditDeviceSubmit = async (values) => {
    try {
      const response = await devicesService.edit(deviceId, values)
      navigate(`/devices/${deviceId}`);
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError('An error occurred while editing the device.');
      }
    }
  };

  

  const { values, errors, onChange, onSubmit, setValues } = useForm(
    onEditDeviceSubmit,
    {
      name: '',
      breed: '',
      age: '',
      description: '',
      imageUrl: '',
      
    },
    validationSchema
  );


  useEffect(() => {
    let isMounted = true;

    devicesService.getOne(deviceId)
        .then((result) => {
            if (isMounted) {
                setValues({
                    name: result.name,
                    breed: result.breed,
                    age: result.age,
                    description: result.description,
                    imageUrl: result.imageUrl,
                   
                });
            }
        })
      return () => {
        isMounted = false;
    };
}, [deviceId]);

    return(
        <main className={styles.mainBackground}>
        <h2 className={styles.heading}>Edit Your <span className={styles.headingColored}>Offer</span>!</h2>

        <form
          onSubmit={onSubmit}
          className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-md bg-gray-100"
        >

                {error && ( 
                <div className={styles.errorContainer}>
                    <strong>Error:</strong>
                    <span>{error}</span>
                </div>
             )}  
          {/* Device Type */}
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="name"
            >
              Device Type
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={onChange}
              className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${
                errors.name ? 'border-red-500' : ''
              }`}
              placeholder="e.g., Smartphone, Laptop, Tablet"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* breed */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="breed">
            breed
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={values.breed}
              onChange={onChange}
              className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${
                errors.breed ? 'border-red-500' : ''
              }`}
              placeholder="breed"
            />
            {errors.breed && (
              <p className="text-red-500 text-sm">{errors.breed}</p>
            )}
          </div>

 


          {/* age */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="age">
            age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={values.age}
              onChange={onChange}
              className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${
                errors.age ? 'border-red-500' : ''
              }`}
              placeholder="Device age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={onChange}
              className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg resize-none ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder="Device description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="imageUrl"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={values.imageUrl}
              onChange={onChange}
              className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${
                errors.imageUrl ? 'border-red-500' : ''
              }`}
              placeholder="Image URL"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl}</p>
            )}
          </div>

        

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit Device 
            </button>
          </div>
        </form>
      </main>
    );
}

export default EditDevice;