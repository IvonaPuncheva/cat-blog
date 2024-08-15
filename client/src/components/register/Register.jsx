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
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7 text-[#2c3e50]'>Register</h1>
        <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <label htmlFor="login-pass" className='text-[#2c3e50]'>Username:</label>
            <input
                type="text"
                placeholder='username'
                className='border p-3 rounded-lg'
                id='username'
                name='username'
                value={values.username}
                onChange={changeHandler}
            />
              <label htmlFor="login-pass" className='text-[#2c3e50]'>Email:</label>
            <input
                type="email"
                placeholder='email'
                className='border p-3 rounded-lg'
                id='email'
                name='email'
                value={values.email}
                onChange={changeHandler}
            />
              <label htmlFor="login-pass" className='text-[#2c3e50]'>Password:</label>
            <input
                type="password"
                placeholder='password'
                className='border p-3 rounded-lg'
                id='password'
                name='password'
                value={values.password}
                onChange={changeHandler}
            />
              <label htmlFor="login-pass" className='text-[#2c3e50]'>Confirm Password:</label>
            <input
                type="password"
                placeholder='confirm password'
                className='border p-3 rounded-lg'
                id='confirm-password'
                name='confirm-password'
                value={values['confirm-password']}
                onChange={changeHandler}
            />
            <button className='bg-[#d35400] text-white p-3 rounded-lg uppercase hover:opacity-95'>
                Sign Up
            </button>
        </form>

        <div className="flex gap-2 mt-5">
            <p className='text-[#2c3e50]'>Have an account?</p>
            <Link to={'/login'}>
                <span className='text-blue-700'>Login</span>
            </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    );
}

