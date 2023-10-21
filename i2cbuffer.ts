
namespace i2c
/*
*/ {

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

} // i2cbuffer.ts
