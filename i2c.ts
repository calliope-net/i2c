
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
        Wattmeter = 0x40, // 0x41, 0x44, 0x45 Wattmeter
        KEY_Qwiic = 0x4B, KEY_Qwiic_Jumper = 0x4A,
        EEPROM = 0x50, // bis 0x57
        RTC_PCF85063TP = 0x51,
        Motor_Qwiic = 0x5D,
        LCD_20x4 = 0x72,
    }


    // ========== group="i2c Adressen"

    //% group="i2c Adressen"
    //% block="i2c Adresse von Modul %pADDR" weight=6
    export function i2cAdressen(pADDR: ADDR): number { return pADDR }

    //% group="i2c Adressen"
    //% block="i2c Adresse finden von %vonADDR bis %bisADDR" weight=2
    //% vonADDR.min=0 vonADDR.max=127 bisADDR.min=0 bisADDR.max=127
    export function i2cBus(vonADDR: number, bisADDR: number) { return i2cCheck(vonADDR, bisADDR) }


    // ========== group="i2c Buffer senden / empfangen"

    //% group="i2c Buffer senden / empfangen"
    //% block="i2c %pADDR writeBuffer %buf repeat %repeat" weight=6
    export function i2cWriteBuffer(pADDR: number, buf: Buffer, repeat: boolean) { pins.i2cWriteBuffer(pADDR, buf, repeat) }

    //% group="i2c Buffer senden / empfangen"
    //% block="i2c %pADDR writeBuffer %buf repeat %repeat" weight=4
    export function i2cWriteBuffer_return(pADDR: number, buf: Buffer, repeat: boolean): number { return pins.i2cWriteBuffer(pADDR, buf, repeat) }

    //% group="i2c Buffer senden / empfangen"
    //% block="i2c %pADDR readBuffer size %size repeat %repeat" weight=2
    export function i2cReadBuffer(pADDR: number, size: number, repeat: boolean): Buffer { return pins.i2cReadBuffer(pADDR, size, repeat) }


    // ========== group="Buffer anlegen"

    //% group="Buffer anlegen"
    //% block="Buffer.fromArray(%bytes) max 32 Byte"
    export function fromArray(bytes: number[]): Buffer { return Buffer.fromArray(bytes) }


    // ========== group="Buffer lesen"

    //% group="Buffer lesen"
    //% block="Buffer %buffer .toArray(%format) max 32 Byte" weight=2
    //% format.defl=NumberFormat.UInt8LE
    export function toArray(buffer: Buffer, format: NumberFormat) { return buffer.toArray(format) }

    //% group="Buffer lesen"
    //% block="Buffer %buffer .toString()" weight=1
    export function toString(buffer: Buffer): string { return buffer.toString() }



    // ========== advanced=true

    // ========== group="Buffer anlegen"

    //% group="Buffer anlegen" advanced=true
    //% block="Buffer.create size %size" weight=6
    export function create(size: number): Buffer { return Buffer.create(size) }

    //% group="Buffer anlegen" advanced=true
    //% block="Buffer.fromString(%str)" weight=5
    export function fromUTF8(str: string): Buffer { return Buffer.fromUTF8(str) }

    //% group="Buffer anlegen" advanced=true
    //% block="Buffer %buffer .concat(otherBuffer %other)" weight=3
    export function concat(buffer: Buffer, other: Buffer): Buffer { return buffer.concat(other) }

    //% group="Buffer anlegen" advanced=true
    //% block="Buffer %buffer .length" weight=1
    export function length(buffer: Buffer): number { return buffer.length }


    // ========== group="Return a copy of a fragment of a buffer."

    //% group="Return a copy of a fragment of a buffer." advanced=true
    //% block="Buffer %buffer .slice(offset %off length %length)"
    export function slice(buffer: Buffer, off: number, length: number): Buffer { return buffer.slice(off, length) }


    // ========== group="Byte"

    //% group="Byte" advanced=true
    //% block="Buffer %buffer .setUint8(offset %off byte %byte)" weight=4
    //% byte.min=0 byte.max=255
    export function setUint8(buffer: Buffer, off: number, byte: number) { buffer.setUint8(off, byte) }

    //% group="Byte" advanced=true
    //% block="Buffer %buffer .getUint8(offset %off)" weight=2
    export function getUint8(buffer: Buffer, off: number): number { return buffer.getUint8(off) }


    // ========== group="Number"

    //% group="Number" advanced=true
    //% block="Buffer %buffer .setNumber(%format offset %off value %value)" weight=8
    //% inlineInputMode=inline
    //% format.defl=NumberFormat.UInt8LE
    export function setNumber(buffer: Buffer, format: NumberFormat, off: number, value: number) { buffer.setNumber(format, off, value) }

    //% group="Number" advanced=true
    //% block="Buffer %buffer .getNumber(%format offset %off)" weight=6
    //% format.defl=NumberFormat.UInt8LE
    export function getNumber(buffer: Buffer, format: NumberFormat, off: number): number { return buffer.getNumber(format, off) }

    //% group="Number" advanced=true
    //% block="sizeOfNumberFormat %format" weight=4
    //% format.defl=NumberFormat.UInt8LE
    export function sizeOfNumberFormat(format: NumberFormat): 0 | 4 | 2 | 1 | 8 { return Buffer.sizeOfNumberFormat(format) }



    // ========== subcategory="Buffer"

    // ========== group="Fill (a fragment) of the buffer with given value."

    //% group="Fill (a fragment) of the buffer with given value." subcategory="Buffer"
    //% block="Buffer %buffer .fill(Byte %byte)" weight=3
    export function fill(buffer: Buffer, byte: number) { buffer.fill(byte) }

    //% group="Fill (a fragment) of the buffer with given value." subcategory="Buffer"
    //% block="Buffer %buffer .fill(Byte %byte offset %off length %length)" weight=2
    //% byte.min=0 byte.max=255
    //% inlineInputMode=inline
    export function fill_fragment(buffer: Buffer, byte: number, off: number, length: number) { buffer.fill(byte, off, length) }


    // ========== group="Write contents of src at dstOffset in current buffer."

    //% group="Write contents of src at dstOffset in current buffer." subcategory="Buffer"
    //% block="Buffer %buffer .write(dstOffset %dstOffset srcBuffer %src)"
    export function write(buffer: Buffer, dstOffset: number, src: Buffer) { buffer.write(dstOffset, src) }


    // ========== group="Splits buffer into parts no larger than specified."

    //% group="Splits buffer into parts no larger than specified." subcategory="Buffer"
    //% block="Buffer %buffer .chunked(maxSize %maxSize)" weight=3
    export function chunked(buffer: Buffer, maxSize: number): Buffer[] { return buffer.chunked(maxSize) }

    //% group="Splits buffer into parts no larger than specified." subcategory="Buffer"
    //% block="Buffer.chunkedFromUTF8(String %str maxBytes %maxBytes)" weight=2
    export function chunkedFromUTF8(str: string, maxBytes: number): Buffer[] { return Buffer.chunkedFromUTF8(str, maxBytes) }


    // ========== group="Convert a buffer to its hexadecimal representation."

    //% group="Convert a buffer to its hexadecimal representation." subcategory="Buffer"
    //% block="Buffer.fromHex(%hex)" weight=4
    export function fromHex(hex: string): Buffer { return Buffer.fromHex(hex) }

    //% group="Convert a buffer to its hexadecimal representation." subcategory="Buffer"
    //% block="Buffer %buffer .toHex()" weight=2
    export function toHex(buffer: Buffer): string { return buffer.toHex() }




    // ========== group="Modul am i2c Bus suchen" advanced=true

    // wird von oben aufgerufen
    /*
        //% group="Modul am i2c Bus suchen" advanced=true
        //% block="i2c-Adresse finden von %vonADDR bis %bisADDR" weight=10
        //% vonADDR.min=0 vonADDR.max=127 bisADDR.min=0 bisADDR.max=127
    */
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
