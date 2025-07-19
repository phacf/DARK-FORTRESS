import { Direction, DirectionType, } from "@constants/sprites/entities";
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
    private receivedHits = 0; //4 hits = life--

    private flip = 0;
    private duration = 8; //frames
    private direction: DirectionType = Direction.down
    private spriteIdx = 0;

    private sprites: number[] = [
        256, 257,//down
        258, 259, 260,//left
        261, 262//up
    ];

    constructor() {
        this.inputController = new InputController();
        this.gotoStart()
    }

    private gotoStart() {
        const pos = goToTile(2, 14)
        this.x = pos.x
        this.y = pos.y
    }

    update(): void {
        const { isUp, isDown, isLeft, isRight } = this.inputController;
        this.dx = 0;
        this.dy = 0;


        if (isUp()) {
            this.dy = -1
            this.direction = Direction.up
            this.spriteIdx = 6

        }
        if (isDown()) {
            this.dy = 1
            this.direction = Direction.down
            this.spriteIdx = 1
        }
        if (isLeft()) {
            this.dx = -1
            this.direction = Direction.left
            this.spriteIdx = 3
            this.flip = 1
        }
        if (isRight()) {
            this.dx = 1
            this.direction = Direction.right
            this.spriteIdx = 3
            this.flip = 0
        }

        this.x += this.speed * this.dx
        this.y += this.speed * this.dy

        if(this.dx === 0 && this.dy === 0){
            this.checkSpriteDirection()
        }

    }

    private checkSpriteDirection(){
        if(this.direction === Direction.up){
            this.spriteIdx = 5
        }
        if(this.direction === Direction.down){
            this.spriteIdx = 0
        }
        if(this.direction === Direction.left){
            this.spriteIdx = 2
        }
        if(this.direction === Direction.right){
            this.spriteIdx = 2
        }
    }

    draw(): void {
        const sprt = this.sprites[this.spriteIdx]
        spr(sprt, this.x, this.y, 0, 1, this.flip, 0)
    }
}