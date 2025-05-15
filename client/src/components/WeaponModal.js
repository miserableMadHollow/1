import { useState, useEffect } from 'react';

const WeaponModal = ({ weapon, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Straight Sword',
    damage: 0,
    weight: 0,
    scaling: {
      strength: '',
      dexterity: '',
      intelligence: '',
      faith: ''
    }
  });

  useEffect(() => {
    if (weapon) {
      setFormData({
        name: weapon.name || '',
        type: weapon.type || 'Straight Sword',
        damage: weapon.damage || 0,
        weight: weapon.weight || 0,
        scaling: weapon.scaling || {
          strength: '',
          dexterity: '',
          intelligence: '',
          faith: ''
        }
      });
    }
  }, [weapon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'damage' || name === 'weight' ? Number(value) : value
    }));
  };

  const handleScalingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      scaling: {
        ...prev.scaling,
        [name]: value
      }
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{weapon ? 'Редактировать' : 'Добавить'} оружие</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}>
          <label>
            Название:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          
          <label>
            Тип:
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Straight Sword">Прямой меч</option>
              <option value="Greatsword">Двуручный меч</option>
              <option value="Curved Sword">Изогнутый меч</option>
              <option value="Ultra Greatsword">Гигантский меч</option>
              <option value="Katana">Катана</option>
              <option value="Dagger">Кинжал</option>
              <option value="Spear">Копье</option>
              <option value="Halberd">Алебарда</option>
              <option value="Axe">Топор</option>
              <option value="Greataxe">Двуручный топор</option>
              <option value="Hammer">Молот</option>
              <option value="Great Hammer">Двуручный молот</option>
              <option value="Fist">Кулачное оружие</option>
              <option value="Bow">Лук</option>
              <option value="Crossbow">Арбалет</option>
              <option value="Staff">Посох</option>
              <option value="Chime">Колокольчик</option>
              <option value="Pyromancy Flame">Пламя пироманта</option>
              <option value="Shield">Щит</option>
            </select>
          </label>

          <label>
            Урон:
            <input
              type="number"
              name="damage"
              value={formData.damage}
              onChange={handleChange}
              min="0"
              required
            />
          </label>

          <label>
            Вес:
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </label>

          <div className="scaling-section">
            <h4>Масштабирование характеристик:</h4>
            <label>
              Сила:
              <select
                name="strength"
                value={formData.scaling.strength}
                onChange={handleScalingChange}
              >
                <option value="">-</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </label>

            <label>
              Ловкость:
              <select
                name="dexterity"
                value={formData.scaling.dexterity}
                onChange={handleScalingChange}
              >
                <option value="">-</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </label>

            <label>
              Интеллект:
              <select
                name="intelligence"
                value={formData.scaling.intelligence}
                onChange={handleScalingChange}
              >
                <option value="">-</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </label>

            <label>
              Вера:
              <select
                name="faith"
                value={formData.scaling.faith}
                onChange={handleScalingChange}
              >
                <option value="">-</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Отмена</button>
            <button type="submit" className="save-btn">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeaponModal;