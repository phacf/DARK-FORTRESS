/**
 * 
 * @param px position x
 * @param py position y
 * @param set lib with tile set to identify number[]
 * @returns 
 */
export function detectTile(px: number, py: number, set: readonly number[]): boolean {
    let cx = Math.floor(px / 8)
    let cy = Math.floor(py / 8)
    let tile = mget(cx, cy)
    return set.includes(tile)
}

/**
 * 
 * @param px position x
 * @param py position y
 * @returns 
 */
export function onTile(px: number, py: number): number {
    let cx = Math.floor(px / 8)
    let cy = Math.floor(py / 8)
    return mget(cx, cy)

}


/**
 * limitar limite da tela
 */

// x = Math.max(0, Math.min(240 - 8, x))
// y = Math.max(0, Math.min(136 - 8, y))

/**
 * 
 * @param limit screen w
 * @param size ex: player w
 * @param direction ex: player x
 * @returns 
 */
export function checkLimit(limit: number, size: number, direction: number) {
    return Math.max(0, Math.min(limit - size, direction))

}

/**
 * 
 * @param x 
 * @param y 
 * @param w 
 * @param _h 
 * @returns tile logo acima um pouco a esquerda do centro
 */
export function getTileUP(x: number, y: number, w: number, _h?: number) {
    return mget(Math.floor((x + w / 4) / 8), Math.floor((y - 1) / 8))
}

/**
 * 
 * @param x 
 * @param y 
 * @param w 
 * @param h 
 * @returns tile logo abaixo um pouco a esquerda do centro
 */
export function getTileDown(x: number, y: number, w: number, h: number) {
    return mget(Math.floor((x + w / 4) / 8), Math.floor((y + (h + 1)) / 8))
}

/**
 * 
 * @param x 
 * @param y 
 * @param _w 
 * @param _h 
 * @returns centro do tile logo a esquerda 
 */
export function getTileLeft(x: number, y: number, _w: number, h: number) {
    return mget(Math.floor((x - 1) / 8), Math.floor((y + h / 2) / 8))
}

/**
 * 
 * @param x 
 * @param y 
 * @param w 
 * @param h 
 * @returns centro do tile logo a direita
 */
export function getTileRight(x: number, y: number, w: number, h: number) {
    return mget(Math.floor((x + (w + 1)) / 8), Math.floor((y + h / 2) / 8))
}

/**
 * 216 112
 * 27 21 w7 h8
 * @param x 
 * @param y 
 * @param w 
 * @param h 
 * @returns centro do tile logo acima
 */
export function aimUp(x: number, y: number, w: number, h: number) {
    return {
        x: Math.floor((x + w / 2) / 8),
        y: Math.floor((y - h / 2) / 8)
    }
}

export function aimDown(x: number, y: number, w: number, h: number) {
    return {
        x: Math.floor((x + w / 2) / 8),
        y: Math.floor((y + h * 1.5) / 8)
    }
}

export function aimRight(x: number, y: number, w: number, h: number) {
    return {
        x: Math.floor((x + w * 1.5) / 8),
        y: Math.floor((y + h / 2) / 8)
    }
}

export function aimleft(x: number, y: number, w: number, h: number) {
    return {
        x: Math.floor((x - w / 2) / 8),
        y: Math.floor((y + h / 2) / 8)
    }
}


export function printTooltip(text: string, x: number = 0, y: number = 0, scale: number = 1, smallFont: boolean = false) {
    const width = print(text, 1000, -1000, 1, false, scale, smallFont)
    const height = 6
    //margin
    rect(x, y+2, width + 3, height + 3, 4)
    //black box
    rect(x + 1, y + 3, width + 1, height + 1, 0)
    print(text,x+2,y+4,4,false,scale,smallFont)

}
