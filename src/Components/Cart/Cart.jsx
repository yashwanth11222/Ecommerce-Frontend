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
    <div className="cart-container">
      <h1 className="section-title">Your Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items-list">
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="cart-item-card glass">
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.productId.name}</h3>
                    <span className="item-brand">{item.productId.brand}</span>
                  </div>
                  <p className="item-desc">{item.productId.description}</p>
                </div>
                
                <div className="item-controls">
                  <div className="price-tag">
                    <span className="unit-price">${item.productId.price}</span>
                  </div>
                  
                  <div className="quantity-control glass">
                    <button 
                      className="qty-btn" 
                      onClick={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                    >–</button>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e)=> handleQuantityChange(item._id, e.target.value)} 
                      className="qty-input"
                    />
                    <button 
                      className="qty-btn" 
                      onClick={() => handleQuantityChange(item._id, Number(item.quantity) + 1)}
                    >+</button>
                  </div>
                  
                  <div className="item-total">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">${priceCalc(item.productId.price, item.quantity)}</span>
                  </div>
                  
                  <button className="remove-item-btn" onClick={()=> handleRemoveItem(item._id)}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart glass">
              <p>Your cart is empty.</p>
              <button className="auth-btn" onClick={() => navigate('/home')}>Start Shopping</button>
            </div>
          )}
        </div>

        {cart && cart.length > 0 && (
          <aside className="cart-summary glass">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalCost}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>${totalCost}</span>
              </div>
            </div>
            <button className="order-btn" onClick={handleOrderbtn}>
              Confirm Order
            </button>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Cart;
