import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { API_URL } from '../features/constants';

const AuthForm = ({ type, onSuccess }) => {
  const [email, setEmail] = useState('darksouls3@example.com');
  const [password, setPassword] = useState('solaire123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // сброс ошибки перед новым запросом
    
    try {
      const response = await fetch(`${API_URL}/auth/${type}`, { // type для пути
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка авторизации');
      }

      const data = await response.json();
      
      dispatch(loginSuccess({
        token: data.token,
        role: data.role
      }));

      if (onSuccess) onSuccess(data);
      
      // перенаправление после успешной авторизации
      navigate('/');

    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Произошла ошибка при авторизации');
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