/**
 * character 256 -562
 * enemy 272 - 285
 * hit 263
 * life 264 - 268
 */
export const CharacterSprites: number[] = [
    256, 257, // down
    258, 259, 260, // left/right
    261, 262, // up
];

export const ItemSprites = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62]

export const Direction = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
} as const;

export type DirectionType = typeof Direction[keyof typeof Direction];