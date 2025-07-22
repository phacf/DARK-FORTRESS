import { ISpriteComponent } from '@interfaces/Components'

export class SpriteComponent implements ISpriteComponent {
    duration: number;
    flip: number;
    frameCounter: number;
    spriteIdx: number;
    sprites: number[];
    constructor(duration = 0, flip = 0, frameCounter = 0, spriteIdx = 0, sprites = []) {
        this.duration = duration;
        this.flip = flip;
        this.frameCounter = frameCounter;
        this.spriteIdx = spriteIdx;
        this.sprites = sprites;
    }
}