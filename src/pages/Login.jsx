import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sachauhan008@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = (e) => {
    e.preventDefault();
    

    const hardcodedUser = {
      email: 'sachauhan008@gmail.com',
      password: '123456',
    };

    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      toast.success('Login Successful');
      setTimeout(() => navigate('/UserForm'), 1000);
    } else {
      toast.error('Login Failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>LOGIN PAGE</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
