const status = document.getElementById('status');
const game = document.getElementById('game');
let buttons;
let won;
let lost;

function createButton(i) {
  const btn = document.createElement('button');
  const winCount = getRandom(2, 5);
  btn.textContent = winCount;
  btn.style.padding = '20px';
  btn.addEventListener('click', () => {
    if (won || lost) return;
    const clicked = buttons[i];
    clicked.counter++;
    btn.textContent = clicked.winCount - clicked.counter;
    btn.style.position = 'absolute';
    btn.style.top = getRandom(0, 90) + '%';
    btn.style.left = getRandom(0, 90) + '%';
    if (clicked.counter >= clicked.winCount) {
      btn.remove();
    }
    if (buttons.every((btnObj) => btnObj.counter >= btnObj.winCount)) {
      won = true;
      status.textContent = 'You won!';
      endGame();
    }
  });
  game.appendChild(btn);
  buttons[i] = {
    counter: 0,
    winCount: winCount,
  };
}

let timerId;
let intervalId;
function startTimer() {
  let timeLeft = buttons.reduce(
    (acc, btnObj) => acc + 500 * btnObj.winCount,
    0
  );
  timerId = setTimeout(() => {
    if (won || lost) return;
    lost = true;
    status.textContent = 'You lost!';
    endGame();
  }, timeLeft);
  intervalId = setInterval(() => {
    timeLeft -= 10;
    if (timeLeft <= 1000) {
      document.body.className = 'alert';
      status.className = 'alert';
      status.textContent = `ALERT! ${timeLeft}ms left!`;
    } else {
      status.textContent = `${timeLeft}ms left`;
    }
  }, 10);
}

function startGame() {
  game.innerHTML = '';
  const rand = getRandom(1, 10);
  for (let i = 0; i < rand; i++) {
    createButton(i);
  }
  startTimer();
}

function endGame() {
  clearTimeout(timerId); // clear the timeout triggering a loss in case the player was very quick and it didn't execute yet
  clearInterval(intervalId);
  document.body.className = '';
  status.className = '';
  addRestartBtn();
}

function addRestartBtn() {
  const restartBtn = document.createElement('button');
  restartBtn.style.display = 'block';
  restartBtn.textContent = 'Restart';
  restartBtn.addEventListener('click', setupGame);
  game.appendChild(restartBtn);
}

function initValues() {
  won = false;
  lost = false;
  buttons = [];
}

function setupGame() {
  initValues();
  const startTimer = getRandom(500, 1500);
  status.textContent = '';
  game.textContent = `Starting in ${startTimer / 1000} seconds...`;
  setTimeout(startGame, startTimer);
}

setupGame();

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
