import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Categories.css";
import axios from "axios";
import { toast } from "react-hot-toast";


const CategoryProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  function handleClick(item) {
    const addproduct = async () => {
      try {
        const token = localStorage.getItem("AuthToken");
        const addProduct = await axios.post(
          `${import.meta.env.VITE_API_URL}/cart/additem`,
          {
            productId: item._id,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // console.log(addProduct);
        toast.success("Added to cart");
      } catch (error) {
        toast.error(`${error.message}`);
      }
    };
    addproduct();
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/category/items/${category}`,
        );

        setProducts(res.data.data);
      } catch (error) {
        console.log("Error fetching data: ", error.message);
      }
    };
    fetchProducts();
  }, []);
  const handleBack=()=>{
    navigate('/categories');
  }

  return (
    <div className="products-container">
      <header className="products-header">
        <button className="back-btn glass" onClick={handleBack}>← Back</button>
        <h2 className="products-title">{category.toUpperCase()} Collections</h2>
      </header>
      
      <div className="products-grid">
        {products &&
          products.map((item) => {
            return (
              <div key={item._id} className="product-card glass">
                <div className="product-badge">{category}</div>
                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-desc">{item.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${item.price}</span>
                    <button className="add-to-cart-btn" onClick={() => handleClick(item)}>
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryProducts;
