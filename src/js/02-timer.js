import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const Refs = {
  inputRef: document.querySelector('#datetime-picker'),
  startButtonRef: document.querySelector('button[data-start]'),
  timerRef: document.querySelector('.timer'),
  daysValueRef: document.querySelector('span[data-days]'),
  hoursValueRef: document.querySelector('span[data-hours]'),
  minutesValueRef: document.querySelector('span[data-minutes]'),
  secondsValueRef: document.querySelector('span[data-seconds]'),
};

const fp = flatpickr('#datetime-picker', options);

let id = null;
const DELAY = 1000;
// let userTime = [];

Refs.startButtonRef.addEventListener('click', onStartButtonHandle);
Refs.inputRef.addEventListener('OnClose', OnCloseHandle);

function onStartButtonHandle() {
  timer();
}

function OnCloseHandle(event) {
  userTime = event.target.value;
  console.log(userTime);
}

function render({ days, hours, minutes, seconds }) {
  Refs.hoursValueRef.textContent = pad(days);
  Refs.daysValueRef.textContent = pad(hours);
  Refs.minutesValueRef.textContent = pad(minutes);
  Refs.secondsValueRef.textContent = pad(seconds);
}
function timer() {
  const startTime = Date.now();

  id = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    if (deltaTime === 0) {
      window.alert('Please choose a date in the future');
      clearInterval(id);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    console.log(`${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)} `);
    Refs.startButtonRef.setAttribute('disabled', true);
    render({ days, hours, minutes, seconds });
  }, DELAY);
}

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

console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad(value) {
  return String(value).padStart(2, '0');
}
