class Sapo extends BaseEnemigo {

    constructor(x, y) {
        super(imagenes.sapo, x, y)


        this.vy = 0.1;
        this.vx = 1.5;

        this.puntos = 15;
        this.vida = 3
    }
    actualizar (){
        this.vx = -1.5;
        this.x = this.x + this.vx;
    }

}
