class BaseJugador extends Modelo {

    constructor(imagen, x, y, vida) {
        super(imagen, x, y)

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY
        
        // Disparo
        this.cadenciaDisparo = 10;
        this.tiempoDisparo = 0;

        this.mult = 3

        if (vida) {
            this.vida = vida
        } else {
            this.resetVida()
        }

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
        this.vx = direccion * this.mult;
    }

    moverY (direccion){
        this.vy = direccion * this.mult;
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
