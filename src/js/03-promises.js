import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('success', position);
      } else {
        reject('denied', position);
      }
    }, delay);
  });
}

const Refs = {
  delayRef: document.querySelector("input[name='delay']"),
  stepRef: document.querySelector("input[name='step']"),
  amountRef: document.querySelector("input[name='amount']"),
  submitRef: document.querySelector('button'),
};

Refs.submitRef.addEventListener('click', onSubmitHandle);

function onSubmitHandle(event) {
  event.preventDefault();
}
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// function createMePromise(horse) {
//   return new Promise(resolve => {
//     const time = 1000;
//     setTimeout(() => {
//       resolve({ horse, time });
//     }, time);
//   });
// }

// createMePromise('Paw')
//   .then(x => console.log(x))
//   .catch(console.log(`❌ Rejected`));

Notiflix.Notify.success(`✅ Fulfilled promise position in delay ms`, {
  timeout: 2000,
});
