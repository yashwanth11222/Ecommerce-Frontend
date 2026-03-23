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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
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
    <div className='auth-container'>
      <div className="auth-card glass">
        <h2 className="auth-title">👤 Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              className='auth-input'
              type="email"
              name='email'
              placeholder='Email Address'
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              className='auth-input'
              type="password"
              name='password'
              placeholder='Password'
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button className='auth-btn' type="submit">Log In</button>
        </form>
        <p className="auth-footer">New to MyStore? <span onClick={handleRegister} className="auth-link">Register</span></p>
      </div>
    </div>
  );
};

export default Login;