input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    oBuffer.setUint8(0, 0)
})
let oBuffer: i2c.i2cclass = null
oBuffer = i2c.createClass(0)
