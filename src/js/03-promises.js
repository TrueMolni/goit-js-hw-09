import Notiflix from 'notiflix';

const Refs = {
  delayRef: document.querySelector("input[name='delay']"),
  stepRef: document.querySelector("input[name='step']"),
  amountRef: document.querySelector("input[name='amount']"),
  formRef: document.querySelector('form'),
};

Refs.formRef.addEventListener('submit', onSubmitHandle);
Refs.formRef.addEventListener('input', onFormHandle);

function onSubmitHandle(event) {
  event.preventDefault();

  multiple(delay, step, amount);
  console.log(`${delay}, ${step}, ${amount}`);
}

// function createMePromise(horse) {
//   return new Promise((resolve, reject) => {
//     const time = 1000;
//     setTimeout(() => {
//       resolve({ horse, time });
//     }, time);
//   });
// }

function onFormHandle() {
  delay = Refs.delayRef.value;
  step = Refs.stepRef.value;
  amount = Refs.amountRef.value;
}

const multiple = (delay, step, amount) => {
  for (let i = 0; i < amount; i += 1) {
    let theDelay = 0;
    theDelay =
      Number.parseInt(delay) + Number.parseInt(step) * Number.parseInt(i);
    position = i + 1;

    console.log(theDelay);
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
