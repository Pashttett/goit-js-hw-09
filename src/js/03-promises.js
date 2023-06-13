
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const submitButton = document.querySelector('button[type="submit"]');

let delayValue = 0;
let stepValue = 0;
let amount = 0;
let delaySum = 0;

submitButton.disabled = false;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  submitButton.disabled = true;
  delayValue = +delayInput.value;
  stepValue = +stepInput.value;
  amount = +amountInput.value;
  delaySum = delayValue;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delaySum)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        if (i === amount) {
          submitButton.disabled = false;
        }
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        if (i === amount) {
          submitButton.disabled = false;
        }
      });

    delaySum += stepValue;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      if (shouldResolve) {
        const fulfilledPromise = { position, delay };
        resolve(fulfilledPromise);
      } else {
        const rejectedPromise = { position, delay };
        reject(rejectedPromise);
      }
    }, delay)
  });
}