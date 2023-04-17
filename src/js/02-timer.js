import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs={
    inputDateTimePickerEl:document.querySelector("#datetime-picker"),
    startBtnEl:document.querySelector("[data-start]"),
    daysTextValueEl:document.querySelector("[data-days]"),
    hoursTextValueEl:document.querySelector("[data-hours]"),
    minutesTextValueEl:document.querySelector("[data-minutes]"),
    secondsTextValueEl:document.querySelector("[data-seconds]"),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const targetDateInMs=selectedDates[0].getTime();
      const currentDateInMs=Date.now().getTime();
      const timeLeftInMs= targetDateInMs-currentDateInMs;

      console.log('Current time in ms:', currentDateInMs);
      console.log('Target time in ms:', targetDateInMs);
    //   console.log('Target time in ms:', selectedDates[0].getTime());
      console.log('Time left in ms:', (targetDateInMs-currentDateInMs));
      refs.startBtnEl.disabled=false;
    },
  };

flatpickr(refs.inputDateTimePickerEl, options);

refs.startBtnEl.disabled=true;
