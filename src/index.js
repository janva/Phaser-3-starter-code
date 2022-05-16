import Phaser from "phaser";

class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    this.image = this.add.image(400, 300, "logo");
  }

  update() {
    this.image.rotation += 0.01;
  }
}

const config = {
  width: 800,
  height: 600,
  parent: "game",
  scene: PlayGame,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
