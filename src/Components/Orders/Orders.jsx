import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("AuthToken");
      if (!token) {
        toast.error("You are Not authorized");
        return;
      }
      try {
        const allOrders = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders/orderspage`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setOrders(allOrders.data.data); // ✅ store the array of orders
      } catch (err) {
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("AuthToken");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/orders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Order cancelled successfully");
      // update UI by removing/correcting cancelled order
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: "cancelled" } : o,
        ),
      );
      console.log("hiii");
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>Order ID: {order._id}</h3>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: order.orderStatus === "cancelled" ? "red" : "green",
                }}
              >
                {order.orderStatus}
              </span>
            </p>

            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Placed On:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <h4>Items:</h4>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx} style={{ listStyle: "none" }}>
                  {item.productId.name} — Qty: {item.quantity} — Price: ₹
                  {item.productId.price}
                </li>
              ))}
            </ul>

            {order.orderStatus !== "cancelled" && (
              <button
                onClick={() => cancelOrder(order._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
