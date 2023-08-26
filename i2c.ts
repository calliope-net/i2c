
//% color=#007FFF icon="\uf1e6" block="i2c" weight=24
/* groups='["Control", "Show", "Draw", "Delete"]' (Beispiel aus pxt-oledpaint) */
namespace i2c
/* 230826
Calliope Blöcke zur Programmierung beliebiger i2c Module ohne JavaScript
optimiert und getestet für die gleichzeitige Nutzung mehrerer i2c Module am Calliope
[Projekt-URL] https://github.com/calliope-net/i2c
[README]      https://calliope-net.github.io/i2c

[i2c-Adressen-Liste] https://wiki.seeedstudio.com/I2C_And_I2C_Address_of_Seeed_Product

Code neu programmiert von Lutz Elßner im Juli, August 2023
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
        EEPROM = 0x50, // bis 0x57
        RTC_PCF85063TP = 0x51,
        MOTOR_Qwiic = 0x5D,
        LCD_20x4 = 0x72,
    }

    // ========== group="i2c Adressen"

    //% group="i2c Adressen"
    //% block="i2c Adresse von Modul %pADDR"
    export function i2cAdressen(pADDR: ADDR): number { return pADDR }

    //% group="i2c Adressen"
    //% block="i2c-Adresse finden von %vonADDR bis %bisADDR"
    //% vonADDR.min=0 vonADDR.max=127 bisADDR.min=0 bisADDR.max=127
    export function i2cBus(vonADDR: number, bisADDR: number) { return i2cCheck(vonADDR, bisADDR) }


    // ========== group="i2c Buffer senden / empfangen"

    //% group="i2c Buffer senden / empfangen"
    //% block="i2c %pADDR writeBuffer %buf repeat %repeat" weight=22
    export function i2cWriteBuffer(pADDR: number, buf: Buffer, repeat: boolean) { pins.i2cWriteBuffer(pADDR, buf, repeat) }

    //% group="i2c Buffer senden / empfangen"
    //% block="i2c %pADDR writeBuffer %buf repeat %repeat" weight=21
    export function i2cWriteBuffer_return(pADDR: number, buf: Buffer, repeat: boolean): number { return pins.i2cWriteBuffer(pADDR, buf, repeat) }

    //% group="i2c Buffer senden / empfangen"
    //% block="i2c %pADDR readBuffer size %size repeat %repeat" weight=20
    export function i2cReadBuffer(pADDR: number, size: number, repeat: boolean): Buffer { return pins.i2cReadBuffer(pADDR, size, repeat) }


    // ========== group="Buffer create"

    //% group="Buffer create"
    //% block="Buffer.fromArray(%bytes) max 32 Byte"
    export function fromArray(bytes: number[]): Buffer { return Buffer.fromArray(bytes) }



    // ========== group="Buffer get"

    //% group="Buffer get"
    //% block="Buffer %buffer .toArray(%format) max 32 Byte" 
    //% format.defl=NumberFormat.UInt8LE
    export function toArray(buffer: Buffer, format: NumberFormat) { return buffer.toArray(format) }

    //% group="Buffer get"
    //% block="Buffer %buffer .toString()" weight=31
    export function toString(buffer: Buffer): string { return buffer.toString() }


    // ========== advanced=true


    // ========== group="Buffer create"

    //% group="Buffer create" advanced=true
    //% block="Buffer.create size %size" weight=6
    export function create(size: number): Buffer { return Buffer.create(size) }

    //% group="Buffer create" advanced=true
    //% block="Buffer.fromUTF8(%str)" weight=5
    export function fromUTF8(str: string): Buffer { return Buffer.fromUTF8(str) }

    //% group="Buffer create" advanced=true
    //% block="Buffer %buffer .slice(offset %off length %length)" weight=4
    export function slice(buffer: Buffer, off: number, length: number): Buffer { return buffer.slice(off, length) }

    //% group="Buffer create" advanced=true
    //% block="Buffer.concat(buffers[] %buffers)" weight=3
    export function concat(buffers: Buffer[]): Buffer { return Buffer.concat(buffers) }

    //% group="Buffer create" advanced=true
    //% block="Buffer %buffer .length" weight=2
    export function length(buffer: Buffer): number { return buffer.length }


    // ========== group="Byte"

    //% group="Byte" advanced=true
    //% block="Buffer %buffer .getUint8(offset %off)" weight=32
    export function getUint8(buffer: Buffer, off: number): number { return buffer.getUint8(off) }

    //% group="Byte" advanced=true
    //% block="Buffer %buffer .setUint8(offset %off byte %byte)" weight=34
    //% byte.min=0 byte.max=255
    export function setUint8(buffer: Buffer, off: number, byte: number) { buffer.setUint8(off, byte) }




    // ========== group="Number"

    //% group="Number" advanced=true
    //% block="sizeOfNumberFormat %format"
    //% format.defl=NumberFormat.UInt8LE
    export function sizeOfNumberFormat(format: NumberFormat): 0 | 4 | 2 | 1 | 8 { return Buffer.sizeOfNumberFormat(format) }

    //% group="Number" advanced=true
    //% block="Buffer %buffer .getNumber(%format offset %off)"
    //% format.defl=NumberFormat.UInt8LE
    export function getNumber(buffer: Buffer, format: NumberFormat, off: number): number { return buffer.getNumber(format, off) }

    //% group="Number" advanced=true
    //% block="Buffer %buffer .setNumber(%format offset %off value %value)"
    //% inlineInputMode=inline
    //% format.defl=NumberFormat.UInt8LE
    export function setNumber(buffer: Buffer, format: NumberFormat, off: number, value: number) { buffer.setNumber(format, off, value) }











    /* 
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
    
     */

    // ========== advanced=true

    // ========== group="Buffer vorbereiten zum senden" advanced=true

    // let localBuffer: Buffer


    //% group="Buffer" subcategory="Buffer"
    //% block="Buffer %buffer .fill(Byte %value offset %off length %length)" weight=28
    //% byte.min=0 byte.max=255
    //% inlineInputMode=inline
    export function fill(buffer: Buffer, byte: number, off: number, length: number) { buffer.fill(byte, off, length) }

    //% group="Buffer" subcategory="Buffer"
    //% block="Buffer %buffer .write(dstOffset %dstOffset srcBuffer %src)" weight=27
    export function write(buffer: Buffer, dstOffset: number, src: Buffer) { buffer.write(dstOffset, src) }

    //% group="Buffer[]" subcategory="Buffer"
    //% block="Buffer %buffer .chunked(maxSize %maxSize)" weight=26
    export function chunked(buffer: Buffer, maxSize: number): Buffer[] { return buffer.chunked(maxSize) }



    //% group="Buffer[]" subcategory="Buffer"
    //% block="Buffer.chunkedFromUTF8(String %str maxBytes %maxBytes)" weight=26
    export function chunkedFromUTF8(str: string, maxBytes: number): Buffer[] { return Buffer.chunkedFromUTF8(str, maxBytes) }


    //% group="Buffer get" subcategory="Buffer"
    //% block="Buffer %buffer .toHex()" weight=31
    export function toHex(buffer: Buffer): string { return buffer.toHex() }




    // ========== group="Modul am i2c Bus suchen" advanced=true

    // wird von oben aufgerufen

    //% group="Modul am i2c Bus suchen" advanced=true
    //% block="i2c-Adresse finden von %vonADDR bis %bisADDR" weight=10
    //% vonADDR.min=0 vonADDR.max=127 bisADDR.min=0 bisADDR.max=127
    function i2cCheck(vonADDR: number, bisADDR: number) {
        if (storage.getNumber(StorageSlots.s7) < vonADDR || storage.getNumber(StorageSlots.s7) > bisADDR) {
            storage.putNumber(StorageSlots.s7, vonADDR)
        }
        let bu = pins.createBuffer(1)
        bu.setUint8(0, 0)
        let error = pins.i2cWriteBuffer(storage.getNumber(StorageSlots.s7), bu)
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
