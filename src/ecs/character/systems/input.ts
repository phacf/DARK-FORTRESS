import { Entity } from "@ecs/models/entity";
import { InputController } from "controllers/inputController";
import { VelocityComponent } from "../components/velocity";
import { DirectionComponent } from "../components/direction";
import { SpriteComponent } from "../components/sprite";
import { Direction } from "@constants/sprites/sprites";

export function InputSystem(entity: Entity, input: InputController) {
    const vel = entity.get(VelocityComponent);
    const dir = entity.get(DirectionComponent);
    const sprite = entity.get(SpriteComponent);

    vel!.dx = 0;
    vel!!.dy = 0;
    sprite!.frameCounter = (sprite!.frameCounter + 1) % (sprite!.duration * 2);

    if (input.isUp()) {
        vel!.dy = -1;
        dir!.direction = Direction.up;
        sprite!.spriteIdx = 6;
        sprite!.flip = sprite!.frameCounter < sprite!.duration ? 0 : 1;
    } else if (input.isDown()) {
        vel!.dy = 1;
        dir!.direction = Direction.down;
        sprite!.spriteIdx = 1;
        sprite!.flip = sprite!.frameCounter < sprite!.duration ? 0 : 1;
    } else if (input.isLeft()) {
        vel!.dx = -1;
        dir!.direction = Direction.left;
        sprite!.spriteIdx = sprite!.frameCounter < sprite!.duration ? 3 : 4;
        sprite!.flip = 1;
    } else if (input.isRight()) {
        vel!.dx = 1;
        dir!.direction = Direction.right;
        sprite!.spriteIdx = sprite!.frameCounter < sprite!.duration ? 3 : 4;
        sprite!.flip = 0;
    } else {
        if (dir!.direction === Direction.up) sprite!.spriteIdx = 5;
        else if (dir!.direction === Direction.down) sprite!.spriteIdx = 0;
        else sprite!.spriteIdx = 2;
        sprite!.frameCounter = 0;
    }
}