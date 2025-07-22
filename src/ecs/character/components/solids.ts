import { ISolidCollisionComponent } from "@interfaces/Components";

export class SolidCollisionComponent implements ISolidCollisionComponent {
    solidTiles: number[];
    constructor(solidTiles: number[] = []) {
        this.solidTiles = solidTiles;
    }
}