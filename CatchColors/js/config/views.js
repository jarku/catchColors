﻿views = [
    {
        "viewName": "mainMenu",
        "visibleOnStart": true,
        "ui": [{
            'type': 'sprite',
            "name": 'background',
            "asset": 'menu.png',
            "x": 0,
            "y": 0,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'play',
            "asset": 'play.png',
            "x": 600,
            "y": 400,
            "visible": true,
            "interaction": true,
            "displayView": 'game',
            "action": 'startGame'
        }, {
            'type': 'sprite',
            "name": 'settings',
            "asset": 'settingsButton.png',
            "x": 200,
            "y": 500,
            "visible": true,
            "interaction": true,
            "displayView": 'settings'
            }
        ]
    },{
        "viewName": "settings",
        "visibleOnStart": false,
        "ui": [{
            'type': 'sprite',
            "name": 'goBack',
            "asset": 'back.png',
            "x": 10,
            "y": 10,
            "visible": true,
            "interaction": true,
            "displayView": "mainMenu"
            }
        ]
    },{
        "viewName": "game",
        "visibleOnStart": false,
        "ui": [{
            'type': 'sprite',
            "name": 'background',
            "asset": 'grass.png',
            "x": 0,
            "y": 0,
            "visible": true,
            "interaction": false
        }, {
            'type': 'sprite',
            "name": 'goBack',
            "asset": 'back.png',
            "x": 10,
            "y": 10,
            "visible": true,
            "interaction": true,
            "displayView": "mainMenu"
        }, {
            'type': 'text',
            "name": 'lifeText',
            "txt": 'Lifes: ',
            "font": "25px Futura",
            "fill": "white",
            "x": 1150,
            "y": 10,
            "visible": true
        }, {
            'type': 'text',
            "name": 'lifeCounter',
            "txt": '0',
            "font": "25px Futura",
            "fill": "white",
            "x": 1220,
            "y": 10,
            "visible": true
        }, {
            'type': 'text',
            "name": 'scoreText',
            "txt": 'Score: ',
            "font": "25px Futura",
            "fill": "white",
            "x": 1150,
            "y": 40,
            "visible": true
        }, {
            'type': 'text',
            "name": 'scoreCounter',
            "txt": '0',
            "font": "25px Futura",
            "fill": "white",
            "x": 1220,
            "y": 40,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'leftArrow',
            "asset": 'arrow_left.png',
            "x": 10,
            "y": 635,
            "visible": true,
            "interaction": true,
            "mobileSupport": true
        }, {
            'type': 'sprite',
            "name": 'rigthArrow',
            "asset": 'arrow_right.png',
            "x": 1195,
            "y": 635,
            "visible": true,
            "interaction": true,
            "mobileSupport": true
        }
        ],
        "characters": [
            {
            'type': 'sprite',
            "name": 'enemy',
            "asset": 'chicken_right.png',
            "color": 'red',
            "y": 50,
            "x": 100,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'enemy',
            "asset": 'chicken_right.png',
            "color": 'red',
            "y": 100,
            "x": 900,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'enemy',
            "asset": 'chicken_right.png',
            "color": 'red',
            "y": 90,
            "x": 300,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'enemy',
            "asset": 'chicken_left.png',
            "color": 'blue',
            "y": 20,
            "x": 400,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'enemy',
            "asset": 'chicken_left.png',
            "color": 'blue',
            "y": 150,
            "x": 800,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'lost',
            "asset": 'lost.png',
            "position": 'center',
            "visible": false
        }
        ],
    }
];