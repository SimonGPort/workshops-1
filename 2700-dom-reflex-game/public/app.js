const body = document.body;
let lost = false;
let won = false;
const clicked = [];

function createButton(i) {
  const btn = document.createElement('button');
  btn.innerText = i;
  btn.addEventListener('click', () => {
    if (won || lost) return;
    clicked[i] = true;
    if (clicked.every((val) => val)) {
      won = true;
      document.getElementById('status').innerText = 'you won!';
    }
  });
  body.appendChild(btn);
}

function createButtons(count) {
  for (let i = 0; i < count; i++) {
    createButton(i);
    clicked.push(false);
  }
}

createButtons(getRandom(1, 5));

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setTimeout(() => {
  if (won || lost) return;
  lost = true;
  document.getElementById('status').innerText = 'You lost!';
}, getRandom(0, 1300) + clicked.length * 500);
