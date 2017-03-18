function Keyboard() {

    //List of keys and their codes.
    this.KEYS = {
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        A: 65,
        D: 68
    };

    //List of states of keys
    this._state = {
        ARROW_LEFT: false,
        ARROW_RIGHT: false,
        A: false,
        D: false
    };
    
};

/**
* Method returns the keyboard's state.
* @returns {object}
*/
Keyboard.prototype.getKeysState = function () {
    return this._state;
};
        
/**
* Method changes the given key state.
* @param {string} key Name or code of key
* @param {boolean} val Key's new state
*/
Keyboard.prototype.setKeyState = function (key, val) {
    if (typeof (key) === "string") {
        this._state[key] = val;
    }
    else if (typeof(key) === "number"){
        for(var k in this.KEYS){
            if(this.KEYS.hasOwnProperty(k) && this.KEYS[k] === key){
                this._state[k] = val;
            }
        }
    }
};
        
/**
* Setting the key state to true
* @param {object} event Keyboard event
*/
Keyboard.prototype.handleKeyDown = function (event) {
    this.setKeyState(event.keyCode, true);
};
        
/**
* Setting the key state to false
* @param {object} event Keyboard event
*/
Keyboard.prototype.handleKeyUp = function (event) {
    this.setKeyState(event.keyCode, false);
};