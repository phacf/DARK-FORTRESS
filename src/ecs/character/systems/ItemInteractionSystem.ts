import { MapConfig } from "@constants/map/map";
import { ItemDefinitions } from "@constants/sprites/sprites";
import { PositionComponent } from "@ecs/character/components/position";
import { SizeComponent } from "@ecs/character/components/size";
import { Entity } from "@ecs/models/entity";
import { InventoryComponent } from "../../inventory/components/inventoryComponent";
import { ItemComponent } from "../../inventory/components/ItemComponent";

export function ItemInteractionSystem(entity: Entity) {
    const pos = entity.get(PositionComponent);
    const size = entity.get(SizeComponent);
    const inventory = entity.get(InventoryComponent);

    const tileX = Math.floor((pos!.x + size!.width / 2) / 8);
    const tileY = Math.floor((pos!.y + size!.height / 2) / 8);
    const currentTile = mget(tileX, tileY);
    const item = ItemDefinitions.find(item => item.tile === currentTile)

    if (MapConfig.itens.includes(currentTile) && item) {
        mset(tileX, tileY, MapConfig.path[0]);
        inventory?.items.push(new ItemComponent(item.label, item.sprite, item.tile, item.type))
        sfx(0, 'E-4', 20, 0);
    }
}
