import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormElSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onFormElSubmit(evt) {
  evt.preventDefault();
  
  const delay=+evt.target.elements.delay.value;
  const step=+evt.target.elements.step.value;
  const amount=+evt.target.elements.amount.value;
  
  for (let position = 1; position <= amount; position++) {
    // first promise must to be settled after (delay)ms
    // second promise must to be settled after(delay+step)ms
    // third promise must to be settled after (delay+step+step)ms
    // position-th promise must to be settled after (delay+step*(position-1))ms
    createPromise(position, delay + step * (position - 1))
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  } 
  // Метод formEl.reset(); не використовую, 
  // так як на відео показано, що форма не очищується   
}
