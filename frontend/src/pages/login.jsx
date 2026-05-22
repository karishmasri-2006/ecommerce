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
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '250px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '250px' }}
        />
        <button type="submit" style={{ margin: '10px 0', padding: '8px 20px' }}>Login</button>
      </form>
      <p>Don't have account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;