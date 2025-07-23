import { InputSystem } from "../../character/systems/input";
import { DoorSystem } from "../../character/systems/door";
import { MovementSystem } from "../../character/systems/movement";
import { createPlayerEntity } from "@ecs/character/index";
import { InputController } from "controllers/inputController";
import { GameStateComponent } from "@ecs/character/components/gameState";
import { PlayerDrawSystem } from "@ecs/character/systems/draw";
import { InventorySystem } from "@ecs/inventory/systems/inventory";
import { InventoryDrawSystem } from "@ecs/inventory/systems/draw";
import { InventoryInputSystem } from "@ecs/inventory/systems/input";

const player = createPlayerEntity()
const input = new InputController()
const game = player.get(GameStateComponent)

export function GameSystem() {

    if (game?.state === 'inGame') {
        InputSystem(player, input)
        DoorSystem(player, input)
        MovementSystem(player)
        InventorySystem(player)
    }
    InventoryInputSystem(player, input)

    map()
    PlayerDrawSystem(player)
    InventoryDrawSystem(player)

}