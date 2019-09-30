class BaseEnemigo extends Modelo {

    constructor(imagen, x, y) {
        super(imagen, x, y)
        this.dispara = true;
    }

    dibujar() {
        super.dibujar();
    }

    disparar(){
        if (this.tocaDisparar()) {
            this.resetDisparar();
            return new DisparoEnemigo(this.x, this.y);
        } else {
            this.disp--;
            return null;
        }
    }

    tocaDisparar() {
        return this.disp <= 0 && this.dispara;
    }

    resetDisparar() {
        this.disp = this.cadenciaDisparo;
    }

}
