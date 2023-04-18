import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDateTimePickerEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  daysTextValueEl: document.querySelector('[data-days]'),
  hoursTextValueEl: document.querySelector('[data-hours]'),
  minutesTextValueEl: document.querySelector('[data-minutes]'),
  secondsTextValueEl: document.querySelector('[data-seconds]'),
  timerEl: document.querySelector('.timer'),
};
const styleElMarkup = `
<style>
  .timer {
    display: flex;
    gap: 5px;
  }
  .field {
    padding: 5px;
    display: flex;
    flex-direction: column;
    // outline: 2px ridge rgba(170, 50, 220, .6);
    // border-radius: 10px;
  } 
  .value {
    display: flex;
    justify-content: center;
    font-size: 38px;    
    // border-bottom: thick double #32a1ce;
  }
  .label {
    display: flex;
    justify-content: center;
    font-size: 12px;
    text-transform: uppercase;
  }
</style>`;

refs.timerEl.insertAdjacentHTML('beforebegin', styleElMarkup);

let targetDateInMs = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    targetDateInMs = selectedDates[0].getTime();

    if (timeLeftInMs() < 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtnEl.disabled = false;
    }
  },
};

flatpickr(refs.inputDateTimePickerEl, options);

refs.startBtnEl.disabled = true;

function timeLeftInMs() {
  return targetDateInMs - Date.now();
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
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
refs.startBtnEl.addEventListener('click', onStartBtnClick);
function onStartBtnClick() {
  timerId = setInterval(() => {
    const timerValueObj = convertMs(timeLeftInMs());
    updateTimerValue(timerValueObj);
    if (timeLeftInMs() < 1000) {
      refs.inputDateTimePickerEl.disabled = false;
      Notify.success('😎 Time is up!');
      clearInterval(timerId);
    }
  }, 1000);
  refs.startBtnEl.disabled = true;
  refs.inputDateTimePickerEl.disabled = true;
}

function updateTimerValue({ days, hours, minutes, seconds }) {
  refs.daysTextValueEl.textContent = addLeadingZero(days);
  refs.hoursTextValueEl.textContent = addLeadingZero(hours);
  refs.minutesTextValueEl.textContent = addLeadingZero(minutes);
  refs.secondsTextValueEl.textContent = addLeadingZero(seconds);
}
