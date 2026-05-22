import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products/checkout`,
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setCart([]);
        localStorage.removeItem("cart");
        alert("Checkout Successful ✅");
        navigate("/home");
      }
    } catch (err) {
      alert("Checkout failed: " + (err.response?.data?.message || err.message));
    }
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{ margin: "10px 0", borderBottom: "1px solid #ccc" }}>
              <p>{item.name} - ${item.price} x {item.qty}</p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
      <br />
      <button onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
}

export default Cart;