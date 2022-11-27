import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// імпорти

// об'єкт налаштувань для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  //метод, де відбувається валідація вибраної дати.
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const deltaTime = selectedDates[0] - Date.now();
    if (deltaTime <= 0) {
      window.alert('Please choose a date in the future');
    }

    if (deltaTime > 0) {
      // якщо обрана дата в майбутньому, записуємо цю дату в змінну
      // робимо кнопку таймеру активною
      Refs.startButtonRef.removeAttribute('disabled');
      startTime = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);
// глобальні змінні
let startTime = 0;
const DELAY = 1000;
let id = null;

// посилання на кнопку, табло таймеру
const Refs = {
  startButtonRef: document.querySelector('button[data-start]'),
  daysValueRef: document.querySelector('span[data-days]'),
  hoursValueRef: document.querySelector('span[data-hours]'),
  minutesValueRef: document.querySelector('span[data-minutes]'),
  secondsValueRef: document.querySelector('span[data-seconds]'),
};

Refs.startButtonRef.addEventListener('click', onStartButtonHandle);
Refs.startButtonRef.setAttribute('disabled', true);
function onStartButtonHandle() {
  timer();
}

// оновлює значення для табла таймеру
function render({ days, hours, minutes, seconds }) {
  Refs.daysValueRef.textContent = pad(days);
  Refs.hoursValueRef.textContent = pad(hours);
  Refs.minutesValueRef.textContent = pad(minutes);
  Refs.secondsValueRef.textContent = pad(seconds);
}

// запускаємо зворотній таймер, дату передаємо зі змінної startTime.
// конвертуємо дату у форматі хх:xx:xx:xx і записуємо дані у табло через рендер
function timer() {
  id = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    console.log(`${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)} `);
    Refs.startButtonRef.setAttribute('disabled', true);
    render({ days, hours, minutes, seconds });

    if (deltaTime <= 0) {
      clearInterval(id);
      render({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, DELAY);
}

// підраховує час, повертає об'єкт з днями, годинами, хвилинами, секундами
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// передаємо значення, отримуємо рядок для наших спанів у форматі 00
function pad(value) {
  return String(value).padStart(2, '0');
}
