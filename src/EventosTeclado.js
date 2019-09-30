var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

var oneKey = 49
var twoKey = 50

var aKey = 65;
var wKey = 87
var sKey = 83
var dKey = 68

var upKey = 38
var downKey = 40
var leftKey = 37
var rightKey = 39

function onKeyDown( event) {
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            case 32:
                controles.disparo = true;
                break;
            case upKey:
                controles.moverY = 1;
                break;
            case downKey:
                controles.moverY = -1;
                break;
            case rightKey:
                controles.moverX = 1;
                break;
            case leftKey:
                controles.moverX = -1;
                break;
            case oneKey:
                nave.cambio = true
                nave.index = 0
                break;
            case twoKey:
                nave.cambio = true
                nave.index = 1
                break;
        }

    }

}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch ( event.keyCode ){
        case 32:
            controles.disparo = false;
            break;
        case 38:
            if ( controles.moverY == 1 ){
                controles.moverY = 0;
            }
            break;
        case 40:
            if ( controles.moverY == -1 ){
                controles.moverY = 0;
            }
            break;
        case 39:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 37:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;
        case oneKey:
            nave.cambio = false
            break;
        case twoKey:
            nave.cambio = false
            break;
    }

}
