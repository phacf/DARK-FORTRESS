import { Direction, DirectionType } from "@constants/sprites/entities";
import { InputController } from "controllers/inputController";
import { ICharacter } from "interfaces/ICharacter";
import { goToTile } from "utils/movement";

export class Character implements ICharacter {
    private inputController: InputController;

    private x = 0;
    private y = 0;
    private w = 7;
    private h = 8;
    private dx = 0;
    private dy = 0;
    private speed = 1;

    private isAttacking = false;
    private life = 1;
    private receivedHits = 0; // 4 hits = life--

    private flip = 0;
    private duration = 8; // frames por sprite
    private frameCounter = 0; // Contador para animação
    private direction: DirectionType = Direction.down;
    private spriteIdx = 0;

    private sprites: number[] = [
        256,257, // down 0 1
        258, 259, 260, // left/right 2 3 4
        261,262, // up 5 6
    ];

    constructor() {
        this.inputController = new InputController();
        this.gotoStart();
    }

    private gotoStart() {
        const pos = goToTile(2, 14);
        this.x = pos.x;
        this.y = pos.y;
    }

    update(): void {
        const { isUp, isDown, isLeft, isRight } = this.inputController;
        this.dx = 0;
        this.dy = 0;

        // Incrementa o contador de frames para animação
        this.frameCounter = (this.frameCounter + 1) % (this.duration * 2); // Alterna entre 2 estados

        // Define direção, sprite e flip com base na entrada
        if (isUp()) {
            this.dy = -1;
            this.direction = Direction.up;
            this.spriteIdx = 6; // Sprite 262
            this.flip = this.frameCounter < this.duration ? 0 : 1; // Alterna flip para animação
        } else if (isDown()) {
            this.dy = 1;
            this.direction = Direction.down;
            this.spriteIdx = 1; // Sprite 257
            this.flip = this.frameCounter < this.duration ? 0 : 1; // Alterna flip para animação
        } else if (isLeft()) {
            this.dx = -1;
            this.direction = Direction.left;
            this.spriteIdx = this.frameCounter < this.duration ? 3 : 4; // Alterna entre 258 e 259
            this.flip = 1;
        } else if (isRight()) {
            this.dx = 1;
            this.direction = Direction.right;
            this.spriteIdx = this.frameCounter < this.duration ? 3 : 4; // Alterna entre 258 e 259
            this.flip = 0;
        } else {
            // Personagem parado, seleciona sprite inicial
            this.checkSpriteDirection();
            this.frameCounter = 0; // Reseta animação quando parado
        }

        // Atualiza posição
        this.x += this.speed * this.dx;
        this.y += this.speed * this.dy;
    }

    private checkSpriteDirection() {
        // Define sprite inicial para cada direção quando parado
        if (this.direction === Direction.up) {
            this.spriteIdx = 5; // Sprite 262
            this.flip = 0; // Sem flip quando parado
        } else if (this.direction === Direction.down) {
            this.spriteIdx = 0; // Sprite 256
            this.flip = 0; // Sem flip quando parado
        } else if (this.direction === Direction.left) {
            this.spriteIdx = 2; // Sprite 258
            this.flip = 1;
        } else if (this.direction === Direction.right) {
            this.spriteIdx = 2; // Sprite 258
            this.flip = 0;
        }
    }

    draw(): void {
        const sprt = this.sprites[this.spriteIdx];
        spr(sprt, this.x, this.y, 0, 1, this.flip, 0);
    }
}