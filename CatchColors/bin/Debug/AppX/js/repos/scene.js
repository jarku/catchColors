//scene.js
scene = function (sceneContainer, sceneName, levelData, enemies, items, sceneAssetsLoaded) {
    var sceneContainer = sceneContainer;
    var sceneName = sceneName;
    var sceneEnemies = enemies;
    var levelData = levelData;
    var sceneItems = items;
    var sceneAssetsLoaded = sceneAssetsLoaded;

    this.getSceneContainer = function () {
        return sceneContainer;
    };

    this.getSceneName = function () {
        return sceneName;
    };

    this.getLevelData = function () {
        return levelData;
    };

    this.getEnemies = function () {
        return sceneEnemies;
    };

    this.getItems = function () {
        return sceneItems;
    };

    this.getAssetsLoaded = function () {
        return sceneAssetsLoaded;
    };
}