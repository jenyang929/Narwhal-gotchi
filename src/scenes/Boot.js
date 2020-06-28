import Phaser from 'phaser'
import WebFont from 'webfontloader'

// initial loading

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.add.text(250, 200, 'Loading your virtual narwal...')

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('background', './assets/images/seasprite.png')
    this.load.image('narwal', './assets/images/narwal2.png')
    this.load.image('shrimp', './assets/images/shrimp.png')
    this.load.image('button', './assets/images/button.png')
    this.load.image('friend1', './assets/images/1.png')
    this.load.image('friend2', './assets/images/2.png')
    this.load.image('friend3', './assets/images/3.png')
    this.load.image('friend4', './assets/images/4.png')
    this.load.image('stop', './assets/images/stop.png')
    this.load.image('home', './assets/images/home.png')
    this.load.image('happy', './assets/images/happy.png')
    this.load.image('sad', './assets/images/sad.png')
    this.load.image('bubble', './assets/images/bubble.png')
    this.load.image('poop', './assets/images/poop.png')
    this.load.image('trash', './assets/images/trash.png')
    this.load.image('startbutton', './assets/images/startbutton.png')

    WebFont.load({
      google: {
        families: ['Pacifico']
      },
      active: this.fontsLoaded
    })
  }

  update () {
    this.startbutton = this.add.image(390, 300, 'startbutton')
    this.startbutton.setScale(0.3)
    this.startbutton.setInteractive()
    this.pressStart = this.add.text(320, 400, 'Press the button!')

    if (this.fontsReady) {
      this.startbutton.on('pointerdown', () => {
        this.scene.start('TitleScene')
      })
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
