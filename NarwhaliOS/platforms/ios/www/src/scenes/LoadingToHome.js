import Phaser from 'phaser'
import MiniGame from './miniGame'

// loadingpage before MiniGame

export default class LoadingGame extends Phaser.Scene {
  constructor () {
    super({ key: 'LoadingToHome' })
  }
  init (data) {
    this.score = data.score
  }
  preload () {
    this.load.image('whale1', './assets/whaleAnimation/whale1.png')
    this.load.image('whale2', './assets/whaleAnimation/whale2.png')
    this.load.image('whale3', './assets/whaleAnimation/whale3.png')
    this.load.image('whale4', './assets/whaleAnimation/whale4.png')
    this.load.image('whale5', './assets/whaleAnimation/whale5.png')
    this.load.image('whale6', './assets/whaleAnimation/whale6.png')
    this.load.image('whale7', './assets/whaleAnimation/whale7.png')
    this.load.image('whale8', './assets/whaleAnimation/whale8.png')
    this.load.image('whale9', './assets/whaleAnimation/whale9.png')
    this.load.image('whale10', './assets/whaleAnimation/whale10.png')
  }

  create () {
    this.anims.create({
      key: 'whaleLoadingPage',
      frames: [
        { key: 'whale1', duration: 100 },
        { key: 'whale2', duration: 100 },
        { key: 'whale3', duration: 100 },
        { key: 'whale4', duration: 100 },
        { key: 'whale5', duration: 100 },
        { key: 'whale6', duration: 100 },
        { key: 'whale7', duration: 100 },
        { key: 'whale8', duration: 100 },
        { key: 'whale9', duration: 100 },
        { key: 'whale10', duration: 100 },
        { key: 'whale9', duration: 100 },
        { key: 'whale8', duration: 100 },
        { key: 'whale7', duration: 100 },
        { key: 'whale6', duration: 100 }
      ],
      frameRate: 6,
      repeat: 3
    })
    this.whaleLoading = this.add.sprite(400, 300, 'whale1').play('whaleLoadingPage')
    this.whaleLoading.setInteractive()

    this.add.text(210, 430, 'Loading Home...', {
      font: '40px Pacifico',
      fill: '#F0FFF0'
    })

    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.scene.start('GameScene', { score: this.score })
      },
      callbackScope: this
    })
  }

  update () {}
}
