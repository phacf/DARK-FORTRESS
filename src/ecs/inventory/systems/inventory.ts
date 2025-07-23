import { MapConfig } from "@constants/map/map";
import { PositionComponent } from "@ecs/character/components/position";
import { SizeComponent } from "@ecs/character/components/size";
import { Entity } from "@ecs/models/entity";

export function InventorySystem(entity: Entity) {
    const pos = entity.get(PositionComponent);
    const size = entity.get(SizeComponent);

    const tileX = Math.floor((pos!.x + size!.width / 2) / 8);
    const tileY = Math.floor((pos!.y + size!.height / 2) / 8);
    const currentTile = mget(tileX, tileY);

    if (MapConfig.itens.includes(currentTile)) {
        mset(tileX, tileY, MapConfig.path[0]);
        sfx(0, 'E-4', 20, 0);
    }
}
