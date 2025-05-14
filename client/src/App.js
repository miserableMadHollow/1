import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import WeaponModal from './components/WeaponModal';

const API_URL = 'http://localhost:5000/api';  

function App() {
  const [weapons, setWeapons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState(null);

  useEffect(() => {
    if (isAuth) {
      loadData();
    }
  }, [isAuth]);


  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapons`);
      if (!response.ok) throw new Error('Ошибка загрузки');
      const data = await response.json();
      setWeapons(data);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось загрузить данные');
    } finally {
      setIsLoading(false);
    }
  };


  const [filter, setFilter] = useState('all');

  const filteredWeapons = weapons.filter(weapon => 
    filter === 'all' || weapon.type === filter
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };



  const fetchWeapons = async () => {
    try {
      const response = await fetch(`${API_URL}/weapons`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setWeapons(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  const handleDeleteWeapon = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/weapons/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWeapons(weapons.filter(weapon => weapon.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

const handleSaveWeapon = async (weaponData) => {
  const token = localStorage.getItem('token');
  try {
    const url = editingWeapon 
      ? `${API_URL}/weapons/${editingWeapon.id}`
      : `${API_URL}/weapons`;
      
    const method = editingWeapon ? 'PUT' : 'POST';
    
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(weaponData)
    });
    
    fetchWeapons();
    setShowModal(false);
  } catch (error) {
    console.error('Save error:', error);
  }
};

  return (
    <div className="App">
      {!isAuth ? (
        <div className="auth-container">
          <h2>Вход в каталог</h2>
          <AuthForm 
  type="login" 
  onSuccess={() => {
    console.log('Auth success!'); // Для отладки
    setIsAuth(true);
  }} 
/>
        </div>
      ) : (
        <> 
          <header>
            <h1>Dark Souls III Weapons Catalog</h1>
            <button onClick={handleLogout} className="logout-btn">
              Выйти
            </button>
          </header>

          <div className="controls">
            <div className="filters">
              <label>Фильтр по типу:</label>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Все типы</option>
                <option value="Straight Sword">Прямые мечи</option>
                <option value="Greatsword">Двуручные мечи</option>
                <option value="Curved Sword">Изогнутые мечи</option>
              </select>
            </div>
            
            <button 
              className="add-weapon-btn"
              onClick={() => setShowModal(true)}
            >
              + Добавить оружие
            </button>
          </div>

          {isLoading ? (
            <div className="loading">Загрузка...</div>
          ) : (
            <div className="weapons-grid">
              {filteredWeapons.length > 0 ? (
                filteredWeapons.map(weapon => (
                  <div key={weapon.id} className="weapon-card">
                    <h3>{weapon.name}</h3>
                    <div className="weapon-details">
                      <p><strong>Тип:</strong> {weapon.type}</p>
                      <p><strong>Урон:</strong> {weapon.damage}</p>
                      <p><strong>Вес:</strong> {weapon.weight}</p>
                      {weapon.scaling && (
                        <p><strong>Скейлинг:</strong> {Object.entries(weapon.scaling).map(([stat, grade]) => (
                          `${stat}: ${grade} `
                        ))}</p>
                      )}
                    </div>
                    <div className="weapon-actions">
                      <button 
                        onClick={() => {
                          setEditingWeapon(weapon);
                          setShowModal(true);
                        }}
                      >
                        Редактировать
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteWeapon(weapon.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  {filter === 'all' 
                    ? 'Оружие не найдено' 
                    : `Нет оружия типа "${filter}"`}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
    
  );
  
}




export default App;