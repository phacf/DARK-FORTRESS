import { IItemComponent } from "./itemComponent";

export interface IInventoryComponent {
    items: IItemComponent[]  
    limit: number; 
    selectX: number;
    selectY: number;
}