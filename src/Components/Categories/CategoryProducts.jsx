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
          `${process.env.REACT_APP_API_URL}/cart/additem`,
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
          `${process.env.REACT_APP_API_URL}/category/items/${category}`,
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
    <div className="Main-items">
      <div className="heading">
        <button onClick={handleBack}>🔙</button>
        <div className="title">
          <h2>{category.toUpperCase()}</h2>
        </div>
      </div>
      <div className="main-card">
        {products &&
          products.map((item) => {
            return (
              <div key={item._id} className="mini-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong> Price:</strong>{item.price}</p>
                <button id="add-btn" onClick={() => handleClick(item)}>
                  Add to cart
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryProducts;
