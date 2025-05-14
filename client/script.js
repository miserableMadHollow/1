async function fetchWeapons() {
    try {
      const response = await fetch('http://localhost:5000/api/weapons');
      const weapons = await response.json();
      renderWeapons(weapons);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  }

  
  
  function renderWeapons(weapons) {
    const content = document.getElementById('content');
    content.innerHTML = weapons.map(weapon => `
      <div class="weapon-card">
        <h3>${weapon.name}</h3>
        <p>Тип: ${weapon.type}</p>
        <p>Урон: ${weapon.damage}</p>
      </div>
    `).join('');
  }
  
  fetchWeapons();