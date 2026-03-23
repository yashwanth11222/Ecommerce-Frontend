import { Link } from "react-router-dom";
import './Categories.css';

const Categories = () => {
  return (
    <div className='categories-container'>
       <h2 className="section-title">Explore Categories</h2>
       <div className="categories-grid">
         <Link to="/categories/home-appliances" className="category-card glass">
           <div className="category-icon">🏠</div>
           <span>Home Appliances</span>
         </Link>
         <Link to="/categories/clothing" className="category-card glass">
           <div className="category-icon">👕</div>
           <span>Clothing</span>
         </Link>
         <Link to="/categories/electronics" className="category-card glass">
           <div className="category-icon">💻</div>
           <span>Electronics</span>
         </Link>
         <Link to="/categories/accessories" className="category-card glass">
           <div className="category-icon">🎒</div>
           <span>Accessories</span>
         </Link>
       </div>
    </div>
  )
}

export default Categories;