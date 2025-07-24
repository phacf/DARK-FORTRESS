import { IItemComponent } from "@interfaces/itemComponent";

export class ItemComponent implements IItemComponent {
   isConsumable?: boolean;
   label: string;
   sprite: number;
   tile: number;
   type: string;
   constructor(label = '', sprite = 0, tile = 0, type = '', isConsumable = false){
      this.isConsumable = isConsumable;
      this.label = label;
      this.sprite = sprite;
      this.tile = tile;
      this.type = type;
   }
}