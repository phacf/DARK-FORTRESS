import { InputSystem } from "../../character/systems/input";
import { DoorSystem } from "../../character/systems/door";
import { MovementSystem } from "../../character/systems/movement";
import { InputController } from "controllers/inputController";
import { GameStateComponent } from "@ecs/character/components/gameState";
import { PlayerDrawSystem } from "@ecs/character/systems/draw";
import { ItemInteractionSystem } from "@ecs/character/systems/ItemInteractionSystem";
import { InventoryDrawSystem } from "@ecs/inventory/systems/draw";
import { InventoryInputSystem } from "@ecs/inventory/systems/input";
import { Entity } from "@ecs/models/entity";

const input = new InputController()

export function GameSystem(player: Entity) {
    const game = player.get(GameStateComponent)
    if (!game) return

    if (game.state === 'inGame') {
        InputSystem(player, input)
        DoorSystem(player, input)
        MovementSystem(player)
        ItemInteractionSystem(player)
    }

    InventoryInputSystem(player, input)

    map()
    PlayerDrawSystem(player)
    InventoryDrawSystem(player)

}