function Game(Keyboard, Loader) {
    this._player;
    this._playerStartHealth = '3';
    this._enemies = [];
    this._enemySpeed = 3;
    this._keyboard = Keyboard;
    this._loader = Loader;
    this._sprites;
    this._playerSpeed = 5;
    this._state = this.menu;
    this._enemyActivity = 5;
    this._enemy;
    this._gameStage;
    this._eggs = [];

    this.setGameStage();
}

Game.prototype = {

    /**
    * Method returns state of game.
    * @returns {object}
    */
    getState : function () {
        return this._state;
    },

    /**
    * Method returns the Player.
    * @returns {object}
    */
    getPlayer : function () {
        return this._player;
    },

    /**
    * Method returns the Enemies.
    * @returns {object}
    */
    getEnemies : function () {
        return this._enemies;
    },

    /**
    * Method sets current game stage.
    */
    setGameStage : function () {
        this._gameStage = sceneRepo.getSceneByName(sceneRepo.getActiveScene());
    },

    /**
    * Method sets game state.
    * @param {string} state to change to
    */
    setState : function (state) {
        if (state === 'play') {
            this._state = this.play;
        } else if (state === 'pause') {
            this._state = this.pause;
        } else if (state === 'menu') {
            this._state = this.menu;
        } else {
            this._state = this.pause;
        }
    },

    /**
    * Method sets level sprites and resets game.
    */
    setLevel : function () {
        this.setGameStage();

        //set player
        this.resetPlayer();

        //set displayed health
        let life = this._gameStage.getSprite('lifeCounter');
        life.text = this._playerStartHealth;

        //set enemies
        this._enemies = this._gameStage.getEnemies();
        this.resetEnemies();

        //set eggs
        this.resetEggs();
    
        setTimeout(() => {
            this.setState('play');
        },200);
    
    },

    /**
    * Method resets enemy sprites positions and velocity.
    */
    resetEnemies : function () {
        let enemiesQuantity = this._enemies.length,
            enemy;

        for (let index = 0; index < enemiesQuantity; index++) {
            enemy = this._enemies[index];
            enemy.x = this.getRandom(40, 1240);
            enemy.y = this.getRandom(40, 300);
            enemy.newX = this.getRandom(40, 1240);
            enemy.newY = this.getRandom(40, 300);
            enemy.canShoot = true;
        }
    },

    /**
    * Method resets player sprite position, velocity, color.
    */
    resetPlayer: function () {
        if (this._gameStage.getSprite('player')) {
            this._gameStage._sceneContainer.removeChild(this._player);
        }
        let sprites = this._loader.getSprites(),
            color = this.generateColor();
        this._player = new PIXI.Sprite(sprites['basket_' + color + '.png']);
        this._player.color = color;
        this._player.y = 600;
        this._player.x = GAME_WIDTH / 2 - this._player.width / 2;
        this._player.vx = 0;
        this._player.name = 'player';
        this._gameStage._sceneContainer.addChild(this._player);
    },

    /**
    * Method deletes eggs sprites.
    */
    resetEggs: function () {
        let eggsQuantity = this._eggs.length;
        for (let index = 0; index < eggsQuantity; index++) {
            this._eggs[index].parent.removeChild(this._eggs[index]);
        }
        this._eggs = [];
    },

    /**
    * Game state play.
    * @param {number} game delta
    */
    play: function (delta) {
        //console.log('play' + delta);
        this.movePlayer(delta);
        this.enemyAction(this._gameStage, delta);
        this.moveEgg(this._gameStage, delta);
    },

    /**
    * Game state menu.
    */
    menu : function () {
    },

    /**
    * Game state pause.
    */
    pause : function () {
    },

    /**
    * Main game logic loop
    */
    gameLoop : function () {
        app.ticker.add((delta) => {
            //console.log('ticker ' + this._state);
            this._state(delta);
        });
    },

    /**
    * Method check's if key was pushed .
    * and moves player sprite
    * @param {number} game delta
    */
    movePlayer : function (delta) {
        if (this._keyboard.getKeysState().ARROW_LEFT) {
            this._player.x -= this._playerSpeed;
        }
        if (this._keyboard.getKeysState().ARROW_RIGHT) {
            this._player.x += this._playerSpeed;
        }
    },

    /**
    * Method moves enemies and let them shot.
    * @param {object} game stage
    * @param {number} game delta
    */
    enemyAction: function (gameStage, delta) {
        let enemyQuantity = this._enemies.length;
        for (let index = 0; index < enemyQuantity; index += 1 ) {
            this.moveEnemy(this._enemies[index], delta);
            this.enemySpawnEgg(this._enemies[index], gameStage);
        }
    },

    /**
    * Method spawns objects on enemy position.
    * @param {object} enemy
    * @param {object} game stage
    */
    enemySpawnEgg: function (enemy, gameStage) { //need to refactor !!!
        if (true === enemy.canShoot) {
            let spawnChance = this.getRandom(0, 100);
            if (50 > spawnChance) {
                enemy.canShoot = false;
                enemy.color = this.generateColor();
                let sprites = loader.getSprites();
                let egg = new PIXI.Sprite(sprites['egg_'+enemy.color+'.png']);
                egg.position.x = enemy.x;
                egg.position.y = enemy.y;
                egg.visibile = true;
                egg.name = 'egg ' + VALUE++;
                this._eggs.push(egg);
                gameStage._sceneContainer.addChild(egg);

                setTimeout(() => {
                    enemy.canShoot = true;
                }, this.getRandom(2, 7) *1000);
            }
        }
    },

    /**
    * Method generates random egg color.
    * @returns {string}
    */
    generateColor: function () {
        let value = this.getRandom(0, 3);
        switch (value) {
            case 0:
                return "blue";
            case 1:
                return "green";
            case 2:
                return "red";
            case 3:
                return "yellow";
            default:
                return "normal";
        }
    },

    /**
    * Method moves eggs.
    * @param {object} game stage
    * @param {number} game delta
    */
    moveEgg: function (gameStage, delta) {
        this._eggs.forEach((egg) => {
            egg.y += 1 * delta;
            if (egg.y >= GAME_HEIGHT - 100 && egg.visibile === true) {
                console.log('removeEGG ' + egg.name + 'eggs quantity ' + this._eggs.length);
                egg.visibile = false;
                this.removeEgg(egg);
            }
        });
    },

    /**
    * Method removes egg.
    * @param {object} single egg
    */
    removeEgg: function (egg) {
        egg.parent.removeChild(egg);
        var index = this._eggs.indexOf(egg);
        if (index > -1) {
            this._eggs.splice(index, 1);
            console.log('egg deleted');
        }
    },

    /**
    * Method moves enemy.
    * @param {object} single enemy
    */
    moveEnemy : function (enemy) {
        if (enemy.x < enemy.newX) {
            enemy.x += 1;
            //console.log('right ' + enemy.x, enemy.newX);
        } else if (enemy.x > enemy.newX) {
            enemy.x -= 1;
            //console.log('left ' + enemy.x, enemy.newX);
        } else if (enemy.y > enemy.newY) {
            enemy.y -= 1;
            //console.log('top ' + enemy.y, enemy.newY);
        } else if (enemy.y < enemy.newY) {
            enemy.y += 1;
            //console.log('down ' + enemy.y, enemy.newY);
        } else {
            //console.log('switch move');
            this.move = this.enemyNextMove(enemy.x, enemy.y);
            enemy.newX = this.move.newX;
            enemy.newY = this.move.newY;
        }
    },

    /**
    * Method returns enemy random next move as x,y on screen
    * @param {number} enemy position x
    * @param {number} enemy position y
    * @returns {object}
    */
    enemyNextMove : function (x, y) {
        const moveDirection = this.getRandom(0, 3),
            howFar = this.getRandom(20, 60);
        let newX = 0, newY = 0;

        if (0 === moveDirection) { //left
            newX = this.getRandom(40, 1240);
            newY = y;
        } else if (1 === moveDirection) { //right
            newX = this.getRandom(40, 1240);
            newY = y;
        } else if (2 === moveDirection) { //top
            newX = x;
            newY = this.getRandom(40, 300);
        } else if (3 === moveDirection) { //down
            newX = x;
            newY = this.getRandom(40, 300);
        }

        return {
            newX, newY
        };
    },

    /**
    * Method returns a random number between min and max value
    * @param {number} min value
    * @param {number} max value
    * @returns {number}
    */
    getRandom : function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    /**
    * Method checks if object is contained in another.
    * @param {object} sprite that should be contained
    * @param {object} container that should contain object
    * @returns {boolean}
    */
    contain : function (sprite, container) {
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
    },
}