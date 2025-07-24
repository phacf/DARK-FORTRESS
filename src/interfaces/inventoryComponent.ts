import { IItemComponent } from "./itemComponent";

export interface IInventoryComponent {
    items: IItemComponent[]  
    limit: number; 
    sx: number;
    sy: number;
}