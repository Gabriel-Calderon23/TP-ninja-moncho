
export default class Finish extends Phaser.Scene {
  constructor() {
    super("finish");
  }
init(data) {
    this.win = data.win; // true si ganó, false si perdió
    this.finalScore = data.score; // puntuación final
  }

  create() {
    this.add.image(400, 300, "sky").setScale(1.85)
    const message = this.win ? "¡Ganaste!" : "¡Game Over!";
    const color = this.win ? "#00ff00" : "#ff0000";

    this.add.text(400, 200, message, {
      fontSize: "48px",
      fill: color
    }).setOrigin(0.5);

    this.add.text(400, 260, `Puntaje final: ${this.finalScore}`, {
      fontSize: "32px",
      fill: "#ffffff"
    }).setOrigin(0.5);

    this.add.text(400, 320, "Presiona R para reiniciar", {
      fontSize: "24px",
      fill: "#ffffff"
    }).setOrigin(0.5);

    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("game");
    });
  }
}

