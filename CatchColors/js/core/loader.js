'use strict'

//loader.js
function loadGame() {
    //loading mainMenu sprites
   
    let id = resources["assets/sprites.json"].textures,
        levelData,
        viewsQuantity = views.length;

    for (let index = 0; index < viewsQuantity; index = index + 1) {
        let view = views[index],
            viewContainer = new Container(),
            containerChilds = [],
            counter = 0;

        if (view.viewName != 'mainMenu') {
            viewContainer.visible = false;
        } else {
            sceneRepo.setActiveScene(view.viewName);
        }

        if (view.background && view.background.visible) {
            viewContainer.addChild(new Sprite(id[view.background.asset]));
            containerChilds.push({ 'id': counter, 'spriteName': view.background.assetName });
            counter++;
        }

        if (view.sprites) {
            let viewSpritesQuantity = view.sprites.length;
            for (let index = 0; index < viewSpritesQuantity; index++) {
                let viewSprite = new Sprite(id[view.sprites[index].asset]);

                if (view.sprites[index].x && view.sprites[index].y) {
                    viewSprite.x = view.sprites[index].x;
                    viewSprite.y = view.sprites[index].y;
                }
                viewContainer.addChild(viewSprite);
                containerChilds.push({ 'id': counter, 'spriteName': view.sprites[index].assetName });
                counter++;
            }
        }

        //add mainMenu to repository
        let createdScene = new scene(viewContainer, view.viewName);
        sceneRepo.addScene(createdScene);
        stage.addChild(createdScene.getSceneContainer());
    }

}

