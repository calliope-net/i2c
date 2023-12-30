
//% color=#007FFF icon="\uf1e6" block="i2c" weight=24
/* groups='["Control", "Show", "Draw", "Delete"]' (Beispiel aus pxt-oledpaint) */
namespace i2c
/* 230829 231021 231104 https://github.com/calliope-net/i2c
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
umgestellt auf Objektvariablen im November 2023
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

        //  M5Stack U024-C Joystick
        Joystick_x52 = 0x52,

        // M5Stack U305-B CardKB
        CardKB_x5F = 0x5F,

        // SparkFun Qwiic Motor Driver
        Motor_x5D = 0x5D, Motor_x58 = 0x58, Motor_x59 = 0x59, Motor_x5A = 0x5A, Motor_x5B = 0x5B, Motor_x5C = 0x5C,
        Motor_x5E = 0x5E, Motor_x5F = 0x5F, Motor_x60 = 0x60, Motor_x61 = 0x61,

        gyro_x68 = 0x68, // Bosch BMX055

        // SparkFun 20x4 SerLCD - RGB Backlight (Qwiic)
        LCD_20x4_x72 = 0x72
    }



    //% group="sammelt gültige i2c-Adressen in Array" subcategory="i2c Scan"
    //% block="i2c-Scan von %vonADDR bis %bisADDR Pause %ms ms"
    //% vonADDR.shadow="i2c_eADDR" bisADDR.shadow="i2c_eADDR"
    //% vonADDR.min=0 vonADDR.max=127
    //% bisADDR.min=0 bisADDR.max=127 bisADDR.defl=i2c.eADDR.LCD_20x4_x72
    //% ms.min=0 ms.max=500 ms.defl=100
    export function i2cscan(vonADDR: number, bisADDR: number, ms: number): number[] {
        let a: number[] = []
        if (between(vonADDR, 0, 127) && between(bisADDR, 0, 127) && vonADDR <= bisADDR) {
            let b = Buffer.create(1)
            b.setUint8(0, 0)
            let ex: number = 0
            for (let i = vonADDR; i <= bisADDR; i++) {

                if (i == eADDR.LCD_16x2_x3E) { // reagiert nicht auf 1 Byte 0x00
                    pins.i2cWriteBuffer(eADDR.magnetic_x10, b) // vorher eine gültige Adresse aufrufen
                    ex = pins.i2cWriteBuffer(i, b)
                    //ex = pins.i2cWriteBuffer(i, Buffer.fromArray([0x80, 0x01]))
                }
                else
                    ex = pins.i2cWriteBuffer(i, b)

                if (ex == 0) {
                    a.push(i)
                    if (a.length >= 32)
                        break
                }
                basic.pause(ms)
            }
            pins.i2cWriteBuffer(eADDR.magnetic_x10, b) // am Ende eine gültige Adresse aufrufen
        }
        return a
    }


    //% group="sammelt gültige i2c-Adressen in HEX-String" subcategory="i2c Scan"
    //% block="i2c-Scan von %vonADDR bis %bisADDR Pause %ms ms"
    //% vonADDR.shadow="i2c_eADDR" bisADDR.shadow="i2c_eADDR"
    //% vonADDR.min=0 vonADDR.max=127
    //% bisADDR.min=0 bisADDR.max=127 bisADDR.defl=i2c.eADDR.LCD_20x4_x72
    //% ms.min=0 ms.max=500 ms.defl=100
    export function i2ctohex(vonADDR: number, bisADDR: number, ms: number): string {
        return Buffer.fromArray(i2cscan(vonADDR, bisADDR, ms)).toHex()
    }


    //% group="Funktionen" subcategory="i2c Scan"
    //% block="%i0 zwischen %i1 und %i2" weight=4
    export function between(i0: number, i1: number, i2: number): boolean { return (i0 >= i1 && i0 <= i2) }

    //% group="Funktionen" subcategory="i2c Scan"
    //% block="%text .charCodeAt (index %index)" weight=3
    export function charCodeAt(text: string, index: number) {
        return text.charCodeAt(index)
    }


    // ========== group="i2c" subcategory="i2c Scan"

    //% blockId=i2c_eADDR
    //% group="i2c" subcategory="i2c Scan"
    //% block="%pADDR"
    //% blockSetVariable=i2cAdresse
    export function i2c_eADDR(pADDR: eADDR): number { return pADDR }



} // i2c.ts
