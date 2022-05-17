import Phaser from "phaser";
import config from "./config";
import PlayGame from "./scenes/PlayGame";

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-new
new Phaser.Game(Object.assign(config, { scene: [PlayGame] }));
