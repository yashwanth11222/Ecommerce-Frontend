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
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
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
    <div className='auth-container'>
       <div className="auth-card glass">
            <h2 className="auth-title">👤 Join MyStore</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="input-group">
                    <input className='auth-input' type="text" name='name' placeholder='Full Name' value={name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <input className='auth-input' type="email" name='email' placeholder='Email Address' value={email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <input className='auth-input' type="password" name='password' placeholder='Create Password' value={password} onChange={handleChange} required />
                </div>
                <button className='auth-btn' type="submit">Sign Up</button>
            </form>
            <p className="auth-footer">Already have an account? <span onClick={handleLogin} className="auth-link">Login</span></p>
       </div>
    </div>
  )
}

export default Register
