import { GameStateComponent } from "@ecs/character/components/gameState";
import { Entity } from "@ecs/models/entity";
import { InputController } from "controllers/inputController";
import { InventoryComponent } from "../components/inventoryComponent";

let inventoryToggleLock = false; // fora da função, no escopo do módulo

export function InventoryInputSystem(entity: Entity, input: InputController) {
    const game = entity.get(GameStateComponent)
    const inventory = entity.get(InventoryComponent)

    if (input.isB()) {
        if (!inventoryToggleLock) {
            game!.state = (game!.state === "inGame") ? openInventory() : "inGame"
            inventoryToggleLock = true

        }
    } else {
        inventoryToggleLock = false
    }
    if (game.state === 'inGame') {
        inventory.sx = 1
        inventory.sy = 1
    }

    // Apenas processa navegação se o inventário estiver aberto
    if (game.state === "openInventory") {

        if (input.pressUp()) {
            inventory.sy--
            if (inventory.sy < 1) inventory.sy = 3
        }
        if (input.pressDown()) {
            inventory.sy++
            if (inventory.sy > 3) inventory.sy = 1
        }
        if (input.pressLeft()) {
            inventory.sx--
            if (inventory.sx < 1) inventory.sx = 10
        }
        if (input.pressRight()) {
            inventory.sx++
            if (inventory.sx > 10) inventory.sx = 1
        }
    }
}

function openInventory() {
    sfx(2, 'D1', 8, 0);
    return "openInventory"
}