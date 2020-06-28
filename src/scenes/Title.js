import Phaser from "phaser";
// import InputText from "phaser3-rex-plugins/plugins/inputtext.js";
// home page

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
  }

  preload() {
    this.load.image("sea", "./assets/images/underwater.jpg");
  }

  create() {
    // let inputText = new InputText(this.scene.scene, 400, 300, 100, 50, {});
    // this.add.existing(inputText);

    let background = this.add.sprite(400, 300, "sea");
    background.setScale(1.44);

    this.add.text(180, 100, "Narwal-gotchi", {
      font: "65px Pacifico",
      fill: "#F0FFF0",
    });

    this.add.text(275, 530, "~First interactive Narwal~", {
      font: "20px Pacifico",
      fill: "#F0FFF0",
    });

    // const inputText = scene.add.rexInputText(400, 300, width, height, config)

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.scene.start("GameScene");
      },
      callbackScope: this,
    });
  }

  update() {}
}
