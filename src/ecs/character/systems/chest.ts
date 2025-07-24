import { Entity } from "@ecs/models/entity";
import { aimDown, aimleft, aimRight, aimUp, getTileDown, getTileLeft, getTileRight, getTileUP, onTile } from "utils/screen";
import { PositionComponent } from "../components/position";
import { SizeComponent } from "../components/size";
import { DirectionComponent } from "../components/direction";

export function ChestInteraction(entity: Entity) {
    const pos = entity.get(PositionComponent);
    const size = entity.get(SizeComponent);
    const dir = entity.get(DirectionComponent);

    
    
}