import Notiflix from 'notiflix';
// імпорт бібліотеки для сповіщень результату промісів

// посилання на три інпути та форму
const Refs = {
  delayRef: document.querySelector("input[name='delay']"),
  stepRef: document.querySelector("input[name='step']"),
  amountRef: document.querySelector("input[name='amount']"),
  formRef: document.querySelector('form'),
};

// підписуємось на сповіщення для опрацювання інпуту форми та відправки запиту
Refs.formRef.addEventListener('input', onFormHandle);
Refs.formRef.addEventListener('submit', onSubmitHandle);

// локальні змінні. Сюди приходять дані з трьох інпутів
// та порядковий номер промісу
let delay;
let step;
let amount;
let position;

// запис даних користувача в глобальні змінні для подальшого виклику промісів
function onFormHandle() {
  delay = Refs.delayRef.value;
  step = Refs.stepRef.value;
  amount = Refs.amountRef.value;
}

// опрацювання форми, виклик точної кількості промісів з введеними даними користувача
// виведення введених даних в консоль і очищення форми
function onSubmitHandle(event) {
  event.preventDefault();
  multiple(delay, step, amount);
  console.log(`${delay}, ${step}, ${amount}`);
  event.currentTarget.reset();
}

// створюємо цикл, к-сть ітерацій залежить від введеного значення користувачем
//  передані дані в функції обробляємо і переводимо з рядка в числа
const multiple = (delay, step, amount) => {
  for (let i = 0; i < amount; i += 1) {
    let theDelay = 0;
    theDelay =
      Number.parseInt(delay) + Number.parseInt(step) * Number.parseInt(i);
    position = i + 1;
    console.log(theDelay);

    // на основі оброблених даних викликаємо ф-ію для створення промісів,
    // куди передаємо порядковий номер і затримку.
    // в залежності від успішності проміса, викликаємо те, чи інше сповіщення
    createPromise(position, theDelay)
      .then(({ position, theDelay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${theDelay} ms`
        );
      })
      .catch(({ position, theDelay }) => {
        Notiflix.Notify.failure(
          ` ❌ Rejected  promise ${position} in ${theDelay} ms`
        );
      });
  }
};

// ф-ія для створення промісу
function createPromise(position, theDelay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, theDelay });
      } else {
        reject({ position, theDelay });
      }
    }, theDelay);
  });
}
