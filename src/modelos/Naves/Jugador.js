class Jugador extends BaseJugador {

    constructor(x, y, vida) {
        super(imagenes.jugador, x, y, vida)

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY
        
        // Disparo
        this.cadenciaDisparo = 10;
        this.tiempoDisparo = 0;

        this.mult = 3
    }

}
