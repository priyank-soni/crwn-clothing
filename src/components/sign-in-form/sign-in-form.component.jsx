import { useState } from 'react';
import { signInWithGooglePopUp,signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button ,{BUTTON_TYPE_CLASSES} from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { SignInContainer, ButtonsContainer} from './sign-in-form.styles';
 

const SignInForm = () => {

    const defaultFormFields = {
        email:'',
        password:'',
    }


    const SignInWithGoogle = async () => {
        await signInWithGooglePopUp();
    }

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await signInAuthUserWithEmailAndPassword(email,password);
            setFormFields(defaultFormFields);
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect Password.")
                break;
                case "auth/user-not-found":
                    alert("No user associated with this email.")
                    break;
                default:
                    console.log(error);
            }
        }
    }
    
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    return (
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput type="email" required onChange={handleChange} name="email" value={email} label="Email" />
                
                <FormInput type="password" required onChange={handleChange} name="password" value={password} label="Password" />
            
                <ButtonsContainer>
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
} 

export default SignInForm;