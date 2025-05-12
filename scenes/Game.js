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
  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/cielo.webp");        
    this.load.image("ground", "./public/assets/platform.png");
    this.load.image("diamod", "./public/assets/diamond.png");
    this.load.image("player", "./public/assets/ninja.png");
    this.load.image("square", "./public/assets/square.png")
    this.load.image("triangle", "./public/assets/triangle.png");
    
  }

  create() {
    // create game objects
    
    this.add.image(400, 300, "sky").setScale(1.85) // carga y muestra la imagen 

   this.platforms = this.physics.add.staticGroup(); // le agrego fisicas a la plataforma
  
   this.platforms.create(400, 568, "ground").setScale(2).refreshBody(); // carga la plataforma y la escala x2
   this.player = this.physics.add.sprite(400, 450, "player").setScale(0.1);// carga el personaje y le reduce el tamaño
   //this.player.setBounce(0.2);

   this.player.setCollideWorldBounds(true); // hace que el personaje golpe con el borde del mundo (pantalla)
   this.physics.add.collider(this.player, this.platforms);// hace que la plataforma y el personaje colicionen

   this.cursors = this.input.keyboard.createCursorKeys()

   this.items = this.physics.add.group(); // hace un grupo de items

   this.physics.add.collider(this.items, this.platforms); // los items colicionan con las plataformas


     // timer que genera item cada 1 segundo
     this.time.addEvent({
      delay: 1000,
      callback: this.spawnItem,
      callbackScope: this,
      loop: true
    });




    
  }

spawnItem() {
    const itemTypes = ["square", "triangle", "diamond"]; //Elige al azar entre 3 tipos de ítems
    const randomType = Phaser.Math.RND.pick(itemTypes);
    const x = Phaser.Math.Between(50, 750);

    const item = this.items.create(x, 0, randomType).setScale(0.5); // Genera uno en una posición horizontal aleatoria.
    item.setBounce(0.1);
    item.setCollideWorldBounds(false);
    item.setVelocityY(Phaser.Math.Between(100, 200)); // velocidad aleatoria de caída
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
        this.player.setVelocityY(-330);
      }
  }
}
