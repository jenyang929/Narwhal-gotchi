import Phaser from "phaser";

import BootScene from "./scenes/Boot";
import TitleScene from "./scenes/Title";
import GameScene from "./scenes/Game";
import MiniGameScene from "./scenes/miniGame";
import LoadingGame from "./scenes/LoadingGame";
import LoadingToHome from "./scenes/LoadingToHome";

import config from "./config";

const gameConfig = Object.assign(config, {
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    LoadingGame,
    MiniGameScene,
    LoadingToHome,
  ],
});

class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
  }
}

window.game = new Game();
