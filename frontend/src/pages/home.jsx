import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://ecommerce-backend-lesb.onrender.com';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProducts();
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [navigate]);

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
        item.id === product.id? {...item, qty: item.qty + 1 } : item
      );
    } else {
      newCart = [...cart, {...product, qty: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id!== productId);
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
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center', flex: 1 }}>🛍️ My Store</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
        marginTop: '20px'
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            background: 'white'
          }}>
            <img
              src={`https://via.placeholder.com/200?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
            />
            <h3 style={{ margin: '10px 0 5px 0', fontSize: '16px' }}>{product.name}</h3>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>{product.description}</p>
            <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>₹ {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                background: 'black',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px'
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '2px solid #ddd', paddingTop: '20px' }}>
        <h2>🛒 Cart</h2>
        {cart.length === 0? (
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
                  style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
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
                borderRadius: '4px',
                opacity: loading? 0.5 : 1
              }}
            >
              {loading? 'Processing...' : 'Checkout'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;