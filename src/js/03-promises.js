import Notiflix from 'notiflix';

function createPromise(position, delay) {
  let nextDelay = 0;
  delay = 500;
  nextDelay += delay;
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('success', position);
      } else {
        reject('denied', position);
      }
    }, nextDelay);
  });
}

const Refs = {
  delayRef: document.querySelector("input[name='delay']"),
  stepRef: document.querySelector("input[name='step']"),
  amountRef: document.querySelector("input[name='amount']"),
  submitRef: document.querySelector('button'),
  formRef: document.querySelector('form'),
};
let firstDelay = 0;
let step = 0;
let amount = 0;

Refs.formRef.addEventListener('submit', onSubmitHandle);
Refs.formRef.addEventListener('input', onFormHandle);

function onSubmitHandle(event) {
  event.preventDefault();
  Refs.stepRef.value = event.target;
  Refs.amountRef.value = event.target;
  Refs.delayRef.value = event.target;
  console.log(Refs.stepRef.value);
  console.log(Refs.delayRef.value);
}

// function createMePromise(horse) {
//   return new Promise(resolve => {
//     const time = 1000;
//     setTimeout(() => {
//       resolve({ horse, time });
//     }, time);
//   });
// }

Notiflix.Notify.success(`✅ Fulfilled promise position in delay ms`, {
  timeout: 2000,
});

// function createPromise(position, delay) {
//   let nextDelay = 0;
//   nextDelay += delay;
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve(console.log('yay promise'));
//       } else {
//         reject(console.log("can't create promise"));
//       }
//     }, nextDelay);
//   });
// }

function onFormHandle() {
  formData.email = refs.inputRef.value;
  formData.message = refs.textareaRef.value;
}
