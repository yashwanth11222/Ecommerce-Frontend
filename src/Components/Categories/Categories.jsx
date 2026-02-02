import { Link } from "react-router-dom";
import './Categories.css';

const Categories = () => {
  return (
    <div className='Category-container'>
      <Link to="/categories/home-appliances" className="cat-card">Home Appliances</Link>
      <Link to="/categories/clothing" className="cat-card">Clothing</Link>
      <Link to="/categories/electronics" className="cat-card">Electronics</Link>
      <Link to="/categories/accessories" className="cat-card">Accessories</Link>
    </div>
  )
}

export default Categories;