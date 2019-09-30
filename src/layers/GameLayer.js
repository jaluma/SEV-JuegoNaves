class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();

        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);
        this.fondoVidas = new Fondo(imagenes.icono_vidas, 480*0.12,320*0.07);

        this.puntos = new Texto(0,480*0.9,320*0.07 );

        this.jugador = new Jugador(100, 100);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350,200));

        //amp. 1
        this.enemigos.push(new Sapo(480,300));

        this.disparosJugador = []
        this.disparosEnemigos = []

        this.vidas = new Texto(this.jugador.vida,480*0.2,320*0.07 );

        this.cadenciaDisparosEnemigos = 6;
    }

    actualizar (){
        this.fondo.vx = -1;
        this.fondo.actualizar();    

        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){
    
                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }    
        for (var i=0; i < this.disparosEnemigos.length; i++){
            if ( this.disparosEnemigos[i] != null &&
                !this.disparosEnemigos[i].estaEnPantalla()){
    
                this.disparosEnemigos.splice(i, 1);
                i=i-1;
            }
        }    

        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null){
            this.iteracionesCrearEnemigos = 0;
        }

        // generar disparos
        for (var i=0; i < this.enemigos.length; i++){
            var disparo = this.enemigos[i].disparar();
            if (disparo !== null) {
                this.disparosEnemigos.push(disparo)
            }
        }

        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos --;

        if ( this.iteracionesCrearEnemigos < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new Enemigo(rX,rY));
            this.iteracionesCrearEnemigos = 110;
        }

        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }
        for (var i=0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].actualizar();
        }

        // colisiones
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.colision()
            }
        }
        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                        this.puntos.valor+=this.enemigos[j].puntos;

                        this.disparosJugador.splice(i, 1);
                        i = i-1;
                        this.enemigos.splice(j, 1);
                        j = j-1;
                }
            }
        }

        for (var i=0; i < this.disparosEnemigos.length; i++){
            if (this.disparosEnemigos[i] != null && this.jugador != null && this.disparosEnemigos[i].colisiona(this.jugador)) {
                this.disparosEnemigos.splice(i, 1);
                i = i-1;

                this.colision()
            }
        }

        this.puntos.dibujar();
        this.vidas.dibujar();
    }

    colision() {
        // reseteamos si muere. ademas baja la vida
        if (this.jugador.colision()) {
            this.iniciar();
        }
        this.vidas.value = this.jugador.vida
    }

    dibujar (){
        this.fondo.dibujar();
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }
        for (var i=0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].dibujar();
        }

        this.jugador.dibujar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }

        this.puntos.dibujar();
        this.vidas.dibujar();
        this.fondoPuntos.dibujar();
        this.fondoVidas.dibujar()
    }


    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.disparosJugador.push(nuevoDisparo);
            }
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }


}
