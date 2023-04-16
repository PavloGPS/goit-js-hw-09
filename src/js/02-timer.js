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
    },
  };
flatpickr(refs.inputDateTimePickerEl, options);
