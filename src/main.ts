import { createPlayerEntity } from "@ecs/character/index";
import { GameSystem } from "@ecs/game/systems/game";
const player = createPlayerEntity()

function TIC() {
    cls()
    GameSystem(player)
}

(globalThis as any).TIC = TIC;