import { DirectionType } from "@constants/sprites/sprites";

export interface IPositionComponent {
  x: number;
  y: number;
}

export interface IVelocityComponent {
  dx: number;
  dy: number;
  speed: number;
}

export interface ISizeComponent {
  width: number;
  height: number;
}

export interface ISpriteComponent {
  spriteIdx: number;
  flip: number;
  sprites: number[];
  duration: number;
  frameCounter: number;
}

export interface IDirectionComponent {
  direction: DirectionType;
}

export interface ICombatComponent {
  life: number;
  receivedHits: number;
  isAttacking: boolean;
}

export interface IPlayerControlledComponent { }

export interface ISolidCollisionComponent {
  solidTiles: number[];
}

export interface IDoorInteractorComponent { }