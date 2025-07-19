import { detectTile } from "./screen"

/**
 * 
 * @param px playerx
 * @param py playery
 * @param ph playerh
 * @param pw playerw
 * @param tx targetx
 * @param ty targety
 * @param th targeth
 * @param tw targetw
 * @returns boolean
 */
export function checkCollision(
    px: number,
    py: number,
    ph: number,
    pw: number,
    tx: number,
    ty: number,
    th: number,
    tw: number
): boolean {
    return (
        px < tx + tw &&
        px + pw > tx &&
        py < ty + th &&
        py + ph > ty
    )
}

/**
 * 
 * @param x 
 * @param y 
 * @param w 
 * @param h 
 * @param set 
 * @returns boolean
 */
export function isColidingTile (x: number, y: number, w: number, h: number, set: readonly number[]): boolean {
  return (
    detectTile(x, y, set) || // canto superior esquerdo
    detectTile(x + w - 1, y, set) || // superior direito
    detectTile(x, y + h - 1, set) || // inferior esquerdo
    detectTile(x + w - 1, y + h - 1, set) // inferior direito
  )
}