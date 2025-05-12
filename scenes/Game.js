// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}

   this.collectedItems = []; // Array donde se guardan los ítems recolectados
   this.timeLeft = 30; // duración total en segundos
   this.score = 0; // contador
    




  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/cielo.webp");        
    this.load.image("ground", "./public/assets/platform.png");
    this.load.image("diamond", "./public/assets/diamond.png");
    this.load.image("player", "./public/assets/ninja.png");
    this.load.image("square", "./public/assets/square.png")
    this.load.image("triangle", "./public/assets/triangle.png");
    this.load.image("fireball", "./public/assets/fireball.png")
    
  }

  create() {
    // create game objects
    
    this.add.image(400, 300, "sky").setScale(1.85) // carga y muestra la imagen 

   this.platforms = this.physics.add.staticGroup(); // le agrego fisicas a la plataforma
  
   this.platforms.create(400, 568, "ground").setScale(2).refreshBody(); // carga la plataforma y la escala x2

  
    this.platforms.create(50, 300, "ground");
    this.platforms.create(750, 220, "ground");


   this.player = this.physics.add.sprite(400, 450, "player").setScale(0.1);// carga el personaje y le reduce el tamaño
   //this.player.setBounce(0.2);

   this.player.setCollideWorldBounds(true); // hace que el personaje golpe con el borde del mundo (pantalla)
   this.physics.add.collider(this.player, this.platforms);// hace que la plataforma y el personaje colicionen

   this.cursors = this.input.keyboard.createCursorKeys()

  
   this.items = this.physics.add.group(); // hace un grupo de items

   this.physics.add.overlap(this.player, this.items, this.collectItem, null, this); 

   this.physics.add.collider(this.items, this.platforms); // colicion entre los items y las plataformas

   this.physics.add.collider(this.items, this.platforms, (item) => {
  let durability = item.getData("durability");
  durability -= 5;


  

  if (durability <= 0) {
    item.destroy();
   } else {
    item.setData("durability", durability);
   }
   });
  

     // timer que genera item cada 1 segundo
     this.time.addEvent({
      delay: 500,
      callback: this.spawnItem,
      callbackScope: this,
      loop: true
    });

      // Texto para mostrar victoria
    this.winText = this.add.text(300, 250, "", {
      fontSize: "32px",
      fill: "#ffffff"
    });

    // Texto del temporizador
   this.timerText = this.add.text(650, 16, `Tiempo: ${this.timeLeft}`, {
  fontSize: '24px',
  fill: '#ffffff'
   });
   

    // Evento que reduce el tiempo cada segundo
   this.timerEvent = this.time.addEvent({
   delay: 1000,
   callback: this.updateTimer,
   callbackScope: this,
   loop: true
   });

   this.scoreText = this.add.text(16, 16, `Puntaje: ${this.score}`, {
  fontSize: '24px',
  fill: '#ffffff'
   });

   
  this.input.keyboard.on('keydown-R', () => { // al preisionar la tecla R la ecena se reinicia 
      this.scene.restart();
  });

 

    
  }

spawnItem() {
    const itemTypes = ["square", "triangle", "diamond","fireball"]; //Elige al azar entre 3 tipos de ítems
    const randomType = Phaser.Math.RND.pick(itemTypes);
    const x = Phaser.Math.Between(50, 750);

    const item = this.items.create(x, 0, randomType) // Genera uno en una posición horizontal aleatoria.
   // Escala especial para fireball
  if (randomType === "fireball") {
    item.setScale(0.1); // más pequeño
  } else {
    item.setScale(0.5); // tamaño normal
  }
   
    item.setData("type", randomType); // Guardamos el tipo dentro del sprite
    item.setData("durability", 10); // puntos de vida iniciales
    item.setBounce(0.6); // mas rebote para que rebote mas veces
    item.setCollideWorldBounds(false);
    item.setVelocityY(Phaser.Math.Between(100, 200)); // velocidad aleatoria de caída
    item.setData("lastVelocityY", 0); // Para detectar rebote
  }


collectItem(player, item) {
  const type = item.getData("type");
  
  if (type === "fireball") {
    this.score -= 20; // cantidad de puntos a restar
    if (this.score < 0) this.score = 0;
  } else

  
  this.collectedItems.push(type); // Guardamos el tipo en el array

   // Asignar puntaje según tipo
  const scoreValues = {
    square: 10,
    triangle: 15,
    diamond: 20
  };
  
  this.score += scoreValues[type] || 0;
  this.checkWinCondition(); // Solo verifica victoria si NO es un fireball
  this.scoreText.setText(`Puntaje: ${this.score}`);

    item.destroy(); // Elimina el ítem al ser tocado
    this.checkWinCondition(); // Verificamos si ya ganó

    
  }

  checkWinCondition() {
    const counts = {
      square: 0,
      triangle: 0,
      diamond: 0
    };

    // Contar cuántos de cada tipo tiene el jugador
    for (let type of this.collectedItems) {
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    }

    // Verificar condición de victoria
    const hasEnoughOfEachItem = (
     counts.square >= 2 && 
     counts.triangle >= 2 &&
     counts.diamond >= 2
      );
      
      const hasEnoughScore = this.score >= 100; 

    if (hasEnoughOfEachItem || hasEnoughScore) {
      this.winText.setText("¡Ganaste!");
      this.physics.pause(); // Pausa el juego
      this.time.removeAllEvents(); // Detiene el spawn de ítems
    }

    
  }

  updateTimer() {
  this.timeLeft--;
  this.timerText.setText(`Tiempo: ${this.timeLeft}`);

  if (this.timeLeft <= 0) {
    this.timerEvent.remove(); // detener el evento
    this.physics.pause();
    this.winText.setText("¡GAME OVER!");
    this.time.removeAllEvents(); // detener el spawn de ítems
  }
}


  update() {
    // update game objects

   
   
   
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }
      if (this.cursors.up.isDown && this.player.body.touching.down) {
    
        this.player.setVelocityY(-330);      }


   // Verificar rebotes y reducir durabilidad
  this.items.getChildren().forEach(item => {
    const vy = item.body.velocity.y;
    const lastVY = item.getData("lastVelocityY");

    // Detectar rebote: cambio de dirección vertical de hacia abajo a hacia arriba
    if (lastVY > 50 && vy < -50) {
      let durability = item.getData("durability") - 5;
      item.setData("durability", durability);
      if (durability <= 0) {
        item.destroy();
      }
    }

    item.setData("lastVelocityY", vy);
  });



        
  }


  

}
