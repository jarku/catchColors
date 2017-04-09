function Loader() {
    this._sprites;
}

 /**
 * Method sets sprites from loader resources.
 */
 Loader.prototype.setSprites = function (path) {
     this._sprites = PIXI.loader.resources[path].textures;
 };

/**
* Method returns loaded sprites.
* @returns {object}
*/
Loader.prototype.getSprites = function () {
    return this._sprites;
};

/**
* Method loads sprites.
*/
Loader.prototype.loadSprites = function () {
    let viewsQuantity = views.length;

    for (let index = 0; index < viewsQuantity; index = index + 1) {
        let view = views[index],
            viewContainer = new PIXI.Container();

        viewContainer.name = view.viewName;

        if (view.visibleOnStart && true === view.visibleOnStart) {
            sceneRepo.setActiveScene(view.viewName);
        } else {
            viewContainer.visible = false;
        }

        if (view.ui) {
            let childsQuantity = view.ui.length;
            for (let index = 0; index < childsQuantity; index++) {
                this.addChildToContainer(view.ui[index], viewContainer);
            }
        }

        if (view.characters) {
            let childsQuantity = view.characters.length,
                charactersAmount = 0;
            for (let index = 0; index < childsQuantity; index++) {
                if (view.characters[index].amount) {
                    charactersAmount = view.characters[index].amount;
                    for (let counter = 0; counter < charactersAmount; counter++) {
                        this.addChildToContainer(view.characters[index], viewContainer);
                    }
                } else {
                    this.addChildToContainer(view.characters[index], viewContainer);
                }
            }
        }

        //add mainMenu to repository
        let createdScene = new Scene(viewContainer);
        sceneRepo.addScene(createdScene);
        stage.addChild(createdScene.getSceneContainer());
    }
}

/**
* Method adds sprite to container.
*/
Loader.prototype.addChildToContainer = function (element, viewContainer) {
    let child;
    if ('sprite' === element.type) {
        child = new PIXI.Sprite(this._sprites[element.asset]);
    } else if ('text' === element.type) {
        child = new PIXI.Text(
        element.txt,
            {
                font: element.font,
                fill: element.fill
            }
        );
    }

    child.name = element.name;
    child.visible = element.visible;
    if (isTouchDevice === true && (element.name === 'rigthArrow' || Element.name === 'rigthArrow')) {
        child.visible = true;
    }

    if (element.x || element.x === 0) {
        child.x = element.x;
        child.startPositionX = element.x;
    } else {
        child.x = GAME_WIDTH - Math.floor((Math.random() * GAME_WIDTH) + 1);
    }

    if (element.y || element.y === 0) {
        child.y = element.y;
        child.startPositionY = element.y;
    } else {
        child.y = GAME_HEIGHT - Math.floor((Math.random() * GAME_HEIGHT) + 1);
    }

    if (element.moveDirection) {
        child.moveDirection = element.moveDirection;
    }

    if (true === element.interaction) {
        child.interactive = true;

        if (element.displayView) {
            child.displayView = element.displayView;
            let clickAction;
            if(element.action === 'startGame') {
                clickAction = function () {
                    this.parent.visible = false;
                    sceneRepo.setActiveScene(this.displayView);
                    sceneRepo.getSceneByName(this.displayView).getSceneContainer().visible = true;
                    game.setLevel();
                };
            } else {
                clickAction = function () {
                    this.parent.visible = false;
                    sceneRepo.setActiveScene(this.displayView);
                    sceneRepo.getSceneByName(this.displayView).getSceneContainer().visible = true;
                };
            }
            child.click = clickAction;
            child.touchstart = clickAction;
        }    
    }

    viewContainer.addChild(child);
};
