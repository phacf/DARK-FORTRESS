import { IPositionComponent } from '@interfaces/Components'

export class PositionComponent implements IPositionComponent {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}