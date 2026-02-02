import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("AuthToken");
        if (!token) {
          toast.error("You are not authorized");
          return;
        }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart/getitems`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(res.data.data.items);
        console.log(res.data.data.items);
      } catch (error) {
        toast.error(`${error.message}`);
      }
    };
    fetchCart();
  }, []);
  function priceCalc(prd, qty) {
    return Number(prd) * Number(qty);
  }
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalCost = cart.reduce(
    (acc, item) => acc + priceCalc(item.productId.price, item.quantity),
    0,
  );
  const handleOrderbtn = async()=>{
    const token = localStorage.getItem('AuthToken');
    if (!token) {
          toast.error("You are not authorized");
          return;
        }
    const order = await axios.get(`${import.meta.env.VITE_API_URL}/orders/order`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    toast.success('Order Placed!');
    navigate('/orders');
    console.log(order);
  }
  async function handleRemoveItem(itemId) {
    console.log(itemId);
    try {
      const token = localStorage.getItem("AuthToken");
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update state after successful removal
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(`Failed to remove item: ${error.message}`);
    }
  }

  async function handleQuantityChange(itemId, newQty) {
    try {
      const token = localStorage.getItem("AuthToken");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/item/${itemId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // Update state after successful update
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === itemId ? { ...item, quantity: Number(newQty) } : item,
        ),
      );
      toast.success("Quantity updated");
    } catch (error) {
      toast.error(`Failed to update quantity: ${error.message}`);
    }
  }
  return (
    <div className="Main-Cart">
      <div className="cart-items">
        {cart &&
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-wrapper">
                <div className="item-data">
                  <h4>Product: {item.productId.name}</h4>
                  <p>Description: {item.productId.description}</p>
                  <p>Brand: {item.productId.brand}</p>
                </div>
                <div className="item-price">
                  <p>Price:{item.productId.price}</p>
                  <label>Qty: <input type="number" min="1" value={item.quantity} onChange={(e)=> handleQuantityChange(item._id, e.target.value)} className="qty-input"/></label>
                  <p>
                    Total Cost: {priceCalc(item.productId.price, item.quantity)}
                  </p>
                </div>
                <div className="item-action">
                  <button className="remove-btn" onClick={()=> handleRemoveItem(item._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        <div className="summary-cart">
          <h3>🛒 Cart Summary</h3>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item._id}>
                {item.productId.name} × {item.quantity} = ₹
                {priceCalc(item.productId.price, item.quantity)}
              </li>
            ))}
          </ul>
          <div className="summary-totals">
            <p>
              <strong>Total Items:</strong> {totalItems}
            </p>
            <p>
              <strong>Total Cost:</strong> ₹{totalCost}
            </p>
          </div>
          <button className="place-order-btn" onClick={handleOrderbtn}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
