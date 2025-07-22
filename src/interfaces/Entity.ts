import { ICombatComponent, IDirectionComponent, IDoorInteractorComponent, IPlayerControlledComponent, IPositionComponent, ISizeComponent, ISolidCollisionComponent, ISpriteComponent, IVelocityComponent } from "./Components";

export interface IEntity {
    id: number;
    components: Map<ComponentClass, ComponentRegistry[keyof ComponentRegistry]> | Partial<{
    position: IPositionComponent;
    velocity: IVelocityComponent;
    size: ISizeComponent;
    sprite: ISpriteComponent;
    direction: IDirectionComponent;
    combat: ICombatComponent;
    playerControlled: IPlayerControlledComponent;
    solidCollision: ISolidCollisionComponent;
    doorInteractor: IDoorInteractorComponent;
  }>;
    tags?: string[];
}

export type ComponentRegistry = {
  PositionComponent: IPositionComponent;
  VelocityComponent: IVelocityComponent;
  SizeComponent: ISizeComponent;
  SpriteComponent: ISpriteComponent;
  DirectionComponent: IDirectionComponent;
  CombatComponent: ICombatComponent;
  PlayerControlledComponent: IPlayerControlledComponent;
  SolidCollisionComponent: ISolidCollisionComponent;
  DoorInteractorComponent: IDoorInteractorComponent;
};

export type ComponentClass = new (...args: any[]) => ComponentRegistry[keyof ComponentRegistry];