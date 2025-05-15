import React, { useState } from 'react';

const WeaponModal = ({ onClose, onSave, weapon }) => {
  const [formData, setFormData] = useState({
    name: weapon?.name || '',
    type: weapon?.type || 'Straight Sword',
    damage: weapon?.damage || 0,
    weight: weapon?.weight || 0,
    scaling: weapon?.scaling || { str: '', dex: '' },
    requiredAttributes: weapon?.requiredAttributes || { str: 0, dex: 0 }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const scalingData = {
      strength: formData.strength || '',
      dexterity: formData.dexterity || '',
      intelligence: formData.intelligence || '',
      faith: formData.faith || ''
    };

    const weaponData = {
      name: formData.name,
      type: formData.type,
      damage: Number(formData.damage),
      weight: Number(formData.weight),
      scaling: scalingData
    };

    console.log('Отправляемые данные:', weaponData);
    onSave(weaponData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{weapon ? 'Редактировать' : 'Добавить'} оружие</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
            />
          </div>

          <div className="form-group">
            <label>Тип:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Straight Sword">Прямой меч</option>
              <option value="Greatsword">Двуручный меч</option>
              <option value="Curved Sword">Изогнутый меч</option>
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

          <div className="form-row">
            <div className="form-group">
              <label>Урон:</label>
              <input
                type="number"
                name="damage"
                value={formData.damage}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Вес:</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeaponModal;