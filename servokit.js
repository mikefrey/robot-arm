class ServoKit {
  constructor (pca, channels) {
    if (channels !== 8 && channels !== 16) {
      throw new Error('channels must be 8 or 16')
    }

    this._pca = pca
    this._items = new Array(channels)
    this._channels = channels
  }

  async servo (channel) {
    if (channel >= this._channels || channel < 0) {
      throw new Error('servo channel outside range')
    }
    let servo = this._items[channel]
    if (!servo) {
      servo = new Servo(this._pca, channel)
      this._items[channel] = servo
    }
    return servo
  }
}

class Servo {
  constructor (pca, channel, actuationRange = 180, minPulse = 500, maxPulse = 2500) {
    this._pca = pca
    this._channel = channel
    this._actuationRange = actuationRange
    this._minPulse = minPulse
    this._maxPulse = maxPulse

    this.turnOff = this._pca.channelOff.bind(this._pca, channel)
    this.setPulseLength = this._pca.setPulseLength.bind(this._pca, channel)
  }

  setPulseWidthRange (minPulse, maxPulse) {
    this._minPulse = minPulse
    this._maxPulse = maxPulse
  }

  async setAngle (value) {
    if (value === undefined || value === null) {
      return this.turnOff()
    }
    if (value < 0 || value > this._actuationRange) {
      throw new Error(`angle out of range (0-${this._actuationRange})`)
    }
    const range = this._actuationRange
    const minPulse = this._minPulse
    const maxPulse = this._maxPulse
    const pulseLength = (value / range) * (maxPulse - minPulse) + minPulse
    console.log('angle:', value, ' min:', minPulse, ' max:', maxPulse, ' length:', pulseLength)
    return this.setPulseLength(pulseLength, 0)
  }
}

module.exports = ServoKit