function buildLevel() {
    let id = resources["assets/sprites.json"].textures,
        text,
        levelData,
        levelsQuantity = levels.length;

    console.log(levels);
    console.log('levels available: ' + levelsQuantity);

    for (let index = 0; index < levelsQuantity; index = index + 1) {
        if (levels[index].levelName == levelName) {
            levelData = levels[index];
        }
    }

    console.log('level data: ' + levelData);

    //create levelScene
    console.log('create levelScene ' + levelName);
    sceneContainer = new Container();
    sceneContainer.visible = false;

    //create levelSprite
    let levelSprite = new Sprite(id["snow_background720.png"]);
    sceneContainer.addChild(levelSprite); //0

    //create player
    let player = new Sprite(id["santa.png"]);
    player.x = levelData.player.x;
    player.y = levelData.player.y;
    player.startPositionX = levelData.player.x;
    player.startPositionY = levelData.player.y;
    console.log('Player position x=' + player.x + ' y=' + player.y);
    player.vx = levelData.player.vx;
    player.vy = levelData.player.vy;
    sceneContainer.addChild(player); //1

    //health bar
    healthBar = new Container();
    healthBar.position.set(GAME_WIDTH - 250, 6)
    sceneContainer.addChild(healthBar); //2

    let healthBarBackground = new Graphics();
    healthBarBackground.beginFill(0x000000);
    healthBarBackground.drawRect(0, 0, 200, 30);
    healthBarBackground.endFill();
    healthBar.addChild(healthBarBackground);

    let healthBarLife = new Graphics();
    healthBarLife.beginFill(0xFF3300);
    healthBarLife.drawRect(0, 0, 200, 30);
    healthBarLife.endFill();
    healthBar.addChild(healthBarLife);
    healthBar.outer = healthBarLife;

    //health text
    let healthText = new Text(
        '100',
        { font: "20px Futura", fill: "white" }
    );
    healthText.x = healthBar.position.x + healthBar.width - 40;
    healthText.y = healthBar.position.y + 5;
    sceneContainer.addChild(healthText); //3

    //create enemies
    let enemyQuantity = levelData.enemies.length,
        enemy,
        enemies = [];
    console.log('enemiesQuantity: ' + enemyQuantity);
    for (let index = 0; index < enemyQuantity; index = index + 1) {
        let enemyData = levelData.enemies[index];
        if (enemyData.enemyName == 'bat') {
            enemy = new Sprite(id["bat.png"]);
        } else if (enemyData.enemyName == 'ghost') {
            enemy = new Sprite(id["ghost.png"]);
        }
        enemy.x = enemyData.x;
        enemy.y = enemyData.y;
        enemy.startPositionX = enemyData.x;
        enemy.startPositionY = enemyData.y;
        enemy.vx = enemyData.vx;
        enemy.vy = enemyData.vy;
        enemy.lastVelocityX = enemySpeed;
        enemy.lastVelocityY = enemySpeed;
        enemySpeed *= -1;
        enemy.visible = true;
        enemies.push(enemy);
        sceneContainer.addChild(enemy);
        console.log('created enemy position: ' + enemy.x + ' ' + enemy.y);
    }

    //items
    let itemsQuantity = levelData.items.length,
        item,
        items = [];

    console.log('itemsQuantity: ' + itemsQuantity);
    for (let index = 0; index < itemsQuantity; index = index + 1) {
        let itemData = levelData.items[index];

        if (itemData.itemName == 'item01') {
            item = new Sprite(id["item01.png"]);
        }

        item.x = itemData.x;
        item.y = itemData.y;
        item.startPositionX = itemData.x;
        item.startPositionY = itemData.y;
        item.visible = true;
        items.push(item);
        sceneContainer.addChild(item);
        console.log('created item position: ' + item.x + ' ' + item.y);
    }


    //items counter
    let itemQuantityText = new Text(
        '0/' + items.length,
        { font: "30px Futura", fill: "black" }
    );
    itemQuantityText.x = healthBar.x - 100;
    itemQuantityText.y = healthBar.y;
    sceneContainer.addChild(itemQuantityText); //8
    let itemIcon = new Sprite(id["item01.png"]);
    itemIcon.x = itemQuantityText.x - 50;
    itemIcon.y = itemQuantityText.y;
    sceneContainer.addChild(itemIcon); //9
    levelData.levelTotalItems = items.length;
    levelData.levelCollectedItems = 0;

    //door
    let house = new Sprite(id["house.png"]);
    house.x = 0;
    house.y = 0;
    sceneContainer.addChild(house); //10

    //game end message
    text = 'Level complete!';
    let gameWonText = new Text(
        text,
        { font: "100px Futura", fill: "black" }
    );
    //GAME_WIDTH / 2 - (18 * text.length) / 2
    gameWonText.x = (GAME_WIDTH / 2) - (50 * text.length) / 2;
    gameWonText.y = GAME_HEIGHT / 2;
    gameWonText.visible = false;
    sceneContainer.addChild(gameWonText); //11

    text = 'You lost!';
    let gameLostText = new Text(
        text,
        { font: "100px Futura", fill: "black" }
    );
    gameLostText.x = (GAME_WIDTH / 2) - (50 * text.length) / 2;
    gameLostText.y = GAME_HEIGHT / 2;
    gameLostText.visible = false;
    sceneContainer.addChild(gameLostText); //12

    //levelsMenuScene goBackButton
    let backButton = new Sprite(id["backButtonSmall720.png"]);
    sceneContainer.addChild(backButton);
    backButton.position.x = 10;
    backButton.position.y = GAME_HEIGHT - backButton.height - 10;
    let backButtonAction = function () {
        console.log('click');
        console.log('active scene:' + activeSceneName);
        levelRepo.getSceneByName(activeSceneName).getSceneContainer().visible = false;
        showScene('levelsMenuScene');
    };
    backButton.interactive = true;
    backButton.click = backButtonAction;
    backButton.touchstart = backButtonAction;

    //game touch screen pad
    if (isTouchDevice) {
        arrowDown = new Sprite(id["arrow_down.png"]);
        arrowDown.interactive = true;
        arrowDown.position.x = GAME_WIDTH - 140;
        arrowDown.position.y = GAME_HEIGHT - 80;
        sceneContainer.addChild(arrowDown);

        arrowUp = new Sprite(id["arrow_up.png"]);
        arrowUp.interactive = true;
        arrowUp.position.x = GAME_WIDTH - 140;
        arrowUp.position.y = arrowDown.y - 120;
        sceneContainer.addChild(arrowUp);

        arrowRight = new Sprite(id["arrow_right.png"]);
        arrowRight.interactive = true;
        arrowRight.position.x = GAME_WIDTH - 80;
        arrowRight.position.y = GAME_HEIGHT - 140;
        sceneContainer.addChild(arrowRight);

        arrowLeft = new Sprite(id["arrow_left.png"]);
        arrowLeft.interactive = true;
        arrowLeft.position.x = arrowRight.x - 120;
        arrowLeft.position.y = GAME_HEIGHT - 140;
        sceneContainer.addChild(arrowLeft);
    }

    //create scene, add to repo and main stage
    createdScene = new scene(sceneContainer, levelName, levelData, enemies, items, true);
    levelRepo.addScene(createdScene);
    stage.addChild(createdScene.getSceneContainer());

    playerControl();
}

