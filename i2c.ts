
//% color=#007FFF icon="\uf1e6" block="i2c" weight=24
namespace i2c
/* 230818
Calliope Blöcke zur Programmierung beliebiger i2c Module ohne JavaScript
optimiert und getestet für die gleichzeitige Nutzung mehrerer i2c Module am Calliope
[Projekt-URL] https://github.com/calliope-net/i2c
[README]      https://calliope-net.github.io/i2c

[i2c-Adressen-Liste] https://wiki.seeedstudio.com/I2C_And_I2C_Address_of_Seeed_Product

Code neu programmiert von Lutz Elßner im Juli 2023
*/ {
    export enum ADDR {
        DIP_SWITCH = 0x03,
        Relay = 0x11, Relay_x12 = 0x12,
        JOY_Qwiic = 0x20,
        GPIO_Qwiic = 0x27, GPIO_Qwiic_x26 = 0x26,
        LOG_Qwiic = 0x2A, LOG_Qwiic_x29 = 0x29,
        RGB_16x2_V5 = 0x30, RGB_16x2_x62 = 0x62,
        OLED_16x8 = 0x3C, OLED_16x8_x3D = 0x3D,
        LCD_16x2 = 0x3E, //LCD_16x2_V4 = 0x70,
        V_A_Qwiic = 0x40, // 0x41, 0x44, 0x45 Wattmeter
        KEY_Qwiic = 0x4B, KEY_Qwiic_Jumper = 0x4A,
        EEPROM_Qwiic = 0x50, // bis 0x57
        RTC_PCF85063TP = 0x51,
        MOTOR_Qwiic = 0x5D,
        LCD_20x4 = 0x72,
    }

    //% group="i2c Adressen"
    //% block="i2c Adresse von Modul %pADDR" weight=94
    export function i2cAdressen(pADDR: ADDR): number { return pADDR }

    // ========== group="i2c Bytes senden"

    //% group="i2c Bytes senden"
    //% block="i2c-Adresse %pADDR write 1Byte %pByte0 repeat %repeat" weight=56
    export function write1Byte(pADDR: number, pByte: number, repeat: boolean) {
        let b = pins.createBuffer(1)
        b.setUint8(0, pByte)
        pins.i2cWriteBuffer(pADDR, b, repeat)
    }

    //% group="i2c Bytes senden"
    //% block="i2c-Adresse %pADDR write 2Byte %pByte0 %pByte1 repeat %repeat" weight=54
    //% inlineInputMode=inline
    export function write2Byte(pADDR: number, pByte0: number, pByte1: number, repeat: boolean) {
        let b = pins.createBuffer(2)
        b.setUint8(0, pByte0)
        b.setUint8(1, pByte1)
        pins.i2cWriteBuffer(pADDR, b, repeat)
    }

    //% group="i2c Bytes senden"
    //% block="i2c-Adresse %pADDR write Array %values repeat %repeat" weight=52
    export function writeArray(pADDR: number, values: number[], repeat: boolean) {
        let b = pins.createBuffer(values.length)
        for (let index = 0; index <= values.length - 1; index++) {
            b.setUint8(index, values.get(index))
        }
        pins.i2cWriteBuffer(pADDR, b, repeat)
        control.waitMicros(50)
    }

    //% group="i2c Bytes senden"
    //% block="i2c-Adresse %pADDR write Command %pByte String %pText repeat %repeat" weight=50
    //% inlineInputMode=inline
    export function writeCommandString(pADDR: number, pByte: number, pText: string, repeat: boolean) {
        let b = pins.createBuffer(pText.length + 1)
        b.setUint8(0, pByte)
        for (let Index = 0; Index <= pText.length - 1; Index++) {
            b.setUint8(Index + 1, pText.charCodeAt(Index))
        }
        pins.i2cWriteBuffer(pADDR, b, repeat)
        control.waitMicros(50)
    }


    // ========== group="i2c Bytes empfangen"

    //% group="i2c Bytes empfangen"
    //% block="i2c-Adresse %pADDR read Array %size Bytes repeat %repeat" weight=42
    export function readArray(pADDR: number, size: number, repeat: boolean) {
        return pins.i2cReadBuffer(pADDR, size, repeat).toArray(NumberFormat.UInt8LE)
    }

    //% group="i2c Bytes empfangen"
    //% block="i2c-Adresse %pADDR read Number %pNumberFormat repeat %repeat" weight=40
    //% pNumberFormat.defl=NumberFormat.UInt8LE
    export function readNumber(pADDR: number, pNumberFormat: NumberFormat, repeat: boolean) {
        return pins.i2cReadBuffer(pADDR, pins.sizeOf(pNumberFormat), repeat).getNumber(pNumberFormat, 0)
    }



    // ========== advanced=true

    // ========== group="Buffer vorbereiten zum senden" advanced=true

    let localBuffer: Buffer

    //% group="Buffer vorbereiten zum senden" advanced=true 
    //% block="createBuffer size %size" weight=36
    export function createBuffer(size: number) { localBuffer = pins.createBuffer(size) }

    //% group="Buffer vorbereiten zum senden" advanced=true 
    //% block="setUint8 offset %offset byte %byte" weight=34
    //% byte.min=0 byte.max=255
    export function setUint8(offset: number, byte: number) { localBuffer.setUint8(offset, byte) }

    //% group="Buffer vorbereiten zum senden" advanced=true 
    //% block="getUint8 offset %offset byte %byte" weight=32
    //% byte.min=0 byte.max=255
    export function getUint8(offset: number, byte: number) { return localBuffer.getUint8(offset) }


    // ========== group="i2c Buffer senden" advanced=true

    //% group="i2c Buffer senden" advanced=true 
    //% block="i2c-Adresse %pADDR writeBuffer repeat %repeat" weight=30
    export function i2cWriteBuffer(pADDR: number, repeat: boolean) { pins.i2cWriteBuffer(pADDR, localBuffer, repeat) }


    // ========== group="Modul am i2c Bus suchen" advanced=true

    //% group="Modul am i2c Bus suchen" advanced=true
    //% block="i2c-Adresse finden von %vonADDR bis %bisADDR" weight=20
    export function i2cCheck(vonADDR: number, bisADDR: number) {
        if (storage.getNumber(StorageSlots.s7) < vonADDR || storage.getNumber(StorageSlots.s7) > bisADDR) {
            storage.putNumber(StorageSlots.s7, vonADDR)
        }
        let b = pins.createBuffer(1)
        b.setUint8(0, 0)
        let error = pins.i2cWriteBuffer(storage.getNumber(StorageSlots.s7), b)
        //error = i2c.i2cCheck(storage.getNumber(StorageSlots.s7), 0)
        if (error == 0) {
            return storage.getNumber(StorageSlots.s7)
        } else if (storage.getNumber(StorageSlots.s7) < bisADDR) {
            storage.putNumber(StorageSlots.s7, storage.getNumber(StorageSlots.s7) + 1)
            control.reset()
            return error
        } else {
            return error
        }
    }

} // i2c.ts
