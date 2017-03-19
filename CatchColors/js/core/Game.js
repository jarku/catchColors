function Game(Keyboard) {
    this._player;
    this._playerStartHealth = '3';
    this._enemies = [];
    this._enemySpeed = 3;
    this._keyboard = Keyboard;
    this._playerSpeed = 5;
    this._state = this.menu;
}

/**
* Method returns state of game.
* @returns {object}
*/
Game.prototype.getState = function () {
    return this._state;
};

/**
* Method returns the Player.
* @returns {object}
*/
Game.prototype.getPlayer = function () {
    return this._player;
};

/**
* Method returns the Enemies.
* @returns {object}
*/
Game.prototype.getEnemies = function () {
    return this._enemies;
};

/**
* Method sets game state.
*/
Game.prototype.setState = function (state) {
    if (state === 'play') {
        this._state = this.play;
    } else if (state === 'pause') {
        this._state = this.pause;
    } else if (state === 'menu') {
        this._state = this.menu;
    } else {
        this._state = this.pause;
    }
};

/**
* Method sets level sprites and resets game.
*/
Game.prototype.setLevel = function () {
    let activeScene = sceneRepo.getActiveScene();

    //set player
    this._player = sceneRepo.getSceneByName(activeScene).getSprite('player');
    this.resetPlayer();

    //set displayed health
    let life = sceneRepo.getSceneByName(activeScene).getSprite('lifeCounter');
    life.text = this._playerStartHealth;

    //set enemies
    this._enemies = sceneRepo.getSceneByName(activeScene).getEnemies();
    this.resetEnemies();

    this.setState('play');
};

/**
* Method resets enemy sprites positions and velocity.
*/
Game.prototype.resetEnemies = function () {
    let enemiesQuantity = this._enemies.length;

    for (let index = 0; index < enemiesQuantity; index++) {
        if (this._enemies[index].startPositionX) {
            this._enemies[index].x = this._enemies[index].startPositionX;
        } else {
            this._enemies[index].x = GAME_WIDTH - Math.floor((Math.random() * GAME_WIDTH) + 1);
        }
        
        this._enemies[index].vx = this._enemySpeed;
    }
};

/**
* Method resets player sprite position and velocity.
*/
Game.prototype.resetPlayer = function () {
    this._player.x = 600;
    this._player.vx = 0;
};

/**
* Game state play.
*/
Game.prototype.play = function () {
    this.movePlayer();
    this.moveEnemies();
};

/**
* Game state menu.
*/
Game.prototype.menu = function () {

};

/**
* Game state pause.
*/
Game.prototype.pause = function () {

};

/**
* Main game logic loop
*/
Game.prototype.gameLoop = function () {
    setTimeout(() => {
        this._state();
        this.gameLoop();
    }, 16);
};

/**
* Method check's if key was pushed .
* and moves player sprite
*/
Game.prototype.movePlayer = function () {
    if (this._keyboard.getKeysState().ARROW_LEFT) {
        this._player.x -= this._playerSpeed;
    }
    if (this._keyboard.getKeysState().ARROW_RIGHT) {
        this._player.x += this._playerSpeed;
    }
};

/**
* Method moves enemies.
*/
Game.prototype.moveEnemies = function () {
    this._enemies.forEach(function (enemy) {
        if ("reverse" === enemy.moveDirection) {
            enemy.x -= enemy.vx;
        } else {
            enemy.x += enemy.vx;
        }

        let enemyHitsWall = Game.prototype.contain(enemy, {
            x: enemy.width,
            y: enemy.height,
            width: 1280 - enemy.width,
            height: 720 - enemy.height
        });

        if (true === enemyHitsWall) {
            enemy.vx *= -1;
        }
    });
};


/**
* Method checks if object is contained in another.
* @param {object} sprite that should be contained
* @param {object} container that should contain object
* @returns {boolean}
*/
Game.prototype.contain = function (sprite, container) {
    let contain = false;

    //Left
    if (sprite.x < container.x) {
        sprite.x = container.x;
        contain = true;
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        contain = true;
    }

    return contain;
};