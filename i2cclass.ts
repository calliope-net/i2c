
namespace i2c {


    //% group="Buffer anlegen" subcategory="Buffer.create"
    //% block="Buffer.create size %size" weight=8
    //% blockSetVariable=oBuffer
    export function createClass(size: number): i2cclass { return new i2cclass(Buffer.create(size)) }

    // ========== class i2cclass
    export class i2cclass {
        qBuffer: Buffer

        constructor(pBuffer: Buffer) {
            this.qBuffer = pBuffer
        }

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
        //% block="sizeOfNumberFormat %format" weight=2
        //% format.defl=NumberFormat.UInt8LE
        //sizeOfNumberFormat(format: NumberFormat): 0 | 4 | 2 | 1 | 8 { return Buffer.sizeOfNumberFormat(format) }

        //% group="Buffer anlegen" subcategory="Buffer.create"
        //% block="Buffer %oBuffer .length" weight=1
        length(): number { return this.qBuffer.length }



        //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
        //% block="Buffer %oBuffer .concat(otherBuffer %other)" weight=3
        //% blockSetVariable=oBuffer
        concat(other: i2cclass) { return this.qBuffer.concat(other.qBuffer) }




    } // ========== class i2cclass

    // namespace i2c


    // ========== group="Buffer anlegen aus Daten" subcategory="Buffer.create"


    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="%bytes" weight=16
    //% blockSetVariable=oBuffer
    export function ofromArray(bytes: number[]) { return new i2cclass(Buffer.fromArray(bytes)) }


    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer.fromString(%str)" weight=5
    //% blockSetVariable=oBuffer
    export function ofromUTF8(str: string) { return new i2cclass(Buffer.fromUTF8(str)) }

    //% group="Buffer anlegen aus Daten" subcategory="Buffer.create"
    //% block="Buffer.fromHex(%hex)" weight=4
    //% blockSetVariable=oBuffer
    export function ofromHex(hex: string) { return new i2cclass(Buffer.fromHex(hex)) }



} // i2cclass.ts
