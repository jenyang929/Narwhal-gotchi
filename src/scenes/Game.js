/* globals __DEV__ */
import Phaser from "phaser";
import { HealthBar } from "./HealthBar";
import LoadingGame from "./HealthBar";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }
  init(data) {
    console.log("data in main game", data);
    this.score = this.score + data.score || 100;
  }
  preload() {
    let background = this.load.image(
      "seasprite",
      "./assets/images/seasprite.png"
    );
    this.load.spritesheet("coin", "./assets/images/coinsprite.png", {
      frameWidth: 200,
      frameHeight: 200,
      endFrame: 6,
    });
  }

  create() {
    // characters, bakgrounds, buttons
    this.bg = this.add.tileSprite(400, 300, 800, 600, "background");

    // COIN SPRITE
    const config = {
      key: "coinspins",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 5,
        first: 5,
      }),
      frameRate: 10,
      repeat: -1,
    };

    this.anims.create(config);
    const coinspins = this.add.sprite(310, 40, "coin");
    coinspins.setScale(0.17);
    coinspins.anims.play("coinspins");

    this.add.text(330, 30, `Total: ${this.score} Coins`);

    let foodButton = this.add.image(200, 530, "button");
    foodButton.setScale(0.5);
    let playButton = this.add.image(413, 530, "button");
    playButton.setScale(0.5);
    let gameButton = this.add.image(620, 530, "button");
    gameButton.setScale(0.5);
    let home = this.add.image(45, 560, "home");
    home.setScale(0.06);
    let happyEmoji = this.add.image(50, 150, "happy");
    happyEmoji.setScale(0.02);
    let narwal = this.physics.add.sprite(400, 300, "narwal");
    narwal.setScale(0.5);
    narwal.setCollideWorldBounds(true);

    // NARWAL ACTIONS
    narwal.customParams = { health: 100, mood: "happy" };
    narwal.setInteractive();
    this.input.setDraggable(narwal);
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    narwal.on("pointerup", () => {
      this.bounce(narwal);
    });

    // TEXT & HP
    this.add.text(30, 20, "Narwal ", {
      font: "30px Pacifico",
      fill: "#F0FFF0",
    });
    this.hp = new HealthBar(this.scene.scene, 30, 75);
    this.currentHP = this.add.text(30, 95, `HP: ${this.hp.value}`, {
      font: "16px pacifico",
      fill: "#F0FFF0",
    });
    this.add.text(585, 515, "GAME", {
      font: "20px pacifico",
      fill: "#F0FFF0",
    });

    // BUTTONS -
    const feed = this.add.text(168, 515, "FOOD", {
      font: "20px pacifico",
      fill: "#F0FFF0",
    });

    const friendNarwal = this.add.text(370, 515, "FRIEND", {
      font: "20px pacifico",
      fill: "#F0FFF0",
    });

    foodButton.setInteractive();
    foodButton.on("pointerdown", () => {
      const shrimp = this.physics.add.image(118, 530, "shrimp");
      shrimp.setScale(0.05);
      shrimp.customParams = { health: 20 };
      shrimp.setInteractive();
      this.input.setDraggable(shrimp);

      // COLLISION
      const collision = this.physics.add.overlap(
        narwal,
        shrimp,
        () => {
          this.increaseHealth(20);
          this.disappear(shrimp);
          this.changeHPText();
        },
        null,
        this
      );
    });

    // FRIEND BUTTON -
    playButton.setInteractive();
    playButton.on("pointerdown", () => {
      if (!this.friend) {
        this.anims.create({
          key: "play",
          frames: [
            { key: "friend1", duration: 800 },
            { key: "friend4", duration: 300 },
          ],
          frameRate: 8,
          repeat: -1,
        });
        this.friend = this.add.sprite(600, 300, "friend1").play("play");
        this.friend.setInteractive();
        this.input.setDraggable(this.friend);
        this.friendIncreasingText;
        this.friendAddsHP;
        this.stopButton = this.add.image(740, 40, "stop");
        this.stopButton.setScale(0.06);
        this.stopButton.setInteractive({ draggable: false });
        this.stopButton.on("pointerdown", () => {
          this.friend.destroy();
          this.friend = null;
          this.stopButton.destroy();
          this.stopButton = null;
          if (this.friendIncreasingText) {
            this.friendIncreasingText.destroy();
            this.friendIncreasingText = null;
          }
          this.friendAddsHP.remove(false);
          this.friendAddsHP = null;
        });
      }

      // as you play with friend, HP increases
      this.friendAddsHP = this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.increaseHealth(5);
          this.changeHPText();

          if (!this.friendIncreasingText) {
            this.friendIncreasingText = this.add.text(130, 70, "+5", {
              font: "34px Pacifico",
              fill: "#CC7178",
            });
          } else {
            this.friendIncreasingText.destroy();
            this.friendIncreasingText = null;
          }
        },
        loop: true,
      });
    });

    // timed event decreases health status
    this.timedEvent = this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.hp.damage(10);
        this.changeHPText();

        if (this.hp.value === 0 && !this.sadEmoji) {
          this.spin(narwal);
          this.sadEmoji = this.add.image(50, 150, "sad");
          this.sadEmoji.setScale(0.02);
        } else if (this.hp.value > 0 && this.sadEmoji) {
          this.sadEmoji.destroy();
          this.sadEmoji = null;
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.timedEvent2 = this.time.addEvent({
      delay: 500,
      callback: () => {
        this.bubbleFloat();
      },
      callbackScope: this,
      loop: true,
    });

    // NEW MINIGAME
    gameButton.setInteractive();
    gameButton.on("pointerdown", () => {
      this.scene.start("LoadingGame");
    });

    // narwal POOP
    this.narwalPoops = this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.pooped = this.physics.add.image(200, 420, "poop");
        this.pooped.setScale(0.04);
        this.pooped.setCollideWorldBounds(true);
        this.pooped.setInteractive();
        this.input.setDraggable(this.pooped);
        this.trash = this.physics.add.image(680, 100, "trash");
        this.trash.setScale(0.08);
        this.trash.setInteractive();

        // COLLISION OF POOP & TRASH
        this.physics.add.overlap(this.pooped, this.trash, () => {
          this.disappear(this.pooped);
          this.disappear(this.trash);
        });
      },
    });
  }

  disappear(item) {
    item.destroy();
  }

  // background randomized floating bubbles
  bubbleFloat() {
    const x = Math.floor(Math.random() * Math.floor(800));
    const size = (Math.random() * (0.09 - 0.01) + 0.01).toFixed(4);
    const bubble = this.add.image(x, 600, "bubble");
    bubble.setScale(size);

    this.tweens.add({
      targets: bubble,
      props: {
        y: {
          value: -500,
          duration: 3000,
          ease: "Expo.out",
          delay: 10,
        },
      },
    });

    // clears bubble for memory/no lagging
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        bubble.destroy();
      },
    });
  }

  changeHPText() {
    this.currentHP.setText(`HP: ${this.hp.value}`);
  }

  bounce(narwal) {
    this.tweens.add({
      targets: narwal,
      props: {
        y: {
          value: 10,
          duration: 200,
          ease: "Bounce.easeInOut",
          yoyo: true,
          delay: 20,
        },
      },
    });
  }

  increaseHealth(num) {
    this.hp.increase(num);
  }

  disappear(item) {
    item.disableBody(true, true);
  }

  spin(narwal) {
    this.tweens.add({
      targets: narwal,
      angle: 360,
      duration: 4000,
      repeat: 2,
    });
  }

  // background infinitely scrolling
  update() {
    this.bg.tilePositionX -= 0.5;
  }
}
