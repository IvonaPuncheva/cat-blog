import {Link, useNavigate} from "react-router-dom"

import { useLogin } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

const initialValues = { email: '', password: '' }

export default function Login() {
const login = useLogin();
const navigate = useNavigate();

const loginHandler = async ({email, password}) =>{

 try { 
     await login(email, password)
     navigate('/');
    }catch (err){
        console.error(err.message);
    }
};

const {values, changeHandler, submitHandler}= useForm(
   initialValues, 
   loginHandler,
);
    
 return (
<section id="login-page" className='p-3 max-w-lg mx-auto'>
  <form id="login" onSubmit={submitHandler} className='flex flex-col gap-4'>
    <div className='flex flex-col gap-4 flex-1'>
      <h1 className='text-3xl font-semibold text-center my-7 text-[#2c3e50]'>Login</h1>
      <label htmlFor="email" className='flex flex-col gap-4 flex-1 text-[#2c3e50]'>Email:</label>
      <input 
        type="email" 
        id="email" 
        className='border p-3 rounded-lg'
        name="email" 
        value={values.email}
        onChange={changeHandler}
        placeholder="email" 
      />
      <label htmlFor="login-pass" className='text-[#2c3e50]'>Password:</label>
      <input 
        type="password" 
        className='border p-3 rounded-lg'
        id="login-password" 
        name="password" 
        value={values.password}
        onChange={changeHandler}
        placeholder="password" 
      />
      <input type="submit" className='p-3 bg-[#d35400] text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' value="Login" />
      <p className="field text-[#2c3e50]">
        <span>If you don't have profile click <Link className='text-blue-700' to="/register">here!</Link></span>
      </p>
    </div>
  </form>
</section>




  );
}