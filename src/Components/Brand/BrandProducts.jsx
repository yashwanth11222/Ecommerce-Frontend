import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import './Brand.css';
import axios from "axios";
import toast from "react-hot-toast";

const BrandProducts = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const prodcut_details = location.state?.data;
        console.log(prodcut_details.products);
        
        setProducts(prodcut_details.products);
    }, [])

const handleClick = async(prod)=>{
    try {
        const token = localStorage.getItem('AuthToken');
        const addProduct = await axios.post(`${import.meta.env.VITE_API_URL}/cart/additem`,
            {
            productId: prod._id,
            quantity:1
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        toast.success('added to cart')
    } catch (error) {
        toast.error(error.message,{
            position: "top-center"
        })
    }
}

const handleBack=()=>{
    navigate('/home')
}
    
  return (
    <div className="products-container">
        <header className="products-header">
            <button className="back-btn glass" onClick={handleBack}>← Back</button>
            <h2 className="products-title">{location.state?.data?._id} Collections</h2>
        </header>
        
        <div className="products-grid">
            {products && products.map((prod)=>(
                <div className="product-card glass" key={prod._id}>
                    <div className="product-badge">{prod.category}</div>
                    <div className="product-info">
                        <h3 className="product-name">{prod.name}</h3>
                        <p className="product-desc">{prod.description}</p>
                        <div className="product-footer">
                            <span className="product-price">${prod.price}</span>
                            <button className="add-to-cart-btn" onClick={()=>handleClick(prod)}>
                                + Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BrandProducts
