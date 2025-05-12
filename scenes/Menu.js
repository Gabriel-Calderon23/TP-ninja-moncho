
export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  preload() {
   this.load.image("menu", "./public/assets/fondoMenu.jpg");

  }

  create() {
    // Fondo (opcional

    this.add.image(400, 300, "menu")

    // Título
    this.add.text(400, 150, "Ninja Moncho", {
      fontSize: "48px",
      fill: "#ffffff",
      fontFamily: "Arial"
    }).setOrigin(0.5);

    // Botón de texto “Jugar”
    const playText = this.add.text(400, 300, "Jugar", {
      fontSize: "36px",
      fill: "#00ff00",
      fontFamily: "Arial",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    // Efecto hover
    playText.on("pointerover", () => playText.setStyle({ fill: "#ffff00" }));
    playText.on("pointerout",  () => playText.setStyle({ fill: "#00ff00" }));

    // Al hacer click, arranca la escena "game"
    playText.on("pointerdown", () => {
      this.scene.start("game");
    });
  }
}