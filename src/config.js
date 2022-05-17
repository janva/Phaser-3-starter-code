import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  scale: {
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
};
