function Scene(sceneContainer) {
    this._sceneContainer = sceneContainer;
}
    
/**
* Method returns the Scene container.
* @returns {object}
*/
Scene.prototype.getSceneContainer = function () {
    return this._sceneContainer;
};

/**
* Method returns the Scene name.
* @returns {string}
*/
Scene.prototype.getSceneName = function () {
    return this._sceneContainer.name;
};

/**
* Method returns sprite with given name.
* @param {string} name of sprite
* @param {array} sprite
*/
Scene.prototype.getSprite = function (spriteName) {
    let sceneSpritesQuantity = this._sceneContainer.children.length,
        sprites = [];

    for (let index = 0, counter = 0; index < sceneSpritesQuantity; index++) {
        if (this._sceneContainer.children[index].name === spriteName) {
            sprites[counter] = this._sceneContainer.children[index];
            counter++;
        }
    }

    return sprites;
};
