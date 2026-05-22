import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://ecommerce-backend-lesb.onrender.com';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.log('Error fetching products:', err);
    }
  };

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    let newCart;
    if (exists) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login first');
      const res = await axios.post(
        `${API_URL}/api/products/checkout`,
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert('Checkout Successful ✅');
        setCart([]);
        localStorage.removeItem('cart');
      }
    } catch (err) {
      console.log(err);
      alert('Checkout failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>🛍️ My Store</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '16px',
            textAlign: 'center'
          }}>
            <img 
              src={product.image || 'https://via.placeholder.com/200'} 
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              style={{
                background: 'black',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '2px solid #ddd', paddingTop: '20px' }}>
        <h2>🛒 Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #eee'
              }}>
                <span>{item.name} x{item.qty}</span>
                <span>₹ {item.price * item.qty}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}
                >
                  Remove
                </button>
              </div>
            ))}
            <h3>Total: ₹ {getTotal()}</h3>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              style={{
                background: 'green',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;