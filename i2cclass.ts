
namespace i2c {

    // ========== group="calliope-net.github.io/i2c"

    //% group="calliope-net.github.io/i2c"
    //% block="%bytes" weight=16
    //% blockSetVariable=oBuffer
    export function fromArray1(bytes: number[]) { return new i2cclass(Buffer.fromArray(bytes)) }



    // ========== subcategory="Buffer.create" ==========

    // ========== group="Buffer anlegen" subcategory="Buffer.create"

    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="Buffer.create size %size" weight=8
    //% blockSetVariable=oBuffer
    export function ocreate(size: number): i2cclass { return new i2cclass(Buffer.create(size)) }

    // ========== oBuffer.setUint8 weight=6
    // ========== oBuffer.setNumber weight=4
    // ========== oBuffer.length weight=2

    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="sizeOfNumberFormat %format" weight=1
    //% format.defl=NumberFormat.UInt8LE
    export function sizeOfNumberFormat(format: NumberFormat): 0 | 4 | 2 | 1 | 8 { return Buffer.sizeOfNumberFormat(format) }



    // ========== group="Buffer anlegen aus Daten" subcategory="Buffer.create"

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer.fromArray (%bytes)" weight=8
    //% blockSetVariable=oBuffer
    export function fromArray2(bytes: number[]) { return new i2cclass(Buffer.fromArray(bytes)) }

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer.fromString(%str)" weight=6
    //% blockSetVariable=oBuffer
    export function ofromUTF8(str: string) { return new i2cclass(Buffer.fromUTF8(str)) }

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer.fromHex(%hex)" weight=4
    //% blockSetVariable=oBuffer
    export function ofromHex(hex: string) { return new i2cclass(Buffer.fromHex(hex)) }

    // ========== oBuffer.concat  weight=3

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer %pBuffer" weight=2
    //% blockSetVariable=oBuffer
    export function fromBuffer(pBuffer: Buffer) { return new i2cclass(pBuffer) }


    // ====================================
    // ========== class i2cclass ==========

    export class i2cclass {
        qBuffer: Buffer

        constructor(pBuffer: Buffer) {
            this.qBuffer = pBuffer
        }

        // ========== group="i2c Buffer senden an Modul"

        //% group="Buffer senden an i2c-Modul"
        //% block="writeBuffer %oBuffer → i2c %pADDR || repeat %repeat" weight=6
        //% pADDR.shadow="i2c_eADDR"
        //% repeat.shadow="toggleOnOff"
        i2cWriteBuffer(pADDR: number, repeat: boolean = false) { pins.i2cWriteBuffer(pADDR, this.qBuffer, repeat) }

        //% group="Buffer senden an i2c-Modul mit Fehlercode (0 ist kein Fehler)"
        //% block="writeBuffer %oBuffer → i2c %pADDR || repeat %repeat" weight=4
        //% pADDR.shadow="i2c_eADDR"
        //% repeat.shadow="toggleOnOff"
        //% blockSetVariable=i2cError
        i2cWriteBuffer_return(pADDR: number, repeat: boolean = false): number { return pins.i2cWriteBuffer(pADDR, this.qBuffer, repeat) }



        // ========== subcategory="Buffer.create" ==========

        // ========== group="Buffer anlegen" subcategory="Buffer.create"

        //% group="Buffer anlegen" subcategory="Buffer.create"
        //% block="Buffer %oBuffer .setUint8(offset %off byte %byte)" weight=6
        //% byte.min=0 byte.max=255
        setUint8(off: number, byte: number) { this.qBuffer.setUint8(off, byte) }

        //% group="Buffer anlegen" subcategory="Buffer.create"
        //% block="Buffer %oBuffer .setNumber(%format offset %off value %value)" weight=4
        //% inlineInputMode=inline
        //% format.defl=NumberFormat.UInt8LE
        setNumber(format: NumberFormat, off: number, value: number) { this.qBuffer.setNumber(format, off, value) }

        //% group="Buffer anlegen" subcategory="Buffer.create"
        //% block="Buffer %oBuffer .length" weight=2
        length(): number { return this.qBuffer.length }


        // ========== group="Buffer anlegen aus Daten" subcategory="Buffer.create"

        //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
        //% block="Buffer %oBuffer .concat(otherBuffer %other)" weight=3
        //% blockSetVariable=oBuffer
        concat(other: Buffer) { return new i2cclass(this.qBuffer.concat(other)) }



        // ========== subcategory="Buffer.get"

        // ========== group="Byte" subcategory="Buffer.get"

        //% group="Byte" subcategory="Buffer.get"
        //% block="Buffer %oBuffer .getUint8(offset %off)"
        getUint8(off: number): number { return this.qBuffer.getUint8(off) }

        // ========== group="Number" subcategory="Buffer.get"

        //% group="Number" subcategory="Buffer.get"
        //% block="Buffer %oBuffer .getNumber(%format offset %off)"
        //% format.defl=NumberFormat.UInt8LE
        getNumber(format: NumberFormat, off: number): number { return this.qBuffer.getNumber(format, off) }


        // ========== group="Array" subcategory="Buffer.get"

        //% group="Array" subcategory="Buffer.get"
        //% block="Buffer %oBuffer .toArray(%format)"
        //% format.defl=NumberFormat.UInt8LE
        toArray(format: NumberFormat): number[] { return this.qBuffer.toArray(format) }


        // ========== group="String" subcategory="Buffer.get"

        //% group="String" subcategory="Buffer.get"
        //% block="Buffer %oBuffer .toString()" weight=4
        toString(): string { return this.qBuffer.toString() }

        //% group="String" subcategory="Buffer.get"
        //% block="Buffer %oBuffer .toHex()" weight=2
        toHex(): string { return this.qBuffer.toHex() }






    } // ========== class i2cclass ========
    // ====================================


    // ========== namespace i2c ==========

    // ========== group="Buffer empfangen von i2c-Modul"

    //% group="Buffer empfangen von i2c-Modul"
    //% block="i2c %pADDR readBuffer size %size || repeat %repeat"
    //% pADDR.shadow="i2c_eADDR"
    //% blockSetVariable=oBuffer
    export function oi2cReadBuffer(pADDR: number, size: number, repeat: boolean = false) { return new i2cclass(pins.i2cReadBuffer(pADDR, size, repeat)) }



} // i2cclass.ts
