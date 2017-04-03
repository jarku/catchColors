function Game(Keyboard, Loader) {
    this._player;
    this._playerStartHealth = '3';
    this._enemies = [];
    this._enemySpeed = 3;
    this._keyboard = Keyboard;
    this._loader = Loader;
    this._playerSpeed = 5;
    this._state = this.menu;
    this._enemyActivity = 5;
    this._enemy;
    this._gameStage;
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
        this._player = this._gameStage.getSprite('player');
        this.resetPlayer();

        //set displayed health
        let life = this._gameStage.getSprite('lifeCounter');
        life.text = this._playerStartHealth;

        //set enemies
        this._enemies = this._gameStage.getEnemies();
        this.resetEnemies();
    
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
    * Method resets player sprite position and velocity.
    */
    resetPlayer : function () {
        this._player.x = 600;
        this._player.vx = 0;
    },

    /**
    * Game state play.
    */
    play : function () {
        this.movePlayer();
        this.enemyAction(this._gameStage);
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
        app.ticker.add(() => {
            this._state();
        });
    },

    /**
    * Method check's if key was pushed .
    * and moves player sprite
    */
    movePlayer : function () {
        if (this._keyboard.getKeysState().ARROW_LEFT) {
            this._player.x -= this._playerSpeed;
        }
        if (this._keyboard.getKeysState().ARROW_RIGHT) {
            this._player.x += this._playerSpeed;
        }
    },

    /**
    * Method moves enemies and let them shot.
    */
    enemyAction: function (gameStage) {
        let enemyQuantity = this._enemies.length;
        for (let index = 0; index < enemyQuantity; index += 1 ) {
            this.moveEnemy(this._enemies[index]);
            this.enemyShot(this._enemies[index], gameStage);
        }
    },

    /**
    * Method shots objects from enemy.
    */
    enemyShot : function (enemy, gameStage) {
        if (true === enemy.canShoot) {
            let test = this.getRandom(0, 100);
            console.log(test)
            if (50 > test) {
                enemy.canShoot = false;

                console.log('add bullet');
                let test = this._loader.getSprites();
                console.log(test);
                var bullet = new PIXI.Sprite(test['egg_normal.png']);
                bullet.position.x = enemy.x;
                bullet.position.y = enemy.y;
                bullet.visibile = true;
                gameStage._sceneContainer.addChild(bullet);
                //bullet.position.x += Math.cos(0) * 1;
                //bullet.position.y += Math.sin(0) * 1;

                setTimeout(() => {
                    enemy.canShoot = true;
                }, 5000);
            }
        }
    },

    /**
    * Method moves enemy.
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
    }
}