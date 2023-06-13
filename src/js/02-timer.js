
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
});

import "flatpickr/dist/flatpickr.min.css";

Notiflix.Notify.info('Choose a future date');

const refs = {
  startButton: document.querySelector('button[data-start]'),
  datePicker: document.getElementById('datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  now: Date.now(),

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < this.now) {
      refs.startButton.disabled = true;
      Notiflix.Notify.failure('Please choose a future date');
    } else {
      refs.startButton.disabled = false;
      Notiflix.Notify.success('Date selected. Press start!');
    }
  },
};

const datePicker = flatpickr("#datetime-picker", options);
refs.startButton.disabled = true;

class Timer {
  constructor({ onTick }) {
    this.intervalID = null;
    this.isActive = false;
    this.remainingTime = 0;
    this.onTick = onTick;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    const targetTime = new Date(refs.datePicker.value);

    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      this.remainingTime = targetTime - currentTime;

      if (this.remainingTime > 0) {
        const timeObject = this.convertMs(this.remainingTime);
        this.onTick(timeObject);
      } else {
        Notiflix.Notify.info('Time is up');
        clearInterval(this.intervalID);
        this.isActive = false;
      }
    }, 1000);
  }

  convertMs(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = String(days).padStart(2, '0');
  refs.hours.textContent = String(hours).padStart(2, '0');
  refs.minutes.textContent = String(minutes).padStart(2, '0');
  refs.seconds.textContent = String(seconds).padStart(2, '0');
}

const timer = new Timer({
  onTick: updateClock,
});

refs.startButton.addEventListener('click', () => timer.startTimer());
