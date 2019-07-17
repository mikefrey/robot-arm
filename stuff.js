const i2cBus = require('i2c-bus')
const Pca9685Driver = require('pca9685').Pca9685Driver

async function main () {
  let opts = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: true
  }
  let pwm = new Pca9685Driver(opts, (err) => {
    if (err) {
      console.error('error initializing PCA9685')
      console.error(err)
      process.exit(-1)
    }
    console.log('initialized')

    pwm.setPulseLength(0, 500, 0, () => console.log('500'))
    setTimeout(() => pwm.setPulseLength(0, 1500, 0, () => console.log('1500')), 2000)
    setTimeout(() => pwm.setPulseLength(0, 2500, 0, () => console.log('2500')), 4000)
  })
}

main()
