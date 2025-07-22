import { Direction, DirectionType } from "@constants/sprites/sprites";
import { IDirectionComponent } from "@interfaces/Components";

export class DirectionComponent implements IDirectionComponent {
    direction: DirectionType;
    constructor(direction: DirectionType = Direction.down) {
        this.direction = direction
    }
}