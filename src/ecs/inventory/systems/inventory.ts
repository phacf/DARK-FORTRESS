import { MapConfig } from "@constants/map/map";
import { PositionComponent } from "@ecs/character/components/position";
import { Entity } from "@ecs/models/entity";
import { detectTile, onTile } from "utils/screen";

export function InventorySystem(entity: Entity){
    const pos = entity.get(PositionComponent)

    const isItem = detectTile(pos!.x, pos!.y, MapConfig.itens)

    const tile = onTile(pos!.x, pos!.y)

    if(isItem){
        mset(Math.floor(pos!.x/8), Math.floor(pos!.x/8), MapConfig.path[0])
    }
    
}