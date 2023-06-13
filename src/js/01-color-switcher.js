const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]')
};

let intervalID = null;
let isActive = false;

refs.startButton.disabled = false;
refs.stopButton.disabled = true;

refs.startButton.addEventListener('click', startInterval);
refs.stopButton.addEventListener('click', stopInterval);

function startInterval() {
  if (isActive) {
    return;
  }

  switchColors();
  intervalID = setInterval(switchColors, 1000);
  isActive = true;

  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;
}

function stopInterval() {
  clearInterval(intervalID);
  isActive = false;

  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
}

function switchColors() {
  const randomColor = getRandomColor();
  document.body.style.backgroundColor = randomColor;
  console.log(randomColor);
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

