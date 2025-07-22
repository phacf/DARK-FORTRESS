import { ICombatComponent } from "@interfaces/Components";

export class CombatComponent implements ICombatComponent {
    isAttacking: boolean;
    life: number;
    receivedHits: number;
    constructor(isAttacking = false, life = 1, receivedHits = 0){
        this.isAttacking = isAttacking;
        this.life = life;
        this.receivedHits = receivedHits;
    }
}