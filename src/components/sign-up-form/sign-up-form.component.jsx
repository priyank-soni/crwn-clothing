import { useState } from 'react';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {SignUpContainer} from './sign-up-form.styles';

const SignUpForm = () => {

    const defaulfFormFields = {
        displayName :'',
        email:'',
        password:'',
        confirmPassword:''
    }


    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword)
        {
            alert("passwords does not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
            setFormFields(defaulfFormFields);

        } catch (error) {
            if(error.code === "auth/email-already-in-use")
            {
                alert("cannot create user,email already in use");
            }
            else
            {
                console.log("user creation encountered error",error);
            }
        }
    }
    
    const [formFields,setFormFields] = useState(defaulfFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    return (
        <SignUpContainer>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" required onChange={handleChange} name="displayName"  value={displayName} label="Display Name" />
                
                <FormInput type="email" required onChange={handleChange} name="email" value={email} label="Email" />
                
                <FormInput type="password" required onChange={handleChange} name="password" value={password} label="Password" />
            
                <FormInput type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} label="Confirm Password" />

                <Button type="submit">Submit</Button>
            </form>
        </SignUpContainer>
    )
} 

export default SignUpForm;