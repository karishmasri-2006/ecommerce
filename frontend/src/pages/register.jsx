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
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '250px' }}
        />
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
        <button type="submit" style={{ margin: '10px 0', padding: '8px 20px' }}>Register</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;