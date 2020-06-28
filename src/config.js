import Phaser from "phaser";
import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin.js";

export default {
  type: Phaser.AUTO,
  parent: "content",
  width: 800,
  height: 600,
  localStorageName: "phaseres6webpack",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
  plugins: {
    global: [
      {
        key: "rexInputTextPlugin",
        plugin: InputTextPlugin,
        start: true,
      },
    ],
  },
};
