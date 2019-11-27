let nextEnemySpot = (enemies) => {
  let enemySpots = GAME_WIDTH / ENEMY_WIDTH;
  let spotsTaken = new Array(gameEngine.totalEnemies + 2).map(() => false);
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    candidate = Math.floor(Math.random() * enemySpots);
  }
  return candidate;
};
let addBackground = (root) => {
  let bg = document.createElement('img');
  bg.id = 'bg';
  bg.src = 'images/stars.png';
  bg.style.height = GAME_HEIGHT + 'px';
  bg.style.width = GAME_WIDTH + 'px';
  root.append(bg);
  let whiteBox = document.createElement('div');
  whiteBox.id = 'whiteBox';
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = 'absolute';
  whiteBox.style.top = GAME_HEIGHT + 'px';
  whiteBox.style.height = ENEMY_HEIGHT + 'px';
  whiteBox.style.width = GAME_WIDTH + 'px';
  whiteBox.style.background = '#fff';
  root.append(whiteBox);
};
