const i2cBus = require('i2c-bus')
const Pca9685Driver = require('pca9685').Pca9685Driver

async function main () {
  let opts = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 60,
    debug: true
  }
  let pwm = new Pca9685Driver(opts, (err) => {
    if (err) {
      console.error('error initializing PCA9685')
      console.error(err)
      process.exit(-1)
    }
    console.log('initialized')

    pwm.setDutyCycle(7, 0xffff, 0, err => console.log(err))

    setTimeout(() => {
      pwm.setDutyCycle(7, 0, 0, err => console.log(err))
    }, 5000)
  })
}

main()
