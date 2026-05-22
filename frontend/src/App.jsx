import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import Cart from "./pages/cart.jsx"; // ← ADD THIS LINE 1

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} /> {/* ← ADD THIS LINE 2 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;