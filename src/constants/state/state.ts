export const GameState = {
    START: 'start',
    IN_GAME: 'inGame',
    GAME_OVER: 'gameOver',
    OPEN_INVENTORY:'openInventory'
} as const

export type GameStateType = typeof GameState[keyof typeof GameState]