import { MapConfig } from "@constants/map/map";
import { Direction, DirectionType } from "@constants/sprites/entities";
import { InputController } from "controllers/inputController";
import { ICharacter } from "interfaces/ICharacter";
import { isColidingTile } from "utils/colision";
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
        256, 257, // down 0 1
        258, 259, 260, // left/right 2 3 4
        261, 262, // up 5 6
    ];

    private IntransponibleTiles = [...MapConfig.walls, ...MapConfig.closedDoor]

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
            this.verticalMove(-1, Direction.up, 6)

        } else if (isDown()) {
            this.verticalMove(1, Direction.down, 1)

        } else if (isLeft()) {
            this.horizontalMove(-1, Direction.left, 1)

        } else if (isRight()) {
            this.horizontalMove(1, Direction.left, 0)

        } else {
            // Personagem parado, seleciona sprite inicial
            this.checkSpriteDirection();
            this.frameCounter = 0; // Reseta animação quando parado
        }

        // Atualiza posição
        this.x += this.dx * this.speed;
        //checa e reverte colisão
        if (this.isColidingSolid(this.IntransponibleTiles)) { //-2 facilita passar por portas
            this.x -= this.dx * this.speed
        }

        this.y += this.dy * this.speed;
        //checa e reverte colisão
        if (this.isColidingSolid(this.IntransponibleTiles)) { //-2 facilita passar por portas
            this.y -= this.dy * this.speed
        }
    }

    private makeAction() {
        const {isA} = this.inputController;

        if(isA()){
            this.openDoor()
        }
    }

    private openDoor() {
        //detectClosedDoor
        if (this.isColidingSolid(MapConfig.closedDoor)) {
            if (this.direction === Direction.up) {
                print(String(mget(this.x, this.y + this.h)))

                // mset(this.x/8+1,this.y/8,37)
            }
            if (this.direction === Direction.up) { }
            if (this.direction === Direction.up) { }
            if (this.direction === Direction.up) { }
        }
    }

    private isColidingSolid(set: readonly number[]): boolean {
        return isColidingTile(this.x, this.y, this.w - 2, this.h - 2, set)
    }

    private verticalMove(dy: number, direction: DirectionType, sprIndex: number) {
        this.dy = dy
        this.direction = direction;
        this.spriteIdx = sprIndex; // Sprite 262
        this.flip = this.frameCounter < this.duration ? 0 : 1; // Alterna flip para animação
    }

    private horizontalMove(dx: number, direction: DirectionType, flip: number) {
        this.dx = dx;
        this.direction = direction;
        this.spriteIdx = this.frameCounter < this.duration ? 3 : 4; // Alterna entre 258 e 259
        this.flip = flip;
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