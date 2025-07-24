import { GameStateType } from "@constants/state/state";
import { IGamestateComponent } from "@interfaces/GameStateComponent";

export class GameStateComponent implements IGamestateComponent {
    state: GameStateType;
    constructor(state: GameStateType){
        this.state = state;
    }
}