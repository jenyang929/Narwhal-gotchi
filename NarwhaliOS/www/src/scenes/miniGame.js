import Phaser from "phaser";
import GameScene from "./Game";
import LoadingToHome from "./LoadingToHome";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "MiniGameScene" });
  }

  preload() {
    this.load.image("underwater", "./assets/images/bluee.png");
    this.load.image("gameNarwhal", "./assets/images/PixelArt.png");
    this.load.image("squid", "./assets/images/squid.png");
    this.load.image("orca", "./assets/images/orca.png");
  }

  create() {
    // VARIABLES
    this.gameStarted = false;
    this.restartButton;
    this.gameOverText;
    this.timesUp;

    // HP
    this.hitPoints = 200;
    this.hitPointsString = "HP: ";

    // SCORE
    this.score = 0;
    this.scoreString = "Score: ";

    // CHARACTERS & SETUP
    this.background = this.add.sprite(400, 300, "underwater");
    this.background.setScale(0.6);
    this.miniNarwhal = this.physics.add.sprite(50, 500, "gameNarwhal");
    this.miniNarwhal.setScale(0.2);
    this.miniNarwhal.setCollideWorldBounds(true);
    let home = this.add.image(45, 560, "home");
    home.setScale(0.06);
    home.setInteractive();
    home.on("pointerdown", () => {
      this.scene.start("LoadingToHome", { score: this.score });
    });

    // TEXT FOR SCORE
    this.scoreText = this.add.text(32, 30, this.scoreString + this.score);
    this.scoreText.visible = false;

    // TEXT FOR HP
    this.hitPointsText = this.add.text(
      32,
      60,
      this.hitPointsString + this.hitPoints
    );
    this.hitPointsText.visible = false;

    // INTRO TEXT
    this.introText = this.add.text(
      146,
      200,
      "Collect the squids from the squidRain to feed your Narwhal! \nBut be careful of the Orcas! \nClick START to start playing and use the arrow keys to move!"
    );

    // ADD GAME START EVENT
    this.startButton = this.add.text(360, 300, "START");
    this.startButton.setInteractive().on("pointerdown", () => {
      if (!this.gameStarted) {
        this.startGame();
      }
    });

    // keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  startGame() {
    this.introText.visible = false;
    this.scoreText.visible = true;
    this.startButton.visible = false;
    this.hitPointsText.visible = true;
    this.gameStarted = true;
    this.finishedGame = false;

    // GAME START - SQUID RAINS
    this.timedSquid = this.time.addEvent({
      delay: 300,
      callback: () => {
        this.squidRain();
      },
      callbackScope: this,
      loop: true,
    });

    this.timedOrca = this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.orcaRain();
      },
      callbackScope: this,
      loop: true,
    });

    // TIME OF GAME - 10 SEC
    this.timeGame = this.time.addEvent({
      delay: 10000,
      callback: () => {
        if (this.hitPoints > 0) {
          this.stopGame();
        }
      },
      callbackScope: this,
    });
  }

  orcaRain() {
    const y = Math.floor(Math.random() * Math.floor(600));
    this.orca = this.physics.add.image(0, y, "orca");
    this.orca.setScale(0.2);
    this.tweens.add({
      targets: this.orca,
      props: {
        x: {
          value: 1300,
          duration: 4000,
          ease: "Expo.out",
          delay: 20,
        },
      },
    });

    // COLLISION NARWHAL & ORCA
    this.physics.add.overlap(this.miniNarwhal, this.orca, () => {
      this.flashNarwhal();
      this.decreaseHp();
      this.updateScoreText();
    });
  }

  squidRain() {
    const x = Math.floor(Math.random() * Math.floor(800));
    const squid = this.physics.add.image(x, 0, "squid");
    this.miniNarwhal.setCollideWorldBounds(true);
    squid.setScale(0.1);

    this.tweens.add({
      targets: squid,
      props: {
        y: {
          value: 1000,
          duration: 3000,
          ease: "Linear",
          delay: 10,
        },
      },
    });

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        squid.destroy();
      },
    });

    // COLLISION NARWHAL + SQUID
    this.physics.add.overlap(this.miniNarwhal, squid, () => {
      this.squidDisappear(squid);
      this.increaseScore();
      this.updateScoreText();
    });

    // COLLISION ORCA + SQUID
    this.physics.add.overlap(squid, this.orca, () => {
      this.squidDisappear(squid);
    });
  }

  squidDisappear(squid) {
    squid.destroy();
  }

  flashNarwhal() {
    this.miniNarwhal.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    this.colorNarwhal = this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.miniNarwhal.clearTint();
      },
      callbackScope: this,
    });
  }

  decreaseHp() {
    if (this.gameStarted && !this.finishedGame) {
      this.hitPoints -= 5;
      if (this.hitPoints <= 0) {
        this.failGame();
        this.gameStarted = false;
        this.gameOverText = this.add.text(
          145,
          180,
          "Game Over! Restart to play again",
          {
            font: "40px Pacifico",
            fill: "#0C1B33",
          }
        );
        this.restartButton = this.add.text(385, 370, "RESTART");
        this.restartButton.setInteractive().on("pointerdown", () => {
          if (!this.gameStarted) {
            this.restartGame();
          }
        });
      }
    }
  }

  increaseScore() {
    if (this.gameStarted && !this.finishedGame) {
      this.score++;
      this.hitPoints += 20;
    }
  }

  updateScoreText() {
    this.scoreText.setText(this.scoreString + this.score);
    this.hitPointsText.setText(this.hitPointsString + this.hitPoints);
  }

  restartGame() {
    this.score = 0;
    this.hitPoints = 200;
    this.updateScoreText();
    if (this.gameOverText) {
      this.gameOverText.destroy();
      this.gameOverText = null;
    } else if (this.timesUp) {
      this.timesUp.destroy();
      this.timesUp = null;
    }
    this.startGame();
    this.restartButton.destroy();
    this.restartButton = null;
  }

  stopGame() {
    this.finishedGame = true;
    this.gameStarted = false;
    this.miniNarwhal.setVelocity(0, 0);
    this.timedOrca.remove(false);
    this.timedSquid.remove(false);
    this.exitText();
  }

  failGame() {
    this.finishedGame = true;
    this.miniNarwhal.setVelocity(0, 0);
    this.timedOrca.remove(false);
    this.timedSquid.remove(false);
  }

  exitText() {
    this.timesUp = this.add.text(
      240,
      150,
      `Time's Up!! \nCurrent Score: ${this.score} \nCoins Received: ${this.score}`,
      {
        font: "40px Pacifico",
        fill: "#0C1B33",
      }
    );
    this.restartButton = this.add.text(385, 425, "RESTART");
    this.restartButton.setInteractive().on("pointerdown", () => {
      if (!this.gameStarted) {
        this.restartGame();
      }
    });
  }

  update() {
    // UPDATE MOVEMENTS - LEFT & RIGHT
    this.miniNarwhal.setVelocity(0, 0);
    if (this.cursors.left.isDown) {
      this.miniNarwhal.setVelocity(-325, 0);
    } else if (this.cursors.right.isDown) {
      this.miniNarwhal.setVelocity(325, 0);
    }
    // UP & DOWN
    if (this.cursors.up.isDown) {
      this.miniNarwhal.setVelocity(0, -325);
    } else if (this.cursors.down.isDown) {
      this.miniNarwhal.setVelocity(0, 325);
    }
  }
}