function loadViews() {
    let id = resources["assets/sprites.json"].textures,
        levelData,
        viewsQuantity = views.length;

    console.log(views);
    console.log('views available: ' + viewsQuantity);

    for (let index = 0; index < viewsQuantity; index = index + 1) {
        let view = views[index];

        console.log('creating view ' + view.viewName);
        let sceneContainer = new Container();
        sceneContainer.visible = false;

        if (view.title) {
            console.log('view title: ' + view.title)
            let title = new Text(
                view.title.text,
                { font: "100px Futura", fill: "white" }
            );
            title.x = GAME_WIDTH / 2 - (18 * text.length) / 2;
            title.y = 10;
            sceneContainer.addChild(title);
        }

        if (view.uiButtons) {
            let buttonsQuantity = view.uiButtons.length;
            for (let index = 0; index < buttonsQuantity; index = index + 1) {
                console.log('button name: ' + view.uiButtons[index].buttonName)
                let button = view.uiButtons[index];
                if (button.buttonName == 'back') {
                    let backButton = new Sprite(id[button.buttonAsset]);
                    sceneContainer.addChild(backButton);
                    backButton.position.x = button.x;
                    backButton.position.y = button.y;
                    let backButtonAction = function () {
                        console.log('click');
                        showScene('menuScene');
                    };
                    backButton.interactive = true;
                    backButton.click = backButtonAction;
                    backButton.touchstart = backButtonAction;
                }
            }
        }

        if (view.playerSkins) {
            let optionTitle = new Text(
                'Player skins',
                { font: "50px Futura", fill: "white" }
            );
            optionTitle.x = 200;
            optionTitle.y = 200;
            sceneContainer.addChild(optionTitle);
            let skinsQuantity = view.playerSkins.length,
                offset = 0;
            console.log('skinsQuantity: ' + skinsQuantity);
            for (let index = 0; index < skinsQuantity; index = index + 1) {
                console.log('skin name: ' + view.playerSkins[index].name)
                let skin = view.playerSkins[index];
                if (view.viewName == 'settings') {
                    var skinSprite = new Sprite(id[skin.skinAsset]);
                    
                    skinSprite.position.x = optionTitle.position.x + offset;
                    skinSprite.position.y = optionTitle.position.y + optionTitle.height + 10;
                    if (skin.name == 'santa') {
                        var activeSantaAction = function () {
                            console.log('active santa');
                            activeSkin = 'santa.png';
                            let activeSkinInfo = sceneRepo.getSceneByName('settings').getSceneContainer().getChildAt(5);
                            let skinName = activeSkin.replace(".png", "");
                            activeSkinInfo.text = 'Active skin: ' + skinName;
                        };
                        skinSprite.click = activeSantaAction;
                        skinSprite.touchstart = activeSantaAction;
                    } else if (skin.name == 'batman') {
                        var activeBatmanAction = function () {
                            console.log('active batman');
                            activeSkin = 'batman.png';
                            let activeSkinInfo = sceneRepo.getSceneByName('settings').getSceneContainer().getChildAt(5);
                            let skinName = activeSkin.replace(".png", "");
                            activeSkinInfo.text = 'Active skin: ' + skinName;
                        };
                        skinSprite.click = activeBatmanAction;
                        skinSprite.touchstart = activeBatmanAction;
                    }
                    skinSprite.visible = skin.available;
                    skinSprite.interactive = true;
                    sceneContainer.addChild(skinSprite);
                } else if (view.viewName == 'shop') {
                    var skinSprite = new Sprite(id[skin.skinAsset]);

                    skinSprite.position.x = optionTitle.position.x + offset;
                    skinSprite.position.y = optionTitle.position.y + optionTitle.height + 10;
                    if (skin.name == 'batman') {
                        var activeBatmanAction = function () {
                            console.log('batman bought');
                            let boughtSkin = sceneRepo.getSceneByName('settings').getSceneContainer().getChildAt(4);
                            boughtSkin.visible = true;
                            let hiddenSkin = sceneRepo.getSceneByName('shop').getSceneContainer().getChildAt(3);
                            hiddenSkin.visible = false;

                            let boughtSkinInfo = sceneRepo.getSceneByName('shop').getSceneContainer().getChildAt(4);
                            boughtSkinInfo.text = 'Skin bought: batman';
                            boughtSkinInfo.visible = true;
                            setTimeout(function () {
                                boughtSkinInfo.visible = false;
                            }, 2000);
                        };
                        skinSprite.click = activeBatmanAction;
                        skinSprite.touchstart = activeBatmanAction;
                    }
                    skinSprite.visible = skin.available;
                    skinSprite.interactive = true;
                    sceneContainer.addChild(skinSprite);
                }

                
                offset = offset + skinSprite.width + 20;
            }
            activeSkin = 'santa.png';

            if (view.viewName == 'settings') {
                //active skin information
                let skinName = activeSkin.replace(".png", "");
                let activeSkinInfo = new Text(
                    'Active skin: ' + skinName,
                    { font: "20px Futura", fill: "white" }
                );
                activeSkinInfo.x = optionTitle.position.x;
                activeSkinInfo.y = optionTitle.position.x + 200;
                sceneContainer.addChild(activeSkinInfo);
            }

            if (view.viewName == 'shop') {
                //bought skin information
                let boughtSkinInfo = new Text(
                    '',
                    { font: "20px Futura", fill: "white" }
                );
                boughtSkinInfo.x = optionTitle.position.x;
                boughtSkinInfo.y = optionTitle.position.x + 200;
                boughtSkinInfo.visible = false;
                sceneContainer.addChild(boughtSkinInfo);
            }
        }

        //add view to repository
        let createdScene = new scene(sceneContainer, view.viewName);
        sceneRepo.addScene(createdScene);
        stage.addChild(createdScene.getSceneContainer());
    }
}