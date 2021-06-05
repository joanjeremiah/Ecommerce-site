import { signIn } from "next-auth/client";
import {useState,useRef} from 'react';

const UserForm = () => {
    const [userDetails,setUserDetails] = useState({type: 'customer'});
    const [userProfile,setUserProfile] = useState(null);
    const [msg,setMsg] = useState('');
    const message = useRef(null);
    const onInputChange = (e) => {
        setUserDetails({...userDetails,[e.target.name]: e.target.value})
    }
    const onFileInputChange = (e) => {
        setUserProfile(e.target.files[0])
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(userDetails,userProfile)
        const formData = new FormData();
        formData.append('profile',userProfile);
        formData.append('details',JSON.stringify(userDetails));
        const response = await fetch('/api/user/create',{
            method: 'POST',
            body: formData
        })
        const res = await response.json();
        console.log(response,res)
        if(res.msg){
            setMsg(res.msg)
            message.current.style.transform = 'translateX(0)';
            setTimeout(() => {
              message.current.style.transform = 'translateX(100%)';
            },3000)
          }
    }
    return(
        <div className="create-account-form-container">
            <p ref={message} className="message">{msg}</p>
            <form className="create-account-form" onSubmit={onFormSubmit}>
                <input onChange={onInputChange} type="text" placeholder="Name" name="name" required />
                <input onChange={onInputChange}  type="email" placeholder="Email id" name="email" required  />
                <input onChange={onInputChange} type="password" placeholder="Password" name="password" required  />
                <input onChange={onFileInputChange} type="file" className="custom-file-input" required  />
                <select onChange={onInputChange} name="type">
                    <option value="customer">Customer</option>
                    <option value="owner">Shop Owner</option>
                </select>
                <input type="submit" value="Sign Up" />
                <p>Already have an account? <a onClick={() => signIn()}>Sign in</a></p>
            </form>
        </div>
    );
}

export default UserForm;