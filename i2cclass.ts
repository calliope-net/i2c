
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





    } // ========== class i2cclass

    // namespace i2c
    /* class i2cclass implements Buffer {
        size: number
        constructor(size: number) {

        }
    } */

} // i2cclass.ts
