views = [
    {
        "viewName": "mainMenu",
        "ui": [{
            'type': 'sprite',
            "name": 'background',
            "asset": 'menuBackground_720.png',
            "x": 0,
            "y": 0,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'title',
            "asset": 'title.png',
            "x": 100,
            "y": 100,
            "visible": true,
            "interaction": false,
            "displayView": ''
        }, {
            'type': 'sprite',
            "name": 'play',
            "asset": 'playButton.png',
            "x": 200,
            "y": 400,
            "visible": true,
            "interaction": true,
            "displayView": 'game'
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
        "ui": [{
            'type': 'sprite',
            "name": 'goBack',
            "asset": 'backButtonSmall720.png',
            "x": 10,
            "y": 10,
            "visible": true,
            "interaction": true,
            "displayView": "mainMenu"
            }
        ]
    },{
        "viewName": "game",
        "ui": [{
            'type': 'sprite',
            "name": 'goBack',
            "asset": 'backButtonSmall720.png',
            "x": 10,
            "y": 10,
            "visible": true,
            "interaction": true,
            "displayView": "mainMenu"
        }, {
            'type': 'text',
            "name": 'lifeText',
            "txt": 'Lifes: ',
            "font": "20px Futura",
            "fill": "white",
            "x": 1200,
            "y": 10,
            "visible": true
        }, {
            'type': 'text',
            "name": 'lifeCounter',
            "txt": '0',
            "font": "20px Futura",
            "fill": "white",
            "x": 1260,
            "y": 10,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'leftArrow',
            "asset": 'arrow_left.png',
            "x": 10,
            "y": 635,
            "visible": false,
            "interaction": true,
            "mobileSupport": true
        }, {
            'type': 'sprite',
            "name": 'rigthArrow',
            "asset": 'arrow_right.png',
            "x": 1195,
            "y": 635,
            "visible": false,
            "interaction": true,
            "mobileSupport": true
        }
        ],
        "characters": [{
            'type': 'sprite',
            "name": 'player',
            "asset": 'santa.png',
            "x": 600,
            "y": 600,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'enemy',
            "asset": 'bat.png',
            "amount": '4',
            "color": 'red',
            "y": 100,
            "visible": true
        }, {
            'type': 'sprite',
            "name": 'enemy',
            "asset": 'ghost.png',
            "amount": '2',
            "color": 'blue',
            "y": 100,
            "visible": true
            }
        ],
    }
];