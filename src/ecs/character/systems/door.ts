import { Entity } from "@ecs/models/entity";
import { InputController } from "controllers/inputController";
import { PositionComponent } from "../components/position";
import { SizeComponent } from "../components/size";
import { DirectionComponent } from "../components/direction";
import { aimDown, aimleft, aimRight, aimUp, getTileDown, getTileLeft, getTileRight, getTileUP, onTile } from "utils/screen";
import { Direction } from "@constants/sprites/sprites";
import { MapConfig } from "@constants/map/map";
import { goToTile } from "utils/movement";
import { InventoryComponent } from "@ecs/inventory/components/inventoryComponent";

export function DoorSystem(entity: Entity, input: InputController) {
    const pos = entity.get(PositionComponent);
    const size = entity.get(SizeComponent);
    const dir = entity.get(DirectionComponent);
    const inv = entity.get(InventoryComponent)

    //CROSS DOOR
    const tile = onTile(pos!.x, pos!.y)
    const offset = 16


    if (dir?.direction === Direction.up) {
        const tileCross = onTile(pos!.x, pos!.y - offset)
        if (
            tile === MapConfig.OPEN_DOOR_TOP &&
            tileCross === MapConfig.OPEN_DOOR_BOTTOM
        ) {
            const { x, y } = aimUp(pos!.x, pos!.y, size!.width, size!.height)
            const next = goToTile(x, y - 1.6);
            pos!.x = next.x
            pos!.y = next.y
        }
    }

    if (dir?.direction === Direction.down) {
        const tileCross = onTile(pos!.x, pos!.y + offset)
        if (
            tile === MapConfig.OPEN_DOOR_BOTTOM &&
            tileCross === MapConfig.OPEN_DOOR_TOP
        ) {
            const { x, y } = aimDown(pos!.x, pos!.y, size!.width, size!.height)
            const next = goToTile(x, y + 1);
            pos!.x = next.x
            pos!.y = next.y
        }

    }

    if (input.isA() && inv?.items.some(item => item.type === 'key')) {

        const offset = 16
        if (dir?.direction === Direction.up) {
            const tile = getTileUP(pos!.x, pos!.y, size!.width, size!.height)
            const tileCross = getTileUP(pos!.x, pos!.y - offset, size!.width, size!.height)
            const { x, y } = aimUp(pos!.x, pos!.y, size!.width, size!.height)
            if (
                MapConfig.closedDoor.includes(tile) &&
                MapConfig.closedDoor.includes(tileCross)
            ) {
                mset(x, y, MapConfig.OPEN_DOOR_TOP);
                mset(x, y - 2, MapConfig.OPEN_DOOR_BOTTOM);
                removeKeyFromInventory(inv)
            } else if (MapConfig.closedDoor.includes(tile)) {
                mset(x, y, MapConfig.OPEN_DOOR_TOP);
                removeKeyFromInventory(inv)
            }
        }

        if (dir?.direction === Direction.down) {
            const tile = getTileDown(pos!.x, pos!.y, size!.width, size!.height)
            const tileCross = getTileDown(pos!.x, pos!.y + offset, size!.width, size!.height)
            const { x, y } = aimDown(pos!.x, pos!.y, size!.width, size!.height)
            if (
                MapConfig.closedDoor.includes(tile) &&
                MapConfig.closedDoor.includes(tileCross)
            ) {
                mset(x, y, MapConfig.OPEN_DOOR_BOTTOM);
                mset(x, y + 2, MapConfig.OPEN_DOOR_TOP);
                removeKeyFromInventory(inv)

            } else if (MapConfig.closedDoor.includes(tile)) {
                mset(x, y, MapConfig.OPEN_DOOR_BOTTOM);
                removeKeyFromInventory(inv)

            }
        }

        if (dir?.direction === Direction.right) {
            const tile = getTileRight(pos!.x, pos!.y, size!.width, size!.height)
            const tileCross = getTileRight(pos!.x + (offset / 2), pos!.y, size!.width, size!.height)
            const { x, y } = aimRight(pos!.x, pos!.y, size!.width, size!.height)
            if (
                MapConfig.closedDoor.includes(tile) &&
                MapConfig.closedDoor.includes(tileCross)
            ) {
                mset(x, y, MapConfig.OPEN_DOOR_RIGHT);
                mset(x + 1, y, MapConfig.OPEN_DOOR_LEFT);
                removeKeyFromInventory(inv)

            } else if (MapConfig.closedDoor.includes(tile)) {
                mset(x, y, MapConfig.OPEN_DOOR_RIGHT);
                removeKeyFromInventory(inv)

            }
        }

        if (dir?.direction === Direction.left) {
            const tile = getTileLeft(pos!.x, pos!.y, size!.width, size!.height)
            const tileCross = getTileLeft(pos!.x - offset / 2, pos!.y, size!.width, size!.height)
            const { x, y } = aimleft(pos!.x, pos!.y, size!.width, size!.height)
            if (
                MapConfig.closedDoor.includes(tile) &&
                MapConfig.closedDoor.includes(tileCross)
            ) {
                mset(x, y, MapConfig.OPEN_DOOR_LEFT);
                mset(x - 1, y, MapConfig.OPEN_DOOR_RIGHT);
                removeKeyFromInventory(inv)

            } else if (MapConfig.closedDoor.includes(tile)) {
                mset(x, y, MapConfig.OPEN_DOOR_LEFT);
                removeKeyFromInventory(inv)

            }
        }

    }

}


function removeKeyFromInventory(inv: InventoryComponent) {
    const index = inv.items.findIndex(item => item.type === 'key');
    if (index !== -1) {
        inv.items.splice(index, 1);
    }
    sfx(1, 'B-3', 6, 0);
}
