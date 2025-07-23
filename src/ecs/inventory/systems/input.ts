import { GameStateComponent } from "@ecs/character/components/gameState";
import { Entity } from "@ecs/models/entity";
import { InputController } from "controllers/inputController";

export function InventoryInputSystem(entity: Entity, input: InputController) { 
    const game = entity.get(GameStateComponent)
    
    if(input.isB()){
        if(game?.state === "inGame"){
            game.state = "openInventory"
        }else {
            game!.state = "inGame"
        }
    }
}