import { ItemSprites } from "@constants/sprites/sprites";
import { GameStateComponent } from "@ecs/character/components/gameState";
import { Entity } from "@ecs/models/entity";

export function InventoryDrawSystem(entity: Entity) {
    const game = entity.get(GameStateComponent)
    if (game?.state === "openInventory") {
        const margin = 2
        const distance = Math.floor(margin / 2)
        const width = 10
        const height = 3
        const x = 1
        const y = 1
        let itemX = x
        let itemY = y

        //outside
        rect((x * 8) - distance, (y * 8) - distance, (width * 8) + margin, (height * 8) + margin, 4)
        //inside    
        rect(x * 8, y * 8, width * 8, height * 8, 0)

        for (let i = 0; i < ItemSprites.length; i++) {
            const item = ItemSprites[i]

            if (itemX > width) {
                itemX = x
                itemY ++
            } 

            if (itemY > height) {
                continue
            }

            spr(item, itemX*8, itemY*8, 0, 1, 0, 0)
            //selection
            spr(269, 8, 8, 0, 1, 0, 0)
            itemX++ 

        }


    }
}