import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://ecommerce-backend-lesb.onrender.com';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login Successful ✅');
      navigate('/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '400px', margin: '100px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', fontSize: '16px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', fontSize: '16px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>Don't have account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;