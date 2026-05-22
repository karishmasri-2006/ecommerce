import { useState, useEffect } from 'react';

function home() {  // lowercase to match filename
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://ecommerce-backend-lesb.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? {...item, qty: item.qty + 1} : item
        );
      }
      return [...prev, {...product, qty: 1}];
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    setLoading(true);
    
    // TEMP: Fake success since backend route doesn't exist yet
    setTimeout(() => {
      alert('Order placed successfully!');
      setCart([]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
              onError={(e) => e.target.src = `https://placehold.co/400x300?text=${product.name}`}
            />
            <h3>{product.name}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{product.description}</p>
            <h4>₹ {product.price}</h4>
            <button 
              onClick={() => addToCart(product)}
              style={{ width: '100%', padding: '10px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
        <h2>🛒 Cart</h2>
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
                <span>{item.name} x{item.qty}</span>
                <span>₹ {item.price * item.qty}</span>
              </div>
            ))}
            <h3>Total: ₹ {total}</h3>
            <button 
              onClick={handleCheckout} 
              disabled={loading}
              style={{ padding: '12px 24px', background: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default home; // lowercase export