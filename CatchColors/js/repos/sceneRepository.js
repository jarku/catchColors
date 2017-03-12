//sceneRepository.js
sceneRepository = function () {
    var scenes = [];
    var activeSceneName = '';

    this.addScene = function (scene) {
        scenes.push(scene);
        console.log('scene ' + scene.getSceneName());
    };

    this.getSceneByName = function (name) {
        console.log(scenes);
        var scenesQuantity = scenes.length;

        for (var index = 0; index < scenesQuantity; ++index) {

            if (scenes[index].getSceneName() === name) {

                return scenes[index];
            }
        }
    };

    this.setActiveScene = function (sceneName) {
        console.log('activeScene set: ' + sceneName);
        this.activeSceneName = sceneName;
    };

    this.getActiveScene = function () {
        console.log('activeScene ' + this.activeSceneName);
        return this.activeSceneName;
    };

    this.getAllScenes = function () {
        console.log(scenes);
        return scenes;
    };
}