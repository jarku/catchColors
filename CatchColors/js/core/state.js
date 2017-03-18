//state.js
function menu() {

}

function play() {
    //move player
    //player.x += player.vx;
    playerMovement();

    //keep player inside map
    contain(player, {
        x: 65,
        y: 40,
        width: 1280 - 65,
        height: 720 - 50
    });

    var playerHit = false;

    /*enemies.forEach(function (enemy) {
        //move each enemy
        enemy.y += enemy.vy;

        //keep enemy inside map
        if(contain(enemy, {
            x: enemy.width,
            y: enemy.height,
            width: 1280 - enemy.width,
            height: 720 - enemy.height
        })) {
            enemy.vy *= -1;
        }

        //check for collision with player
        if (collision(player, enemy)) {
            playerHealth -= 1;
            if (playerHealth < 0) {
                state = menu;
                gameLostText.visible = true;
            } else {
                healthText.text = playerHealth;
                healthBar.outer.width -= 2;
            }
        }
    });

    items.forEach(function (item) {
        //check for collision with item
        if (collision(player, item)) {
            collectedItems += 1;
            itemQuantityText.text = collectedItems + '/' + itemsToCollect;
            item.visible = false;
        }
    });

    if (collision(player, door)) {
        state = menu;
        endLevelAction();
    }*/
}

function playerMovement() {
    if (keyboard.getKeysState().ARROW_LEFT) {
        player.x -= playerSpeed;
    }
    if (keyboard.getKeysState().ARROW_RIGHT) {
        player.x += playerSpeed;
    }
}

//keep sprite in game window
function contain(sprite, container) {
    var contain = false;

    //Left
    if (sprite.x < container.x) {
        sprite.x = container.x;
        contain = true;
    }

    //Top
    if (sprite.y < container.y) {
        sprite.y = container.y;
        contain = true;
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        contain = true;
    }

    //Bottom
    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height;
        contain = true;
    }

    return contain;
}

//check for collision with object
function collision(object1, object2) {
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
};

function setLevel() {
    let activeScene = sceneRepo.getActiveScene(),
        level = sceneRepo.getSceneByName(activeScene).getSceneContainer();

    //set player
    player = sceneRepo.getSceneByName(activeScene).getSprite('player');
    player.x = 600;
    player.y = 600;
    player.vx = 0;
    player.vy = 0;

    //set player health
    life = sceneRepo.getSceneByName(activeScene).getSprite('lifeCounter');
    life.text = '3';

    enemies = [];
    var sceneEnemies = sceneRepo.getSceneByName(activeScene).getSprite('enemy');
    let enemiesQuantity = 0;
    sceneEnemies.forEach(function (enemy) {
        next = true;
        while (next) {
            enemy.x = GAME_WIDTH - Math.floor((Math.random() * GAME_WIDTH) + 1);
            if (!enemiesQuantity) {
                enemies.push(enemy);
                enemiesQuantity = enemies.length;
                next = false;
            } else {
                enemiesQuantity = enemies.length;
                for (let index = 0; index < enemiesQuantity; index++) {
                    console.log('check');
                    if (collision(enemies[index], enemy)) {
                        console.log('collision');
                        break;
                    } else {
                        enemies.push(enemy);
                        next = false;
                    }
                }
            }
        }
    });
    /*

    //set enemy
    enemies = [];
    var sceneEnemies = levelRepo.getSceneByName(sceneName).getEnemies();
    sceneEnemies.forEach(function (enemy) {
        enemy.x = enemy.startPositionX;
        enemy.y = enemy.startPositionY;
        enemies.push(enemy);
    });

    //set items visibility
    items = [];
    var sceneItems = levelRepo.getSceneByName(sceneName).getItems();
    sceneItems.forEach(function (item) {
        item.visible = true;
        items.push(item);
    });

    //set items counter
    var childNumber = 4 + sceneEnemies.length + sceneItems.length;
    itemQuantityText = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);
    itemQuantityText.text = '0/' + config.levelTotalItems;
    itemsToCollect = config.levelTotalItems;
    collectedItems = 0;

    //set entrance
    childNumber += 2; //2 because of icon
    door = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);

    //set game end text
    childNumber += 1;
    gameWonText = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);
    gameWonText.visible = false;
    childNumber += 1;
    gameLostText = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);
    gameLostText.visible = false;*/
    state = play;
}

