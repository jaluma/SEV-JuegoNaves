class Enemigo extends BaseEnemigo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y)
        this.aMover = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 6, 3);
        // Ref a la animación actual
        this.animacion = this.aMover;


        this.vy = 0;
        this.vx = 1;

        this.cadenciaDisparo = 100;
        this.disp = Math.random() * 100 + 1
        this.dispara = true

        this.puntos = 1;
    }

    actualizar (){
        this.vx = -1;
        this.animacion.actualizar();
        this.x = this.x + this.vx;
    }

    dibujar (){
        this.animacion.dibujar(this.x, this.y);
    }

}
