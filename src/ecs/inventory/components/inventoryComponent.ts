import { IItemComponent } from "@interfaces/itemComponent";

export class InventoryComponent {
    items: IItemComponent[] = [];
    limit = 30;
    sx = 1;
    sy = 1;
}