//set level
/*function setLevel(sceneName) {
    console.log('Reset scene: ' + sceneName);
    sceneRepo.getSceneByName(activeSceneName).getSceneContainer().visible = false;
    levelRepo.getSceneByName(sceneName).getSceneContainer().visible = true;
    //get level config
    var config = levelRepo.getSceneByName(sceneName).getLevelData();

    //set player and skin for choosen level
    player = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(1);
    player.x = player.startPositionX;
    player.y = player.startPositionY;
    console.log('Starting position x=' + player.x + ' y=' + player.y);
    //let id = resources["assets/sprites.json"].textures;
    //base = new PIXI.BaseTexture(id[activeSkin].baseTexture)
    //texture = new PIXI.Texture(base);
    texture = PIXI.Texture.fromImage('../../assets/' + activeSkin);
    player.texture = texture;
    
    //set player healthbar
    healthBar = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(2);
    healthText = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(3);
    playerHealth = config.player.health;
    healthText.text = config.player.health;
    healthBar.outer.width = 200;

    //set enemy
    enemies = [];
    var sceneEnemies = levelRepo.getSceneByName(sceneName).getEnemies();
    sceneEnemies.forEach(function (enemy) {
        enemy.x = enemy.startPositionX;
        enemy.y = enemy.startPositionY;
        enemies.push(enemy);
    });

    //set items visibility
    items = [];
    var sceneItems = levelRepo.getSceneByName(sceneName).getItems();
    sceneItems.forEach(function (item) {
        item.visible = true;
        items.push(item);
    });

    //set items counter
    var childNumber = 4 + sceneEnemies.length + sceneItems.length;
    itemQuantityText = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);
    itemQuantityText.text = '0/' + config.levelTotalItems;
    itemsToCollect = config.levelTotalItems;
    collectedItems = 0;

    //set entrance
    childNumber += 2; //2 because of icon
    door = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);

    //set game end text
    childNumber += 1;
    gameWonText = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);
    gameWonText.visible = false;
    childNumber += 1;
    gameLostText = levelRepo.getSceneByName(sceneName).getSceneContainer().getChildAt(childNumber);
    gameLostText.visible = false;
}*/

//set user progression on level end
function endLevelAction() {
    console.log('endLevelAction');
    let levelData = levelRepo.getSceneByName(activeSceneName).getLevelData();

    if (collectedItems > levelData.levelCollectedItems) {
        console.log('update');
        levelData.levelCollectedItems = collectedItems;

        //look for proper level icon
        levelsMenuObjects.forEach((object) => {
            if (object.levelName === levelData.levelName) {
                console.log(object.iconIndex);
                let levelIcon = sceneRepo.getSceneByName('levelsMenuScene').getSceneContainer().getChildAt(object.iconIndex),
                    sprite;
                if (levelData.levelCollectedItems === 1) {
                    sprite = PIXI.Texture.fromFrame('oneGift.png');
                } else if (levelData.levelCollectedItems === 2) {
                    sprite = PIXI.Texture.fromFrame('twoGifts.png');
                } else if (levelData.levelTotalItems === collectedItems) {
                    gameWonText.visible = true;
                    sprite = PIXI.Texture.fromFrame('threeGifts.png');
                    levelIcon.setTexture(sprite);
                    console.log(levelData.nextLevelName);

                    //if it is not last level, unlock next level
                    if (!levelData.hasOwnProperty('lastLevel') && !levelData.lastLevel === true) {
                        let nextLevelIcon = sceneRepo.getSceneByName('levelsMenuScene').getSceneContainer().getChildAt(parseInt(object.iconIndex) + 2);
                        let levelUnlockedSprite = PIXI.Texture.fromFrame('levelUnlocked.png');
                        nextLevelIcon.setTexture(levelUnlockedSprite);
                        nextLevelIcon.interactive = true;
                    }
                    return;
                }
                levelIcon.setTexture(sprite);
            }
        });
    }
    showScene('levelsMenuScene');
}