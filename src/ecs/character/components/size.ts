import { ISizeComponent } from '@interfaces/Components'

export class SizeComponent implements ISizeComponent {
    height: number;
    width: number;
    constructor(width = 0, height = 0) {
        this.height = height;
        this.width = width;
    }
}