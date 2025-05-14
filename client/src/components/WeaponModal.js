import { useState, useEffect } from 'react';

const WeaponModal = ({ weapon, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Straight Sword',
    damage: 0,
    weight: 0
  });

  useEffect(() => {
    if (weapon) setFormData(weapon);
  }, [weapon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'damage' || name === 'weight' ? Number(value) : value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
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

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeaponModal;