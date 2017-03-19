function Loader() {
    this._sprites = resources["assets/sprites.json"].textures;
}

/**
* Method loads sprites.
*/
Loader.prototype.loadSprites = function () {
    let viewsQuantity = views.length;

    for (let index = 0; index < viewsQuantity; index = index + 1) {
        let view = views[index],
            viewContainer = new Container();

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
        child = new Sprite(this._sprites[element.asset]);
    } else if ('text' === element.type) {
        child = new Text(
        element.txt,
            {
                font: element.font,
                fill: element.fill
            }
        );
    }

    child.name = element.name;
    child.visible = element.visible;

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

        if (element.action) {
            child.displayView = element.displayView;
            if ("startGame" === element.action) {
                var clickAction = function () {
                    this.parent.visible = false;
                    sceneRepo.setActiveScene(this.displayView);
                    sceneRepo.getSceneByName(this.displayView).getSceneContainer().visible = true;
                    game.setLevel();
                };
            }

            child.click = clickAction;
            child.touchstart = clickAction;
        } else if (element.displayView) {
            child.displayView = element.displayView;
            let clickAction = function () {
                this.parent.visible = false;
                sceneRepo.setActiveScene(this.displayView);
                sceneRepo.getSceneByName(this.displayView).getSceneContainer().visible = true;
            };
            child.click = clickAction;
            child.touchstart = clickAction;
        }
    }

    viewContainer.addChild(child);
};
