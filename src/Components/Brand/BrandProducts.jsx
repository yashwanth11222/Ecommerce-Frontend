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
        const addProduct = await axios.post(`${process.env.REACT_APP_API_URL}/cart/additem`,
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
    <div className="brand-products">
        <h2>
            <button className="back-btn" onClick={handleBack}>🔙</button>
            <div className="Brand-title">{location.state?.data?._id}</div>
        </h2>
        <div className="product-grid">
            {products && products.map((prod)=>(
                <div className="product-card" key={prod._id}>
                    <h3>{prod.name}</h3>
                    <p>{prod.description}</p>
                    <p><strong>Price:</strong>{prod.price}</p>
                    <p><strong>Category:</strong>{prod.category}</p>
                    <br />
                    <button id="add-btn" onClick={()=>handleClick(prod)}>Add to Cart</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BrandProducts
