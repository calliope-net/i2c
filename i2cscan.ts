
namespace i2c
/*
*/ {

    //% group="i2c Adressen" subcategory="i2c Scan"
    //% block="i2c-Check von %vonADDR bis %bisADDR Pause %ms ms" weight=2
    //% vonADDR.shadow="i2c_eADDR" bisADDR.shadow="i2c_eADDR"
    //% vonADDR.min=0 vonADDR.max=127
    //% bisADDR.min=0 bisADDR.max=127 bisADDR.defl=i2c.eADDR.LCD_20x4_x72
    //% ms.min=0 ms.max=500 ms.defl=100
    export function i2cscan(vonADDR: number, bisADDR: number, ms: number) {
        //return i2cCheck(vonADDR, bisADDR) 
        let a: number[] = []
        if (between(vonADDR, 0, 127) && between(bisADDR, 0, 127) && vonADDR <= bisADDR) {
            let b = Buffer.create(1)
            b.setUint8(0, 0)
            let ex: number = 0
            for (let i = vonADDR; i <= bisADDR; i++) {
                ex = pins.i2cWriteBuffer(i, b)
                if (ex == 0) {
                    a.push(i)
                }
                if (a.length >= 32)
                    break
                basic.pause(ms)
            }
        }
        return a
    }

    function between(i0: number, i1: number, i2: number): boolean { return (i0 >= i1 && i0 <= i2) }

} // i2cscan.ts
