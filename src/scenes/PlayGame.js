import { Scene } from "phaser";

// eslint-disable-next-line no-unused-vars
class PlayGame extends Scene {
  constructor() {
    super({ key: "PlayGame" });
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

export default PlayGame;
