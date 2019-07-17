const promisify = require('util').promisify
const i2cBus = require('i2c-bus')
const Pca9685Driver = require('pca9685').Pca9685Driver
const ServoKit = require('./servokit')

async function main () {
  let opts = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: true
  }
  let pwm = new Pca9685Driver(opts, async (err) => {
    if (err) {
      console.error('error initializing PCA9685')
      console.error(err)
      process.exit(-1)
    }
    console.log('initialized')

    const setTimeout = promisify(global.setTimeout)
    pwm.channelOff = promisify(pwm.channelOff)
    pwm.setPulseLength = promisify(pwm.setPulseLength)

    const servos = new ServoKit(pwm, 16)

    try {
      const reach = await servos.servo(0)
      const pitch = await servos.servo(1)
      const yaw = await servos.servo(2)

      await pitch.setAngle(0)
      await setTimeout(2000)
      await pitch.setAngle(90)
      // await setTimeout(2000)
      // await pitch.setAngle(180)
      // await setTimeout(2000)
      // await pitch.setAngle(90)
      // await pitch.setAngle(90)
      // await yaw.setAngle(90)
      await setTimeout(2000)
      await reach.turnOff()
      await pitch.turnOff()
      await yaw.turnOff()
    } catch (err) {
      console.log(err)
    }
  })
}

main()
