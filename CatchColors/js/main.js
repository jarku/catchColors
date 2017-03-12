//main.js
var Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics;

var player,
    playerSpeed = 3,
    enemySpeed = 3,
    switchMove = 1,
    enemies = [],
    items = [],
    itemsToCollect,
    collectedItems,
    state,
    healthBar,
    healthText,
    itemQuantityText,
    door,
    gameWonText,
    gameLostText,
    playerHealth = 100,
    GAME_WIDTH = 1280,
    GAME_HEIGHT = 720,
    sprites = [],
    activeSceneName,
    levelsMenuObjects = [],
    levelRepo = new sceneRepository(),
    sceneRepo = new sceneRepository(),
    arrowDown,
    arrowUp,
    arrowRight,
    arrowLeft,
    isTouchDevice = false,
    activeSkin;

var stage = new Container(0x66FF99, true);
renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);

renderer.backgroundColor = 0x000000;
renderer.autoResize = true;
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";

resize();

document.body.appendChild(renderer.view);

if (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)) {
    console.log('touch device');
    isTouchDevice = true;
}

loader
  .add("assets/sprites.json")
  .load(loadGame);

//Set the game state

function menu() { };
state = menu;

//Start the game loop
gameLoop();

window.onresize = function (event) {
    resize();
};

function resize(event) {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;

    ratio = Math.min(windowWidth / 1280, windowHeight / 720);

    stage.scale.x = stage.scale.y = ratio;

    renderer.resize(Math.ceil(1280 * ratio),
                  Math.ceil(720 * ratio));
};

function gameLoop() {

    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
}
