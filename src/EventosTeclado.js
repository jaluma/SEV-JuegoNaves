var teclas = [];

// player 1
var oneKey = 49
var twoKey = 50

var spaceKey = 32

var upKey = 38
var downKey = 40
var leftKey = 37
var rightKey = 39

// player 2
var threeKey = 51
var fourKey = 52

var enterKey = 13

var aKey = 65;
var wKey = 87
var sKey = 83
var dKey = 68

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);
var PLAYER_1 = 0
var PLAYER_2 = 1

function onKeyDown(event) {
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            // player 1
            case spaceKey:
                controles[PLAYER_1].disparo = true;
                break;
            case upKey:
                controles[PLAYER_1].moverY = 1;
                break;
            case downKey:
                controles[PLAYER_1].moverY = -1;
                break;
            case rightKey:
                controles[PLAYER_1].moverX = 1;
                break;
            case leftKey:
                controles[PLAYER_1].moverX = -1;
                break;
            case oneKey:
                controles[PLAYER_1].cambioNave = true
                controles[PLAYER_1].index = 0
                break;
            case twoKey:
                controles[PLAYER_1].cambioNave = true
                controles[PLAYER_1].index = 1
                break;

            // player 2
            case enterKey:
                controles[PLAYER_2].disparo = true;
                break;
            case wKey:
                controles[PLAYER_2].moverY = 1;
                break;
            case sKey:
                controles[PLAYER_2].moverY = -1;
                break;
            case dKey:
                controles[PLAYER_2].moverX = 1;
                break;
            case aKey:
                controles[PLAYER_2].moverX = -1;
                break;
            case threeKey:
                controles[PLAYER_2].cambioNave = true
                controles[PLAYER_2].index = 0
                break;
            case fourKey:
                controles[PLAYER_2].cambioNave = true
                controles[PLAYER_2].index = 1
                break;
        }

    }

}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch ( event.keyCode ){
        case spaceKey:
            controles[PLAYER_1].disparo = false;
            break;
        case upKey:
            if ( controles[PLAYER_1].moverY == 1 ){
                controles[PLAYER_1].moverY = 0;
            }
            break;
        case downKey:
            if ( controles[PLAYER_1].moverY == -1 ){
                controles[PLAYER_1].moverY = 0;
            }
            break;
        case rightKey:
            if ( controles[PLAYER_1].moverX == 1 ){
                controles[PLAYER_1].moverX = 0;
            }
            break;
        case leftKey:
            if ( controles[PLAYER_1].moverX == -1 ){
                controles[PLAYER_1].moverX = 0;
            }
            break;
        case oneKey:
            controles[PLAYER_1].cambioNave = false
            break;
        case twoKey:
            controles[PLAYER_1].cambioNave = false
            break;

        case enterKey:
            controles[PLAYER_2].disparo = false;
            break;
        case wKey:
            if ( controles[PLAYER_2].moverY == 1 ){
                controles[PLAYER_2].moverY = 0;
            }
            break;
        case sKey:
            if ( controles[PLAYER_2].moverY == -1 ){
                controles[PLAYER_2].moverY = 0;
            }
            break;
        case dKey:
            if ( controles[PLAYER_2].moverX == 1 ){
                controles[PLAYER_2].moverX = 0;
            }
            break;
        case aKey:
            if ( controles[PLAYER_2].moverX == -1 ){
                controles[PLAYER_2].moverX = 0;
            }
            break;
        case threeKey:
            controles[PLAYER_2].cambioNave = false
            break;
        case fourKey:
            controles[PLAYER_2].cambioNave = false
            break;
    }

}