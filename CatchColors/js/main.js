"use strict";

const GAME_WIDTH = 1280,
      GAME_HEIGHT = 720,
      app = new PIXI.Application(GAME_WIDTH, GAME_HEIGHT, { backgroundColor: 0x000000 });

document.body.appendChild(app.view);

let sceneRepo = new sceneRepository(),
      VALUE = 0,
    isTouchDevice = false,
    stage = new PIXI.Container();

app.stage.addChild(stage);

//Resize window
window.onresize = function (event) {
    stage.scale.x = stage.scale.y = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
};

//check if device uses touch screen
if (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)) {
    console.log('touch device');
    isTouchDevice = true;
}

//initate player control
let keyboard = new Keyboard();
window.addEventListener("keydown", keyboard.handleKeyDown.bind(keyboard), false);
window.addEventListener("keyup", keyboard.handleKeyUp.bind(keyboard), false);

//load sprites
let loader = new Loader();
PIXI.loader.add("assets/sprites.json").load(() => {
    loader.setSprites("assets/sprites.json");
    loader.loadSprites();
});

//initiate game logic
let game = new Game(keyboard, loader);

//Start the game loop
game.gameLoop();