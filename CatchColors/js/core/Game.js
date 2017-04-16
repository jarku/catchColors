function Game(Keyboard, Gamepad, Loader) {
    this._player;
    this._playerStartHealth = '3';
    this._enemies = [];
    this._enemySpeed = 3;
    this._keyboard = Keyboard;
    this._gamepad = Gamepad;
    this._loader = Loader;
    this._sprites;
    this._playerSpeed = 5;
    this._state = this.menu;
    this._enemyActivity = 5;
    this._enemy;
    this._gameStage;
    this._eggs = [];
    this._score = 0;
    this._life = 3;
    this._filters = [];
    this._chickenSprites = {};
    this.setGame();
}

Game.prototype = {
    
    /**
    * Game constructor.
    */
    setGame : function () {
        let blur = new PIXI.filters.BlurFilter(),
            matrix = new PIXI.filters.ColorMatrixFilter();

        this._filters.blur = blur;
        this._filters.matrix = matrix;

        this.setGameStage();

        this._chickenSprites = {
            left: PIXI.Texture.fromImage('../assets/chicken_left.png'),
            right: PIXI.Texture.fromImage('../assets/chicken_right.png'),
            up: PIXI.Texture.fromImage('../assets/chicken_up.png'),
            down: PIXI.Texture.fromImage('../assets/chicken_down.png')
        };
    },

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
    
        //set score
        this.setLife(3);
        this.setScore(0);

        let lost = this._gameStage.getSprite('lost');
        lost.visible = false;

        if (true === isTouchDevice) {
            this._gamepad.setGamepadKeys(this._gameStage);
            this.movePlayer = this.movePlayerByGamepad;
        } else {
            this.movePlayer = this.movePlayerByKeyboard;
        }
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

            this.move = this.enemyNextMove(enemy);

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
        this._player.y = 580;
        this._player.x = GAME_WIDTH / 2 - this._player.width / 2;
        this._player.vx = 0;
        this._player.name = 'player';
        this._gameStage._sceneContainer.addChild(this._player);
        this._player.hit = false;

        this._player.filters = [this._filters.blur];
        this._player.filters.blur = this._blurCount = 0;
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
        this.playerAction(this._gameStage, delta);

        this.contain(this._player, {
            x: 40,
            y: 40,
            width: 1280 - 40,
            height: 720 - 40
        });

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
            this._state(delta);
        });
    },

    /**
    * Method check's if keybaord key was pushed .
    * and moves player sprite
    * @param {number} game delta
    */
    movePlayerByGamepad : function (delta) {
        if (this._gamepad.getGamepadState().ARROW_LEFT) {
            this._player.x -= this._playerSpeed * delta;
        }
        if (this._gamepad.getGamepadState().ARROW_RIGHT) {
            this._player.x += this._playerSpeed * delta;
        }
    },

    /**
    * Method check's if gamepad key was pushed .
    * and moves player sprite
    * @param {number} game delta
    */
    movePlayerByKeyboard: function (delta) {
        if (this._keyboard.getKeysState().ARROW_LEFT) {
            this._player.x -= this._playerSpeed * delta;
        }
        if (this._keyboard.getKeysState().ARROW_RIGHT) {
            this._player.x += this._playerSpeed * delta;
        }
    },

    /**
    * Method control player actions.
    * @param {object} game stage
    * @param {number} game delta
    */
    playerAction: function (gameStage, delta) {
        this.movePlayer(delta);

        this.playerBlink();
    },

    /**
    * Method blinks player sprite while hit
    */
    playerBlink: function () {
        if (this._player.hit === true) {
            var blurAmount = Math.cos(this._blurCount += 0.1);

            this._player.filters[0].blur = 20 * (blurAmount);
        } else {
            this._player.filters[0].blur = 0;
        }
    },

    /**
    * Method moves enemies and let them shot.
    * @param {object} game stage
    * @param {number} game delta
    */
    enemyAction : function (gameStage, delta) {
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
    enemySpawnEgg : function (enemy, gameStage) { //need to refactor !!!
        if (true === enemy.canShoot) {
            let spawnChance = this.getRandom(0, 100);
            if (50 > spawnChance) {
                enemy.canShoot = false;
                let color = this.generateColor(),
                    sprites = loader.getSprites(),
                    egg = new PIXI.Sprite(sprites['egg_' + color + '.png']);
                egg.color = color;
                egg.position.x = enemy.x;
                egg.position.y = enemy.y;
                egg.visibile = true;
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
    generateColor : function () {
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
    moveEgg : function (gameStage, delta) {
        this._eggs.forEach((egg) => {
            egg.y += 1 * delta;
            this.collisionWithPlayer(egg);
            if (egg.y >= GAME_HEIGHT - 100 && egg.visibile === true) {
                this.removeEgg(egg);
            }
        });
    },

    /**
    * Method removes egg.
    * @param {object} single egg
    */
    removeEgg : function (egg) {
        egg.visibile = false;
        egg.parent.removeChild(egg);
        var index = this._eggs.indexOf(egg);
        if (index > -1) {
            this._eggs.splice(index, 1);
        }
    },

    /**
    * Method moves enemy.
    * @param {object} single enemy
    */
    moveEnemy: function (enemy) {
        if (enemy.x < enemy.newX) {
            enemy.x += 1;
        } else if (enemy.x > enemy.newX) {
            enemy.x -= 1;
        } else if (enemy.y > enemy.newY) {
            enemy.y -= 1;
        } else if (enemy.y < enemy.newY) {
            enemy.y += 1;
        } else {
            this.enemyNextMove(enemy);
        }
    },

    /**
    * Method returns enemy random next move as x,y on screen
    * @param {number} enemy position x
    * @param {number} enemy position y
    * @returns {object}
    */
    enemyNextMove : function (enemy) {
        const moveDirection = this.getRandom(0, 4),
            howFar = this.getRandom(20, 60);
        let newX = 0, newY = 0;

        if (0 === moveDirection) { //left
            enemy.newX = this.getRandom(40, enemy.x);
            enemy.newY = enemy.y;
            enemy.texture = this._chickenSprites.left;
        } else if (1 === moveDirection) { //right
            enemy.newX = this.getRandom(enemy.x, 1240);
            enemy.newY = enemy.y;
            enemy.texture = this._chickenSprites.right;
        } else if (2 === moveDirection) { //up
            enemy.newX = enemy.x;
            enemy.newY = this.getRandom(40, enemy.y);
            enemy.texture = this._chickenSprites.up;
        } else if (3 === moveDirection) { //down
            enemy.newX = enemy.x;
            enemy.newY = this.getRandom(enemy.y, 300);
            enemy.texture = this._chickenSprites.down;
        }
    },

    /**
    * Method sets score, deletes egg on collision with basket.
    */
    collisionWithPlayer : function (egg) {
        if (true === this.collision(this._player, egg)) {
            //set score or life
            if (egg.color === this._player.color) {
                this.setScore(this._score += 100);
            } else {
                this.setLife(this._life -= 1);
                if (this._life === 0) {
                    this.setState('pause');
                    let lost = this._gameStage.getSprite('lost');
                    lost.visible = true;
                } else {
                    this._player.hit = true;
                    setTimeout(() => {
                        this._player.hit = false;
                        this._blurCount = 0;
                    }, 1000);
                }
            }

            //remove touched egg
            this.removeEgg(egg);

            //change basket color
            let colorChangeChance = this.getRandom(0, 100);
            if (50 > colorChangeChance) {
                let color = this.generateColor();
                this._player.color = color;
                this._player.texture = PIXI.Texture.fromImage('../assets/basket_' + color + '.png');
            }
        }
    },

    /**
    * Method sets score
    */
    setScore : function (score) {
        let scoreText = this._gameStage.getSprite('scoreCounter');
        scoreText.text = score;
        this._score = score;
    },

    /**
    * Method sets player life
    */
    setLife : function (life) {
        let lifeText = this._gameStage.getSprite('lifeCounter');
        lifeText.text = life;
        this._life = life;
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

    //check for collision with object
    collision : function (object1, object2) {
        var collision = false;
        if (object2.visible == true) {
            var combinedHalfWidths,
                combinedHalfHeights,
                vx,
                vy;

            //center points
            object1.centerX = object1.x + object1.width / 2;
            object1.centerY = object1.y + object1.height / 2;
            object2.centerX = object2.x + object2.width / 2;
            object2.centerY = object2.y + object2.height / 2;

            //distance vector between the sprites
            vx = object1.centerX - object2.centerX;
            vy = object1.centerY - object2.centerY;

            //half-widths, half-heights of each sprite
            object1.halfWidth = object1.width / 2;
            object1.halfHeight = object1.height / 2;
            object2.halfWidth = object2.width / 2;
            object2.halfHeight = object2.height / 2;

            combinedHalfWidths = object1.halfWidth + object2.halfWidth;
            combinedHalfHeights = object1.halfHeight + object2.halfHeight;

            //collision on x
            if (Math.abs(vx) < combinedHalfWidths) {
                //collision on y
                if (Math.abs(vy) < combinedHalfHeights) {
                    collision = true;
                } else {
                    collision = false;
                }
            } else {
                collision = false;
            }
        }

        return collision;
    }
}