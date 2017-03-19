function sceneRepository() {
    this._scenes = [];
    this._activeSceneName = '';
}

/**
* Adds scene to repo.
*/
sceneRepository.prototype.addScene = function (scene) {
    this._scenes.push(scene);
};

/**
* Method returns scene from repo by name.
* @returns {object}
*/
sceneRepository.prototype.getSceneByName = function (sceneName) {
    let scenesQuantity = this._scenes.length;

    for (let index = 0; index < scenesQuantity; ++index) {
        if (this._scenes[index].getSceneName() === sceneName) {
            return this._scenes[index];
        }
    }

    return {};
};

/**
* Method sets active scene name.
*/
sceneRepository.prototype.setActiveScene = function (sceneName) {
    this._activeSceneName = sceneName;
};

/**
* Method returns name of actual active scene.
* @returns {string}
*/
sceneRepository.prototype.getActiveScene = function () {
    return this._activeSceneName;
};

/**
* Method returns all repository scenes.
* @returns {array}
*/
sceneRepository.prototype.getAllScenes = function () {
    return this._scenes;
};