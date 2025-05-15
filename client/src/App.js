import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import WeaponModal from './components/WeaponModal';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchWeapons,
  createWeapon,
  updateWeapon,
  deleteWeapon 
} from './features/weapons/weaponsSlice';
import { loginSuccess, logout } from './features/auth/authSlice';
import { API_URL } from './features/constants';


const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};


function App() {
  const dispatch = useDispatch();
  const { items: weapons, status: weaponsStatus, error: weaponsError } = useSelector((state) => state.weapons);
  const { token, role, isAuthenticated } = useSelector((state) => state.auth);
  
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState(null);

  

  console.log('Redux state:', { weapons, weaponsStatus, isAuthenticated, role });

  useEffect(() => {
    if (checkAuth()) {
      const token = localStorage.getItem('token');
      const decoded = JSON.parse(atob(token.split('.')[1]));
      dispatch(loginSuccess({
        token,
        role: decoded.role || 'user'
      }));
    }
  }, [dispatch]);

   useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWeapons());
    }
  }, [isAuthenticated, dispatch]);

  const filteredWeapons = weapons.filter(weapon => 
    filter === 'all' || weapon.type === filter
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSaveWeapon = async (weaponData) => {
    try {
      if (editingWeapon) {
        await dispatch(updateWeapon({
          id: editingWeapon.id,
          data: weaponData
        })).unwrap();
      } else {
        await dispatch(createWeapon(weaponData)).unwrap();
      }
      setShowModal(false);
      setEditingWeapon(null);
      dispatch(fetchWeapons()); // наод обновить список после изменения
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert(`Ошибка: ${error.message}`);
    }
  };

  const handleDeleteWeapon = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это оружие?')) {
      try {
        await dispatch(deleteWeapon(id)).unwrap();
        dispatch(fetchWeapons()); // надо обновить список после удаления
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Не удалось удалить оружие');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <h2>Вход в каталог</h2>
        <AuthForm 
          type="login" 
          onSuccess={(userData) => {
            dispatch(loginSuccess(userData));
          }} 
        />
      </div>
    );
  }

console.log('Current user role:', role);
console.log('Is admin?', role === 'admin');

  return (
    <div className="App">
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
                <option value="Ultra Greatsword">Гигантские мечи</option>
                <option value="Katana">Катаны</option>
                <option value="Dagger">Ножи</option>
                <option value="Spear">Копья</option>
                <option value="Halberd">Алебарды</option>
                <option value="Axe">Топоры</option>
                <option value="Greataxe">Двуручные топоры</option>
                <option value="Hammer">Молоты</option>
                <option value="Great Hammer">Двуручные молоты</option>
                <option value="Fist">Кулачное оружие</option>
                <option value="Bow">Луки</option>
                <option value="Crossbow">Арбалеты</option>
                <option value="Staff">Посохи</option>
                <option value="Chime">Колокольчики</option>
                <option value="Pyromancy Flame">Пламя пироманта</option>
                <option value="Shield">Щиты</option>
          </select>
        </div>
        
        {role && role === 'admin' && (
          <button 
            className="add-weapon-btn"
            onClick={() => setShowModal(true)}
          >
            + Добавить оружие
          </button>
        )}
      </div>

      {weaponsStatus === 'loading' ? (
        <div className="loading">Загрузка...</div>
      ) : weaponsError ? (
        <div className="error">Ошибка: {weaponsError}</div>
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
                    </div>                    <div className="weapon-actions">
                      {role === 'admin' && (
                        <>
                          <button onClick={() => {
                            setEditingWeapon(weapon);
                            setShowModal(true);
                          }}>
                            Редактировать
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteWeapon(weapon.id)}
                          >
                            Удалить
                          </button>
                        </>
                      )}
                    </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              {filter === 'all' ? 'Оружие не найдено' : `Нет оружия типа "${filter}"`}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <WeaponModal
          weapon={editingWeapon}
          onClose={() => {
            setShowModal(false);
            setEditingWeapon(null);
          }}
          onSave={handleSaveWeapon}
        />
      )}
    </div>
  );
}

export default App;