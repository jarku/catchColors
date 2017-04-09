function Gamepad() {
    //List of states of keys
    this._state = {
        ARROW_LEFT: false,
        ARROW_RIGHT: false,
    };
    
};

/**
* Method returns the gamepad's state.
* @returns {object}
*/
Gamepad.prototype.getGamepadState = function () {
    return this._state;
};
        
/**
* Setting the touchpad keys actions
*/
Gamepad.prototype.setGamepadKeys = function (gameStage) {
    let leftButton = gameStage.getSprite('leftArrow'),
        rightButton = gameStage.getSprite('rigthArrow');

    leftButton.on('touchstart', event => {
        this._state['ARROW_LEFT'] = true;
    });
    leftButton.on('touchend', event => {
        this._state['ARROW_LEFT'] = false;
    });
    leftButton.on('touchendoutside', event => {
        this._state['ARROW_LEFT'] = false;
    });

    rightButton.on('touchstart', event => {
        this._state['ARROW_RIGHT'] = true;
    });
    rightButton.on('touchend', event => {
        this._state['ARROW_RIGHT'] = false;
    });
    rightButton.on('touchendoutside', event => {
        this._state['ARROW_RIGHT'] = false;
    });
};