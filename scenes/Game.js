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
    this.load.image("triangle", "./public/assets/triangle.png")
    
  }

  create() {
    // create game objects
    
  }

  update() {
    // update game objects
  }
}
