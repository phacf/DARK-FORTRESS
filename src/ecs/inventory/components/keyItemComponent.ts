import { IItemComponent } from "@interfaces/itemComponent";

export class KeyItemComponent implements IItemComponent {
    amount = 1;
    isConsumable = false;
    label = 'golden key';
    type = 'key';
}