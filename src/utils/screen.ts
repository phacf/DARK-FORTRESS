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


