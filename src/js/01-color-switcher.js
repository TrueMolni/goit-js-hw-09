// посилання на body, кнопки start і stop
const Refs = {
  bodyRef: document.querySelector('body'),
  startButtonRef: document.querySelector('button[data-start]'),
  stopButtonRef: document.querySelector('button[data-stop]'),
};

// Тривалість
const DELAY = 1000;
// ф-ія для генерування довільного кольору в форматі HEX
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Ф-ія генерує і присвоює довільний backgroundColor Для body
const paintMyScreen = function () {
  Refs.bodyRef.style.backgroundColor = getRandomHexColor();
};

// буде зберігати id інтервалу всередині
let intervalId = null;

// евенти кліку для кнопок
Refs.startButtonRef.addEventListener('click', onStartButtonHandle);
Refs.stopButtonRef.addEventListener('click', onStopButtonHandle);

function onStartButtonHandle() {
  // Запускаємо інтервал, кожну секунду змінюємо колір
  intervalId = setInterval(paintMyScreen, DELAY);
  // При івенті даємо одній кнопці disabled, з другої знімаємо
  Refs.startButtonRef.setAttribute('disabled', true);
  Refs.stopButtonRef.removeAttribute('disabled');
}

function onStopButtonHandle() {
  // очищуємо інтервал
  clearInterval(intervalId);
  // При івенті даємо одній кнопці disabled, з другої знімаємо
  Refs.stopButtonRef.setAttribute('disabled', true);
  Refs.startButtonRef.removeAttribute('disabled');
}
