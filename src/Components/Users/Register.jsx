import { useState } from 'react';
import './Users.css';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({name:"",email:"",password:""});
    const handleChange = (e)=>{
        setformData({...formData, [e.target.name]: e.target.value});
    }
    const {name, email, password} = formData;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
            name: formData.name,
            email: formData.email,
            password: formData.password
            });
            console.log(res);
            res.data.message ? toast.error(res.data.message):
            toast.success('Registration Successfull', {
            position: 'top-center',
            });
            if(!res.data.message){navigate("/login", { replace: true });}

        } catch (error) {
            // error case
            if (error.response && error.response.data.message) {
            toast.error(error.response.data.message, {
                position: 'top-center',
            });
            } else {
            toast.error(error.message, {
                position: 'top-center',
            });
            }
        }
    };
    const handleLogin=()=>{
        navigate('/login', { replace: true });
    }
  return (
    <div className='Main-container'>
       <h2>👤 Register Here</h2>
       <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <input id='input' type="text" name='name' placeholder='Enter Name' value={name} onChange={handleChange} />
                <input id='input' type="email" name='email' placeholder='Enter Email' value={email} onChange={handleChange} />
                <input id='input' type="password" name='password' placeholder='Enter Password' value={password} onChange={handleChange} />
                <input id='btn' type="submit" value="Sign Up" />
            </form>
            <p>Already an user ? <button onClick={handleLogin} style={{"border-radius":"5px", "border":"none", "width":"60px", "background-color":"black","color":"white"}}>Login</button></p>
            
       </div>
    </div>
  )
}

export default Register
