import Phaser from 'phaser'
import MiniGame from './miniGame'

// loadingpage before MiniGame

export default class LoadingGame extends Phaser.Scene {
  constructor () {
    super({ key: 'LoadingGame' })
  }

  preload () {

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

    this.add.text(200, 430, 'Loading mini-game...', {
      font: '40px Pacifico',
      fill: '#F0FFF0'
    })

    this.time.addEvent({
      delay: 6000,
      callback: () => {
        this.scene.start('MiniGameScene')
      },
      callbackScope: this
    })
  }

  update () {}
}
