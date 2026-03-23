import { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import './Home.css'
import axios from 'axios'

const Home = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBrands = async()=>{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/brand`);
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
    <div className='home-container'>
      <header className="home-hero">
        <h1 className="hero-title">Experience Premium Shopping</h1>
        <p className="hero-subtitle">Discover the world's most iconic brands, all in one place.</p>
      </header>

      <main className="home-main">
        <div className="section-header">
          <h2 className="section-title">Shop by Brand</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="brands-grid">
          {brands && brands.map((item)=>(
            <div key={item._id} className="brand-card glass" onClick={()=>handleCardclick(item)} >
              <div className="brand-icon">{item._id.charAt(0)}</div>
              <h3 className="brand-name">{item._id}</h3>
              <p className="brand-explore">Explore Collection →</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="home-footer glass">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="nav-logo">MyStore</h3>
            <p>Elevating your shopping experience with curated premium brands.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
