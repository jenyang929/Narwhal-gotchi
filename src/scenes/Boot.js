import Phaser from "phaser";
import WebFont from "webfontloader";

// initial loading

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
    this.add.text(250, 300, "Loading your virtual narwal...");

    this.load.image("loaderBg", "./assets/images/loader-bg.png");
    this.load.image("loaderBar", "./assets/images/loader-bar.png");
    this.load.image("background", "./assets/images/seasprite.png");
    this.load.image("narwal", "./assets/images/narwal2.png");
    this.load.image("shrimp", "./assets/images/shrimp.png");
    this.load.image("button", "./assets/images/button.png");
    this.load.image("friend1", "./assets/images/1.png");
    this.load.image("friend2", "./assets/images/2.png");
    this.load.image("friend3", "./assets/images/3.png");
    this.load.image("friend4", "./assets/images/4.png");
    this.load.image("stop", "./assets/images/stop.png");
    this.load.image("home", "./assets/images/home.png");
    this.load.image("happy", "./assets/images/happy.png");
    this.load.image("sad", "./assets/images/sad.png");
    this.load.image("bubble", "./assets/images/bubble.png");
    this.load.image("whale1", "./assets/whaleAnimation/whale1.png");
    this.load.image("whale2", "./assets/whaleAnimation/whale2.png");
    this.load.image("whale3", "./assets/whaleAnimation/whale3.png");
    this.load.image("whale4", "./assets/whaleAnimation/whale4.png");
    this.load.image("whale5", "./assets/whaleAnimation/whale5.png");
    this.load.image("whale6", "./assets/whaleAnimation/whale6.png");
    this.load.image("whale7", "./assets/whaleAnimation/whale7.png");
    this.load.image("whale8", "./assets/whaleAnimation/whale8.png");
    this.load.image("whale9", "./assets/whaleAnimation/whale9.png");
    this.load.image("whale10", "./assets/whaleAnimation/whale10.png");

    WebFont.load({
      google: {
        families: ["Pacifico"],
      },
      active: this.fontsLoaded,
    });
  }

  update() {
    if (this.fontsReady) {
      this.scene.start("TitleScene");
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }
}
