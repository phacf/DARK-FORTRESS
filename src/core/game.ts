import { Character } from "@entities/character"

export class Game {
    player = new Character()

    update(){}

    draw(){
        map()
        this.player.update()
        this.player.draw()
    }
}