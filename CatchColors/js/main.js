var Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics,
    GAME_WIDTH = 1280,
    GAME_HEIGHT = 720,
    sceneRepo = new sceneRepository(),
    arrowRight,
    arrowLeft,
    isTouchDevice = false;

var stage = new Container(0x66FF99, true);
renderer = new PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);

renderer.backgroundColor = 0x000000;
renderer.autoResize = true;
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";

//resize();

document.body.appendChild(renderer.view);

if (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)) {
    console.log('touch device');
    isTouchDevice = true;
}

//initate game assets
loader
  .add("assets/sprites.json")
  .load(loadGame);

//initate player control
var keyboard = new Keyboard();
window.addEventListener("keydown", keyboard.handleKeyDown.bind(keyboard), false);
window.addEventListener("keyup", keyboard.handleKeyUp.bind(keyboard), false);

var game = new Game(keyboard);

//Resize window
window.onresize = function (event) {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;

    ratio = Math.min(windowWidth / 1280, windowHeight / 720);

    stage.scale.x = stage.scale.y = ratio;

    renderer.resize(Math.ceil(1280 * ratio),
                  Math.ceil(720 * ratio));
};

//Start the game loop
game.gameLoop();

//Animate game
animate();

function animate() {

    requestAnimationFrame(animate);
    renderer.render(stage);
}