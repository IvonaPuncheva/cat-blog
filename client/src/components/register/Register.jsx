import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";


const initialValues = { username: '', email: '', password: '', 'confirm-password': '' };

export default function Register() { 
    const [error, setError] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const registerHandler = async (values) => {
        if (values.password !== values['confirm-password']) {
            return setError('Password missmatch!');

        }
        try {
            await register(values.username, values.email, values.password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const {
        values,
        changeHandler,
        submitHandler,

    } = useForm(initialValues, registerHandler);


    return (
        // <section id="register-page" className="content auth">
        //     <form id="register" onSubmit={submitHandler}>
        //         <div className="container">
        //             <div className="brand-logo"></div>
        //             <h1>Register</h1>

        //             <label htmlFor="email">Email:</label>
        //             <input
        //                 type="email"
        //                 id="email"
        //                 name="email"
        //                 value={values.email}
        //                 onChange={changeHandler}
        //                 placeholder="maria@email.com"
        //             />

        //             <label htmlFor="pass">Password:</label>
        //             <input
        //                 type="password"
        //                 name="password"
        //                 id="register-password"
        //                 value={values.password}
        //                 onChange={changeHandler}
        //             />

        //             <label htmlFor="con-pass">Confirm Password:</label>
        //             <input
        //                 type="password"
        //                 name="confirm-password"
        //                 id="confirm-password"
        //                 value={values['confirm-password']}
        //                 onChange={changeHandler}
        //             />
        //             {error && (
        //                 <p>
        //                     <span style={{fontSize: '24px', color: 'red'}}>{error}</span>
        //                 </p>
        //             )}


        //             <input className="btn submit" type="submit" value="Register" />

        //             <p className="field">
        //                 <span>If you already have profile click <a href="#">here</a></span>
        //             </p>
        //         </div>
        //     </form>
        // </section>
        // <main className="mainBackground">
        //     <section className="h-screen flex items-center justify-center">
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //             <div className="hidden md:block md:col-span-1 lg:col-span-2">
        //                 <img src="images/register-image.jpg" className="w-3/5 h-auto object-cover" alt="Sample image" />
        //             </div>

        //             <div className="md:col-span-1 lg:col-span-1">
        //                 {/* <h1>Register</h1> */}
        //                 <form onSubmit={submitHandler} className="max-w-md mx-auto">

        //                     <div className="mb-6">
        //                         <label className="mb-6" htmlFor="email">Email:</label>
        //                         <input
        //                             type="email"
        //                             id="email"
        //                             name="email"
        //                             value={values.email}
        //                             onChange={changeHandler}
        //                             placeholder="Email address"
        //                             className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${error.email ? 'border-red-500' : ''}`}
        //                             autoComplete="new-email"
        //                         />
        //                         {error.email && <p className="text-red-600 text-sm mt-1">{error.email}</p>}
        //                     </div>
        //                     {/* <div className="mb-6">
        //         <input
        //           type="text"
        //           placeholder="Username"
        //           name="username"
        //           onChange={onChange}
        //           value={values.username}
        //           className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${errors.username ? 'border-red-500' : ''}`}
        //         />
        //         {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
        //       </div> */}

        //                     <div className="mb-6">
        //                         <label className="mb-6" htmlFor="pass">Password:</label>
        //                         <input
        //                             type="password"
        //                             name="password"
        //                             id="register-password"
        //                             value={values.password}
        //                             onChange={changeHandler}
        //                             className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${error.password ? 'border-red-500' : ''}`}
        //                              autoComplete="new-password"
        //                         />
        //                         {error.password && <p className="text-red-600 text-sm mt-1">{error.password}</p>}
        //                     </div>

        //                     <div className="mb-6">
        //                     <label className="mb-6" htmlFor="con-pass">Confirm Password:</label>
        //                     <input
        //                         type="password"
        //                         name="confirm-password"
        //                         id="confirm-password"
        //                         value={values['confirm-password']}
        //                         onChange={changeHandler}
        //                         className={`w-full p-3 border border-solid border-gray-300 outline-none rounded-lg ${error['confirm-password'] ? 'border-red-500' : ''}`}
        //                         autoComplete="new-password"
        //                     />
        //                       {error['confirm-password'] && <p className="text-red-600 text-sm mt-1">{error['confirm-password']}</p>}
        //                       </div>

        //                     {error && (
        //                         <p>
        //                             <span style={{ fontSize: '24px', color: 'red' }}>{error}</span>
        //                         </p>
        //                     )}

        //                     <div className="text-center">
                            
        //                     <input
        //                             type="submit"
        //                             value="Register"
        //                             className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        //                             />
        //                     </div>

        //                     <p className="mt-4 text-sm">
        //                         <span className="loginButton">If you already have profile click <Link to="/login">here</Link></span>
        //                     </p>

        //                 </form>
        //             </div>
        //         </div>

        //     </section>
        // </main >
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form className='flex flex-col gap-4' onSubmit={submitHandler}>
            <input
                type="text"
                placeholder='username'
                className='border p-3 rounded-lg'
                id='username'
                name='username'
                value={values.username}
                onChange={changeHandler}
            />
            <input
                type="email"
                placeholder='email'
                className='border p-3 rounded-lg'
                id='email'
                name='email'
                value={values.email}
                onChange={changeHandler}
            />
            <input
                type="password"
                placeholder='password'
                className='border p-3 rounded-lg'
                id='password'
                name='password'
                value={values.password}
                onChange={changeHandler}
            />
            <input
                type="password"
                placeholder='confirm password'
                className='border p-3 rounded-lg'
                id='confirm-password'
                name='confirm-password'
                value={values['confirm-password']}
                onChange={changeHandler}
            />
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                Sign Up
            </button>
        </form>

        <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
                <span className='text-blue-700'>Sign In</span>
            </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    );
}

