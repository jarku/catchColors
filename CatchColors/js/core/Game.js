function Game(Keyboard) {
    this._player;
    this._enemies = [];
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
* Method sets level sprites.
*/
Game.prototype.setLevel = function () {
    let activeScene = sceneRepo.getActiveScene();

    //set player
    this._player = sceneRepo.getSceneByName(activeScene).getSprite('player');
    this._player.x = 600;
    this._player.vx = 0;

    //set player health
    life = sceneRepo.getSceneByName(activeScene).getSprite('lifeCounter');
    life.text = '3';

    this.setState('play');
};

/**
* Game state play.
*/
Game.prototype.play = function () {
    this.movePlayer();
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
* Method moves player sprite.
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
