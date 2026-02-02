import { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import './Home.css'
import axios from 'axios'

const Home = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBrands = async()=>{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/brand`);
      console.log(res.data.data);
      setBrands(res.data.data);
    }
    fetchBrands();
    // "Samsung","Dell","LG","Bosch","Voltas","Philips","Nike",'Adidas',"H&M","Wildcraft","Generic"
  }, [])
  const handleCardclick=(item)=>{
    navigate('/home/products', {state: {data: item}});
  }
  
  return (
    <div className='Home'>
      <div className="home-top">
        <h2>Welcome to store!!</h2>
        <h4>Shop your favourite brands</h4>
      </div>
      <div className="home-bottom">
        {brands && [...brands,...brands].map((item)=>(
          <div className="home-card" onClick={()=>handleCardclick(item)} >
            <p>{item._id}</p>
          </div>
        ))}
        
      </div>
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
