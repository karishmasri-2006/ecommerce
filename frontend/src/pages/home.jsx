import { useState, useEffect } from 'react';

function home() {
  // Hardcoded products with real images - no backend update needed
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Noise cancelling bluetooth headphones",
      price: 2999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 1299,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Power Bank",
      description: "20000mAh fast charging power bank",
      price: 1999,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Smart Watch",
      description: "Fitness tracking smartwatch",
      price: 4999,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    }
  ]);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id? {...item, qty: item.qty + 1} : item
        );
      }
      return [...prev, {...product, qty: 1}];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id!== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    setLoading(true);

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
        {cart.length === 0? <p>Cart is empty</p> : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0', padding: '8px', background: '#f9f9f9', borderRadius: '4px' }}>
                <span>{item.name} x{item.qty}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span>₹ {item.price * item.qty}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ padding: '4px 8px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <h3>Total: ₹ {total}</h3>
            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{ padding: '12px 24px', background: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {loading? 'Processing...' : 'Checkout'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default home;