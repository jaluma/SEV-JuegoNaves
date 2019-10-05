var naveIndex = 0   // por defecto

class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();

        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.85,320*0.07);
        this.fondoVidas = new Fondo(imagenes.icono_vidas, 480*0.12,320*0.07);

        this.puntos = []
        this.puntos[0] = new Texto(0,480*0.9,320*0.07 );
        this.puntos[1] = new Texto(0,480*0.9,320*0.14 );

        this.jugadores = []
        this.jugadores[0] = new Jugador(100, 100);
        this.jugadores[1] = new Jugador(100, 300);

        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350,200));

        //amp. 1
        this.enemigos.push(new Sapo(480,300));

        this.disparosJugador = []
        this.disparosEnemigos = []

        this.vidas = []
        this.vidas[0] = new Texto(this.jugadores[0].vida,480*0.2,320*0.07 );
        this.vidas[1] = new Texto(this.jugadores[1].vida,480*0.2,320*0.14 );

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

        for (var i=0; i < this.jugadores.length; i++){
        this.jugadores[i].actualizar();
        }
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
            for (var j=0; j < this.jugadores.length; j++){
                if ( this.jugadores[j].colisiona(this.enemigos[i])){
                    this.colision(j)
                    this.enemigos.splice(j, 1);
                    i = i-1;
                }
            }
        }
        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                for (var k=0; k < this.jugadores.length; k++){
                    if (this.disparosJugador[i] != null &&
                        this.enemigos[j] != null &&
                        this.disparosJugador[i].jugador === this.jugadores[k] && 
                        this.disparosJugador[i].colisiona(this.enemigos[j])) {
                            this.disparosJugador.splice(i, 1);
                            i = i-1;

                            if (this.enemigos[j].colision(this.jugadores[k])) {
                                this.puntos[k].valor+=this.enemigos[j].puntos;

                                this.enemigos.splice(j, 1);
                                j = j-1;
                            }
                    }
                }
            }
        }

        for (var i=0; i < this.disparosEnemigos.length; i++){
            for (var j=0; j < this.jugadores.length; j++){
                if (this.disparosEnemigos[i] != null && this.jugadores[j] != null && this.disparosEnemigos[i].colisiona(this.jugadores[j])) {
                    this.disparosEnemigos.splice(i, 1);
                    i = i-1;

                    this.colision(j)
                }
            }
        }

        for(var i = 0; i < this.puntos.length; i++) {
            this.puntos[i].dibujar();
        }
        for(var i = 0; i < this.vidas.length; i++) {
            this.vidas[i].dibujar();
        }


        for (var j=0; j < this.jugadores.length; j++){
            this.cambioNave(j)
        }

    }

    cambioNave(indexPlayer) {
        if (controles[indexPlayer].cambioNave) {
            var jugador = this.jugadores[indexPlayer]
            if (jugador instanceof Jugador2 && controles[indexPlayer].index === 0) {
                jugador = new Jugador(jugador.x, this.jugador.y, jugador.vida)
                jugador.dibujar()
            } else if (this.jugador instanceof Jugador && controles[indexPlayer].index === 1) {
                jugador = new Jugador2(jugador.x, jugador.y, jugador.vida)
                jugador.dibujar()
            }
        }
    }

    colision(index) {
        var jugador = this.jugadores[index]
        // reseteamos si muere. ademas baja la vida
        if (jugador.colision()) {
            return this.iniciar();
        }
        this.vidas[index].valor = jugador.vida
    }

    dibujar (){
        this.fondo.dibujar();
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }
        for (var i=0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].dibujar();
        }

        for (var i=0; i < this.jugadores.length; i++){
            this.jugadores[i].dibujar();
        }
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }

        for(var i = 0; i < this.vidas.length; i++) {
            this.vidas[i].dibujar();
        }
        for(var i = 0; i < this.puntos.length; i++) {
            this.puntos[i].dibujar();
        }

        this.fondoPuntos.dibujar();
        this.fondoVidas.dibujar()
    }


    procesarControles( ){
        // disparar
        for (var i=0; i < this.jugadores.length; i++){
            if (  controles[i].disparo ){
                var nuevoDisparo = this.jugadores[i].disparar();
                if ( nuevoDisparo != null ) {
                    this.disparosJugador.push(nuevoDisparo);
                }
            }
            this.movimiento(i)
        }
        



    }


    movimiento(index) {
        // Eje X
        if ( controles[index].moverX > 0 ){
            this.jugadores[index].moverX(1);

        }else if ( controles[index].moverX < 0){
            this.jugadores[index].moverX(-1);

        } else {
            this.jugadores[index].moverX(0);
        }

        // Eje Y
        if ( controles[index].moverY > 0 ){
            this.jugadores[index].moverY(-1);

        } else if ( controles[index].moverY < 0 ){
            this.jugadores[index].moverY(1);

        } else {
            this.jugadores[index].moverY(0);
        }
    }

}
