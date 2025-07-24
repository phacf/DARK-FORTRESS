export const Direction = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
} as const;

export type DirectionType = typeof Direction[keyof typeof Direction];

export const CharacterSprites: number[] = [
    256, 257, // down
    258, 259, 260, // left/right
    261, 262, // up
];
//            c         d     e  m  p  c1 c2 a ca b   e1 e2
//    itens: [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62],

export const ItemSprites = [320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331]

export const ItemDefinitions = [
    {
        tile: 48,
        sprite: 320,
        label: 'key',
        type: 'key'
    },
    {
        tile: 51,
        sprite: 321,
        label: 'gold',
        type: 'gold'

    },
    {
        tile: 53,
        sprite: 322,
        label: 'sword',
        type: 'weapon'

    },
    {
        tile: 54,
        sprite: 323,
        label: 'axe',
        type: 'weapon'

    },
    {
        tile: 55,
        sprite: 324,
        label: 'potion',
        type: 'health'

    },
    {
        tile: 56,
        sprite: 325,
        label: 'helmet',
        type: 'armor'

    },
    {
        tile: 57,
        sprite: 326,
        label: 'heavy helmet',
        type: 'armor'

    },
    {
        tile: 58,
        sprite: 327,
        label: 'armor',
        type: 'armor'

    },
    {
        tile: 59,
        sprite: 328,
        label: 'pants',
        type: 'armor'

    },
    {
        tile: 60,
        sprite: 329,
        label: 'boots',
        type: 'armor'

    },
    {
        tile: 61,
        sprite: 330,
        label: 'wood shield',
        type: 'armor'

    },
    {
        tile: 62,
        sprite: 331,
        label: 'iron shield',
        type: 'armor'

    },
]

