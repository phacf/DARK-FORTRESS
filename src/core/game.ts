// import { Character } from "@ecs/character/character"
import { createPlayerEntity } from "@ecs/character/index"
import { DoorSystem } from "@ecs/character/systems/door"
import { DrawSystem } from "@ecs/character/systems/draw"
import { InputSystem } from "@ecs/character/systems/input"
import { MovementSystem } from "@ecs/character/systems/movement"
import { InputController } from "controllers/inputController"

export class Game {
    // player = new Character()
    player = createPlayerEntity()
    input = new InputController()

    update(){
        InputSystem(this.player, this.input)
        DoorSystem(this.player,this.input)
        MovementSystem(this.player)
    }

    draw(){
        map()
        DrawSystem(this.player)
    }
}