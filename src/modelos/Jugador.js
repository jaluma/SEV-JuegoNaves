class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY
        
        // Disparo
        this.cadenciaDisparo = 10;
        this.tiempoDisparo = 0;

        this.resetVida();
    }

    actualizar(){
        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            reproducirEfecto(efectos.disparo);
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }

    }

    isMuerto() {
        return this.vida === 0;
    }

    colision() {
        this.vida--;
        if (this.isMuerto()) {
            return true;
        }
        return false;
    }

    resetVida() {
        this.vida = 3
    }

}
