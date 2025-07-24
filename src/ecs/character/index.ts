import { CharacterSprites, Direction } from "@constants/sprites/sprites";
import { Entity } from "@ecs/models/entity";
import { PositionComponent } from "./components/position";
import { VelocityComponent } from "./components/velocity";
import { goToTile } from "utils/movement";
import { SizeComponent } from "./components/size";
import { SpriteComponent } from "./components/sprite";
import { DirectionComponent } from "./components/direction";
import { CombatComponent } from "./components/combat";
import { SolidCollisionComponent } from "./components/solids";
import { solidTiles } from "@constants/map/map";
import { DoorInteractorComponent } from "./components/door";
import { PlayerControlledComponent } from "./components/player";
import { GameStateComponent } from "./components/gameState";
import { GameState } from "@constants/state/state";
import { InventoryComponent } from "@ecs/inventory/components/inventoryComponent";

export function createPlayerEntity(): Entity {
    const entity = new Entity();
    entity
        .add(PositionComponent, { ...goToTile(6, 13) })
        .add(VelocityComponent, { dx: 0, dy: 0, speed: 1 })
        .add(SizeComponent, { width: 7, height: 8 })
        .add(SpriteComponent, {
            spriteIdx: 0,
            flip: 0,
            sprites: CharacterSprites,
            duration: 8,
            frameCounter: 0,
        })
        .add(DirectionComponent, { direction: Direction.down })
        .add(CombatComponent, { life: 1, receivedHits: 0, isAttacking: false })
        .add(SolidCollisionComponent, {
            solidTiles: solidTiles,
        })
        .add(PlayerControlledComponent, {})
        .add(DoorInteractorComponent, {})
        .add(GameStateComponent, { state: GameState.IN_GAME })
        .add(InventoryComponent, {
            items: [],
            limit: 30,
            sx: 1,
            sy: 1
        });
    return entity;
}