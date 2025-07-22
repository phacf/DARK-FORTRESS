import { Entity } from "ecs/models/entity";
import { PositionComponent } from "../components/position";
import { VelocityComponent } from "../components/velocity";
import { SizeComponent } from "../components/size";
import { SolidCollisionComponent } from "../components/solids";
import { isColidingTile } from "utils/colision";

export function MovementSystem(entity: Entity) {
  const pos = entity.get(PositionComponent);
  const vel = entity.get(VelocityComponent);
  const size = entity.get(SizeComponent);
  const col = entity.get(SolidCollisionComponent);

  pos!.x += vel!.dx * vel!.speed;
  if (isColidingTile(pos!.x, pos!.y, size!.width - 2, size!.height - 2, col!.solidTiles)) {
    pos!.x -= vel!.dx * vel!.speed;
  }

  pos!.y += vel!.dy * vel!.speed;
  if (isColidingTile(pos!.x, pos!.y, size!.width - 2, size!.height - 2, col!.solidTiles)) {
    pos!.y -= vel!.dy * vel!.speed;
  }
}