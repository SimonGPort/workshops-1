const status = document.getElementById('status');
const ROUNDS = 3;
const wins = { p: 0, q: 0 };
let won = '';
let gameStarted = false;

const sounds = {
  signal: new Audio('/static/horn.mp3'),
  win: new Audio('/static/win.mp3'),
  drum: new Audio('/static/drum.wav'),
};

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  console.log(key);
  if (won !== '' || (key !== 'p' && key !== 'q')) return;

  if (key === 'p') {
    won = gameStarted ? 'p' : 'q';
  }
  if (key === 'q') {
    won = gameStarted ? 'q' : 'p';
  }

  // alternative logic
  // if (gameStarted) won = key;
  // else if (key === 'p') won = 'q'
  // else won = 'p'

  wins[won]++;
  endRound();
});

function endRound() {
  stopAudio('drum');
  stopAudio('signal');
  sounds.win.play();
  if (wins.p < ROUNDS && wins.q < ROUNDS) {
    status.textContent = won + ' WON THE ROUND! 🎉';
    setTimeout(startGame, 1000);
  } else {
    status.innerHTML =
      won +
      ' WON THE GAME!  <img src="https://i1.wp.com/azwildlife.org/wp-content/uploads/2018/07/trophy.png?resize=233%2C233&ssl=1" >';
  }
}

function startGame() {
  stopAudio('win');
  sounds.drum.play();
  won = '';
  gameStarted = false;
  status.innerHTML =
    '<img src="https://media.giphy.com/media/116seTvbXx07F6/giphy.gif" >';
  setTimeout(() => {
    if (won !== '') return;
    status.innerHTML = '<img src="http://www.orokos.com/odam/kart/go.png" >';
    stopAudio('drum');
    sounds.signal.play();
    gameStarted = true;
  }, getRandom(500, 1500));
}

// Add a button to trigger the start function otherwise the browser prevents audio from playing.
status.innerHTML = '<button onclick="startGame()">START</button>';

// Helper functions

function stopAudio(filename) {
  const sound = sounds[filename];
  sound.pause();
  sound.currentTime = 0;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
