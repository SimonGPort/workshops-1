class Engine {
  gameLoop = () => {
    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    while (this.enemies.length < this.totalEnemies) {
      let spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot, this.speedModifier));
    }
    if (this.isPlayerDead()) {
      window.alert('Game over');
      return;
    }
    this.score += timeDiff;
    if (this.score > 1000) {
      this.scoreText.domElement.style.left = GAME_WIDTH - 70 + 'px';
    }
    this.scoreText.update(this.score);
    this.speedModifier = Math.min(3, this.speedModifier + timeDiff * 0.0001);
    setTimeout(this.gameLoop, 20);
  };
  isPlayerDead = () => {
    // for (let i = 0; i < this.enemies.length; i++) {
    //   const enemy = this.enemies[i];
    //   if (
    //     enemy.x === this.player.x &&
    //     enemy.y + ENEMY_HEIGHT >= this.player.y
    //   ) {
    //     return true;
    //   }
    // }
    // return false;

    return this.enemies.some(
      (enemy) =>
        enemy.x + ENEMY_WIDTH >= this.player.x &&
        enemy.x <= this.player.x + PLAYER_WIDTH &&
        enemy.y + ENEMY_HEIGHT >= this.player.y &&
        enemy.y <= this.player.y + PLAYER_HEIGHT
    );
  };
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.speedModifier = 1;
    this.score = 0;
    this.scoreText = new Text(this.root, GAME_WIDTH - 50 + 'px', '10px');
    addBackground(this.root);
    this.totalEnemies = 2;
    const intervalId = setInterval(() => {
      if (this.totalEnemies < MAX_ENEMIES) {
        this.totalEnemies++;
      } else clearInterval(intervalId);
    }, 2000);
  }
}
