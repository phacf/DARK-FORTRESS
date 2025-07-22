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

export const Direction = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
} as const;

export type DirectionType = typeof Direction[keyof typeof Direction];