import { GameSystem } from "@ecs/game/systems/game";

function TIC() {
    cls()
    GameSystem()
}

(globalThis as any).TIC = TIC;