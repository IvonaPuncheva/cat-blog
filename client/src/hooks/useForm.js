import { useState } from "react";

export function useForm(initialValues, submitHandler) {
    const [values, setValues] = useState(initialValues);


    // TODO: da opravq tyk
    const changeHandler = (e) =>{
        setValues(state =>({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const submitHandler = (e) =>{
        e.preventDefault();

        submitHandler(values);
    }
  return{
values,
changeHandler,
submitHandler,
  };

}