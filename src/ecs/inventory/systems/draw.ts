import { GameStateComponent } from "@ecs/character/components/gameState"
import { Entity } from "@ecs/models/entity"
import { InventoryComponent } from "../components/inventoryComponent"
import { printTooltip } from "utils/screen"

export function InventoryDrawSystem(entity: Entity) {
    const game = entity.get(GameStateComponent)
    const inventory = entity.get(InventoryComponent)
    if (!game && !inventory) return

    if (game.state === "openInventory") {
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

        for (let i = 0; i < inventory.items.length; i++) {
            const item = inventory.items[i];

            if (itemX > width) {
                itemX = x;
                itemY++;
            }

            if (itemY > height) {
                continue;
            }

            spr(item.sprite, itemX * 8, itemY * 8, 0, 1, 0, 0);
            if (item && inventory?.sx * 8 === itemX * 8 && inventory?.sy * 8 === itemY * 8) {
                printTooltip(item.label, 1 * 8, 4 * 8, 1, true)
            }
            itemX++;
        }

        // draw selection cursor AFTER items
        spr(269, inventory.sx * 8, inventory.sy * 8, 0, 1, 0, 0);
    }
}
