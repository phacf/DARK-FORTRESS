import { Entity } from "@ecs/models/entity";
import { PositionComponent } from "../components/position";
import { SpriteComponent } from "../components/sprite";

export function PlayerDrawSystem(entity: Entity) {
    const pos = entity.get(PositionComponent);
    const sprite = entity.get(SpriteComponent);
    spr(sprite!.sprites[sprite!.spriteIdx], pos!.x, pos!.y, 0, 1, sprite!.flip, 0);
}