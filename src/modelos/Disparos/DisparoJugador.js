class DisparoJugador extends Modelo {

    constructor(x, y, jugador) {
        super(imagenes.disparo_jugador, x, y)
        this.vx = 9;
        this.jugador = jugador
    }

    actualizar (){
        this.x = this.x + this.vx;
    }

}
