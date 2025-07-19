/**
 * movimentos suaves
 * @param a ponto de partida
 * @param b ponto de destino
 * @param t tempo ou fator de interpolação ex: velocidade
 * @returns 
 */
export function LERP(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * 
 * @param tilex 
 * @param tiley 
 * @returns desired Tile in pixel
 */
export function goToTile(tilex: number, tiley: number) {
  return { x: tilex * 8, y: tiley * 8 }
}

/*
 Normaliza a velocidade na diagonal
    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071
      dy *= 0.7071
    }
    atualiza com a velocidade
    this.x += dx * this.speed
    this.y += dy * this.speed
*/