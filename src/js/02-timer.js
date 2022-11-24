import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

console.log(flatpickr);

const Refs = {
  inputRef: document.querySelector('#datetime-picker'),
  startButtonRef: document.querySelector('button[data-start]'),
  timerRef: document.querySelector('.timer'),
  daysValueRef: document.querySelector('span[data-days]'),
  hoursValueRef: document.querySelector('span[data-hours]'),
  minutesValueRef: document.querySelector('span[data-minutes]'),
  secondsValueRef: document.querySelector('span[data-seconds]'),
};
console.log(Refs.inputRef);
console.log(Refs.startButtonRef);
console.log(Refs.timerRef);
