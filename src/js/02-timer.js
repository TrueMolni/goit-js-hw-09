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
console.log(fp);

fp.config.onChange.push(function (selectedDates, dateStr, fp) {});

let ValidDate = null;
let id = null;
const DELAY = 1000;

// console.log(Date.now());
// console.log(ValidDate);

Refs.startButtonRef.addEventListener('click', onStartButtonHandle);
Refs.inputRef.addEventListener('OnClose', OnCloseHandle);

function onStartButtonHandle() {
  const startTime = Date.now();
  id = setInterval(() => {
    const currentTime = Date.now();
    console.log(startTime - currentTime);
    // ValidDate = userTime - time;
    // console.log(convertMs(ValidDate));

    render();
    Refs.startButtonRef.setAttribute('disabled', true);
  }, DELAY);
}

function OnCloseHandle() {
  ValidDate = fp.selectedDates[0].getTime() - Date.now();
  console.log(ValidDate);
  // if (ValidDate <= 0) {
  //   window.alert('Please choose a date in the future');
  // }
}
function render() {
  userTime = fp.selectedDates[0].getTime();
  // console.log(userTime);
  // Refs.hoursValueRef.textContent = convertMs(time);
}

render();

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad(value) {
  return String(value).padStart(2, '0');
}
