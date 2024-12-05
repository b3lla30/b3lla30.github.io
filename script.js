// Elementos del DOM
const colorPalette = document.getElementById('color-palette');
const partyTitle = document.getElementById('party-title');
const addColorBtn = document.getElementById('add-color-btn');
const resetBtn = document.getElementById('reset-btn');
const popularColorText = document.getElementById('popular-color');

// Contador de votos
let colorVotes = {};

// Temporizador de inactividad
let inactivityTimer;

// Función para actualizar el título con un color seleccionado
function selectColor(event) {
  const color = event.target.style.backgroundColor;
  partyTitle.style.color = color;

  // Contar los votos
  colorVotes[color] = (colorVotes[color] || 0) + 1;
  updatePopularColor();

  // Reiniciar temporizador de inactividad
  resetInactivityTimer();
}

// Actualizar el color más popular
function updatePopularColor() {
  const popularColor = Object.keys(colorVotes).reduce((a, b) =>
    colorVotes[a] > colorVotes[b] ? a : b, null
  );

  popularColorText.textContent = popularColor
    ? `¡El color más popular es: ${popularColor}!`
    : '¡El color más popular aparecerá aquí!';
}

// Agregar un nuevo color
function addNewColor() {
  const newColor = prompt('Introduce un nuevo color (nombre o código HEX):');
  if (newColor) {
    const button = createColorButton(newColor);
    colorPalette.appendChild(button);
  }
}

// Crear un botón de color
function createColorButton(color) {
  const button = document.createElement('button');
  button.className = 'color-btn';
  button.style.backgroundColor = color;
  button.textContent = color;

  // Añadir evento al botón
  button.addEventListener('click', selectColor);

  return button;
}

// Reiniciar la fiesta
function resetParty() {
  colorPalette.innerHTML = '';
  colorVotes = {};
  popularColorText.textContent = '¡El color más popular aparecerá aquí!';
  createDefaultColors();
}

// Crear colores iniciales
function createDefaultColors() {
  ['red', 'blue', 'green', 'yellow', 'purple'].forEach(color => {
    const button = createColorButton(color);
    colorPalette.appendChild(button);
  });
}

// Configurar temporizador de inactividad
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(resetParty, 10000);
}

// Inicializar eventos
addColorBtn.addEventListener('click', addNewColor);
resetBtn.addEventListener('click', resetParty);
createDefaultColors();
resetInactivityTimer();