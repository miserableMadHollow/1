import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type, onSuccess }) => {  // Добавлен пропс onSuccess
  const [email, setEmail] = useState('darksouls3@example.com'); // Предзаполнен для теста
  const [password, setPassword] = useState('solaire123'); // Предзаполнен для теста
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка сервера');
      }
      
      const { token } = await response.json();
      localStorage.setItem('token', token);
      onSuccess(); // Важно вызвать ДО navigate
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error('Auth error:', err);
    }
  };



  return (
    <div className="auth-form">
      <h2>{type === 'login' ? 'Вход' : 'Регистрация'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">
          {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;