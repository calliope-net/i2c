
//% color=#007FFF icon="\uf1e6" block="i2c" weight=24
/* groups='["Control", "Show", "Draw", "Delete"]' (Beispiel aus pxt-oledpaint) */
namespace i2c
/* 230829 231021 https://github.com/calliope-net/i2c
Calliope Blöcke zur Programmierung beliebiger i2c Module ohne JavaScript.
Typ 'Buffer' mit Blöcken verwenden.
optimiert und getestet für die gleichzeitige Nutzung mehrerer i2c Module am Calliope
[Projekt-URL] https://github.com/calliope-net/i2c
[README]      https://calliope-net.github.io/i2c

[i2c-Adressen-Liste] https://wiki.seeedstudio.com/I2C_And_I2C_Address_of_Seeed_Product


https://github.com/calliope-net/i2c/blob/master/BMX055_i2c_S145.PDF
Seite 145:
    The default I²C address of the accelerometer device is 0011000b (0x18) and of the gyro device
    is 1101000b (0x68). It is used if the SDO1 (AM and G) pin is pulled to ´GND´. The alternative
    accel address 0011001b (0x19) and/or the alternative gyro address 1101001b (0x69) is
    selected by pulling the SDO2 (AM and/or G) pin to ´VDDIO´.

    The default I2C address of the magnetic device is 0010000b (0x10). The five MSB are
    hardwired to "00100". Alternative addresses of the magnetic device can be selected fixing the
    value of SDO or CSB lines. bit0 can be set to "1" by pulling the SDO1 pin to ´VDDIO´. bit1 can be
    set to "1" by pulling the CSB3 line pin to ´VDDIO´.


Code neu programmiert von Lutz Elßner im Juli, August, Oktober 2023
*/ {
    export enum eADDR {
        // Grove - 6-Position DIP Switch; Grove - 5-Way Switch
        DIP_x03 = 0x03,

        magnetic_x10 = 0x10, // Bosch BMX055

        // Grove - 4-Channel SPDT Relay
        Rel_x11 = 0x11, Rel_x12 = 0x12,

        accelerometer_x18 = 0x18, // Bosch BMX055

        // Qwiic Single Relay
        Relay_x18 = 0x18, Relay_x19 = 0x19, Relay_x1E = 0x1E,

        // SparkFun Qwiic Joystick
        Joystick_x20 = 0x20,

        // CalliBot
        CalliBot_x20 = 0x20, CalliBot_x21 = 0x21, CalliBot2_x22 = 0x22,

        // SparkFun Qwiic GPIO
        GPIO_x27 = 0x27, GPIO_x26 = 0x26, GPIO_x25 = 0x25, GPIO_x24 = 0x24,
        GPIO_x23 = 0x23, GPIO_x22 = 0x22, GPIO_x21 = 0x21, GPIO_x20 = 0x20,

        // Power Delivery Board - USB-C (Qwiic)
        //Power = 0x28, Power_x29 = 0x29, Power_x2A = 0x2A, Power_x2B = 0x2B,

        // SparkFun Qwiic OpenLog
        LOG_x2A = 0x2A, LOG_x29 = 0x29,

        // Grove - LCD RGB Backlight (eigene i2c Adresse für RGB, für Text: LCD_16x2)
        RGB_16x2_x30 = 0x30, RGB_16x2_V5 = 0x30, RGB_16x2_x62 = 0x62,

        // Grove - OLED Yellow&Blue Display 0.96(SSD1315) - SPI/IIC -3.3V/5V
        OLED_16x8_x3C = 0x3C, OLED_16x8_x3D = 0x3D,

        // Grove - 16x2 LCD
        LCD_16x2_x3E = 0x3E, //LCD_16x2_V4 = 0x70,

        // Gravity: I2C Digital Wattmeter
        Wattmeter_x45 = 0x45, Wattmeter_x40 = 0x40, Wattmeter_x41 = 0x41, Wattmeter_x44 = 0x44,

        // SparkFun Qwiic Keypad - 12 Button
        Keypad_x4B = 0x4B, Keypad_x4A_Jumper = 0x4A,

        // SparkFun Qwiic EEPROM Breakout - 512Kbit
        EEPROM_x50 = 0x50, EEPROM_x51 = 0x51, EEPROM_x52 = 0x52, EEPROM_x53 = 0x53,
        EEPROM_x54 = 0x54, EEPROM_x55 = 0x55, EEPROM_x56 = 0x56, EEPROM_x57 = 0x57,

        // Grove - High Precision RTC (Real Time Clock)
        RTC_x51 = 0x51,

        // SparkFun Qwiic Motor Driver
        Motor_x5D = 0x5D, Motor_x58 = 0x58, Motor_x59 = 0x59, Motor_x5A = 0x5A, Motor_x5B = 0x5B, Motor_x5C = 0x5C,
        Motor_x5E = 0x5E, Motor_x5F = 0x5F, Motor_x60 = 0x60, Motor_x61 = 0x61,

        gyro_x68 = 0x68, // Bosch BMX055

        // SparkFun 20x4 SerLCD - RGB Backlight (Qwiic)
        LCD_20x4_x72 = 0x72
    }


    // ========== group="calliope-net.github.io/i2c"

    //% blockId=i2c_eADDR
    //% group="calliope-net.github.io/i2c"
    //% block="%pADDR" weight=6
    //% blockSetVariable=i2cAdresse
    export function i2c_eADDR(pADDR: eADDR): number { return pADDR }


    // ========== group="i2c Buffer senden an Modul"

    //% group="Buffer senden an i2c-Modul"
    //% block="i2c %pADDR writeBuffer %buf || repeat %repeat" weight=8
    //% pADDR.shadow="i2c_eADDR"
    //% buf.shadow="i2c_fromArray"
    //% repeat.shadow="toggleOnOff"
    export function i2cWriteArray(pADDR: number, buf: Buffer, repeat: boolean = false) { pins.i2cWriteBuffer(pADDR, buf, repeat) }

    //% group="Buffer senden an i2c-Modul"
    //% block="i2c %pADDR writeBuffer %buf || repeat %repeat" weight=6
    //% pADDR.shadow="i2c_eADDR"
    //% repeat.shadow="toggleOnOff"
    export function i2cWriteBuffer(pADDR: number, buf: Buffer, repeat: boolean = false) { pins.i2cWriteBuffer(pADDR, buf, repeat) }

    //% group="Buffer senden an i2c-Modul mit Fehlercode (0 ist kein Fehler)"
    //% block="i2c %pADDR writeBuffer %buf || repeat %repeat" weight=4
    //% pADDR.shadow="i2c_eADDR"
    //% repeat.shadow="toggleOnOff"
    //% blockSetVariable=i2cError
    export function i2cWriteBuffer_return(pADDR: number, buf: Buffer, repeat: boolean = false): number { return pins.i2cWriteBuffer(pADDR, buf, repeat) }


    // ========== group="Buffer empfangen von i2c-Modul"

    //% group="Buffer empfangen von i2c-Modul"
    //% block="i2c %pADDR readBuffer size %size || repeat %repeat"
    //% pADDR.shadow="i2c_eADDR"
    //% blockSetVariable=readBuffer
    export function i2cReadBuffer(pADDR: number, size: number, repeat: boolean = false): Buffer { return pins.i2cReadBuffer(pADDR, size, repeat) }




    // ========== subcategory="Buffer.create"

    // ========== group="Buffer anlegen"


    //% deprecated=true
    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="Buffer.create size %size" weight=8
    //% blockSetVariable=buffer
    export function create(size: number): Buffer { return Buffer.create(size) }

    //% deprecated=true
    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="Buffer %buffer .setUint8(offset %off byte %byte)" weight=6
    //% byte.min=0 byte.max=255
    export function setUint8(buffer: Buffer, off: number, byte: number) { buffer.setUint8(off, byte) }

    //% deprecated=true
    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="Buffer %buffer .setNumber(%format offset %off value %value)" weight=4
    //% inlineInputMode=inline
    //% format.defl=NumberFormat.UInt8LE
    export function setNumber(buffer: Buffer, format: NumberFormat, off: number, value: number) { buffer.setNumber(format, off, value) }

    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="sizeOfNumberFormat %format" weight=2
    //% format.defl=NumberFormat.UInt8LE
    export function sizeOfNumberFormat(format: NumberFormat): 0 | 4 | 2 | 1 | 8 { return Buffer.sizeOfNumberFormat(format) }

    //% deprecated=true
    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="Buffer %buffer .length" weight=1
    export function length(buffer: Buffer): number { return buffer.length }


    // ========== group="Buffer anlegen aus Daten" subcategory="Buffer.create"

    //% blockId=i2c_fromArray
    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="%bytes" weight=6
    //% blockSetVariable=buffer
    export function i2c_fromArray(bytes: number[]): Buffer { return Buffer.fromArray(bytes) }

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer.fromString(%str)" weight=5
    //% blockSetVariable=buffer
    export function fromUTF8(str: string): Buffer { return Buffer.fromUTF8(str) }

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer.fromHex(%hex)" weight=4
    //% blockSetVariable=buffer
    export function fromHex(hex: string): Buffer { return Buffer.fromHex(hex) }

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer %buffer .concat(otherBuffer %other)" weight=3
    //% blockSetVariable=buffer
    export function concat(buffer: Buffer, other: Buffer): Buffer { return buffer.concat(other) }



    // ========== subcategory="Buffer.get"

    // ========== group="Byte" subcategory="Buffer.get"

    //% group="Byte" subcategory="Buffer.get"
    //% block="Buffer %buffer .getUint8(offset %off)"
    export function getUint8(buffer: Buffer, off: number): number { return buffer.getUint8(off) }


    // ========== group="Number" subcategory="Buffer.get"

    //% group="Number" subcategory="Buffer.get"
    //% block="Buffer %buffer .getNumber(%format offset %off)"
    //% format.defl=NumberFormat.UInt8LE
    export function getNumber(buffer: Buffer, format: NumberFormat, off: number): number { return buffer.getNumber(format, off) }


    // ========== group="Array" subcategory="Buffer.get"

    //% group="Array" subcategory="Buffer.get"
    //% block="Buffer %buffer .toArray(%format) max 32 Byte"
    //% format.defl=NumberFormat.UInt8LE
    export function toArray(buffer: Buffer, format: NumberFormat): number[] { return buffer.toArray(format) }


    // ========== group="String" subcategory="Buffer.get"

    //% group="String" subcategory="Buffer.get"
    //% block="Buffer %buffer .toString()" weight=4
    export function toString(buffer: Buffer): string { return buffer.toString() }

    //% group="String" subcategory="Buffer.get"
    //% block="Buffer %buffer .toHex()" weight=2
    export function toHex(buffer: Buffer): string { return buffer.toHex() }


} // i2c.ts
