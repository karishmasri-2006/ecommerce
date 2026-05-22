import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://ecommerce-backend-lesb.onrender.com';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      alert('Register Successful ✅');
      navigate('/login');
    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '400px', margin: '100px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', fontSize: '16px' }}
        />
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
          Register
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;