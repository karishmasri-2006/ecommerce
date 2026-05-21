import { useState } from "react";

function Home() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 3,
      name: "Wireless Mouse",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },
    {
      id: 4,
      name: "Power Bank",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🛒 My Store
      </h1>

      {/* PRODUCTS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              width: "250px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h3>{product.name}</h3>

            <p
              style={{
                fontWeight: "bold",
              }}
            >
              ₹ {product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <h2>🛍 Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is Empty</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <div>
                  <h4>{item.name}</h4>
                  <p>₹ {item.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <h3>Total: ₹ {total}</h3>

            <button
              onClick={() =>
                alert("Checkout Successful ✅")
              }
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;