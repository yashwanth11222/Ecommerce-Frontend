import { useState } from 'react';
import { toast } from 'react-hot-toast';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.VITE_API_URL}/user/login`, {
        email: formData.email,
        password: formData.password
      });

        toast.success('Login Successful', {
            position: 'top-center',
            duration: 2000,
        });
        
        // Save token in localStorage
        localStorage.setItem('AuthToken', res.data.user.token);

        // Navigate to home
        navigate("/home", { replace: true });

    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: 'top-center',
          duration: 2000,
        });
      } else {
        toast.error(error.message, {
          position: 'top-center',
          duration: 2000,
        });
      }
    }
  };
  const handleRegister=()=>{
    navigate('/', {replace:true});
  }

  return (
    <div className='Main-container'>
      <h2>👤 Login Here</h2>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <input
            id='input'
            type="email"
            name='email'
            placeholder='Enter Email'
            value={email}
            onChange={handleChange}
          />
          <input
            id='input'
            type="password"
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={handleChange}
          />
          <input id='btn' type="submit" value="LogIn" />
        </form>
        <p><strong>New User ?</strong> <button onClick={handleRegister}>Register</button></p>
      </div>
    </div>
  );
};

export default Login;