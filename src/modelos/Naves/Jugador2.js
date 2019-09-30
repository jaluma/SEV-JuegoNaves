class Jugador2 extends BaseJugador {

    constructor(x, y, vida) {
        super(imagenes.jugador2, x, y, vida)

        this.vx = 0.1; // velocidadX
        this.vy = 0.5; // velocidadY
        
        // Disparo
        this.cadenciaDisparo = 20;
        this.tiempoDisparo = 1;

        this.mult = 1
    }

}
