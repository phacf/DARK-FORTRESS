import { MapConfig } from "@constants/map/map";
import { Direction, DirectionType } from "@constants/sprites/entities";
import { InputController } from "controllers/inputController";
import { ICharacter } from "interfaces/ICharacter";
import { isColidingTile } from "utils/colision";
import { goToTile } from "utils/movement";
import {
  aimDown,
  aimUp,
  getTileDown,
  getTileUP,
  onTile,
} from "utils/screen";

export class Character implements ICharacter {
  private input = new InputController();

  private position = { x: 0, y: 0 };
  private size = { w: 7, h: 8 };
  private velocity = { dx: 0, dy: 0 };
  private speed = 1;

  private isAttacking = false;
  private life = 1;
  private receivedHits = 0;

  private flip = 0;
  private animation = {
    duration: 8,
    frameCounter: 0,
    spriteIdx: 0,
  };

  private direction: DirectionType = Direction.down;

  private sprites: number[] = [
    256, 257, // down
    258, 259, 260, // left/right
    261, 262, // up
  ];

  private solidTiles = [...MapConfig.walls, ...MapConfig.closedDoor];

  constructor() {
    this.gotoStart();
  }

  private gotoStart() {
    const pos = goToTile(6, 13);
    this.position.x = pos.x;
    this.position.y = pos.y;
  }

  update(): void {
    this.velocity.dx = 0;
    this.velocity.dy = 0;
    this.animation.frameCounter = (this.animation.frameCounter + 1) % (this.animation.duration * 2);

    this.handleInput();
    this.moveAndCollide();
    this.makeAction();
    this.passiveActions();
  }

  private handleInput() {
    const { isUp, isDown, isLeft, isRight } = this.input;

    if (isUp()) this.moveVertical(-1, Direction.up, 6);
    else if (isDown()) this.moveVertical(1, Direction.down, 1);
    else if (isLeft()) this.moveHorizontal(-1, Direction.left, 1);
    else if (isRight()) this.moveHorizontal(1, Direction.right, 0);
    else {
      this.setIdleSprite();
      this.animation.frameCounter = 0;
    }
  }

  private moveAndCollide() {
    this.position.x += this.velocity.dx * this.speed;
    if (this.isColliding()) this.position.x -= this.velocity.dx * this.speed;

    this.position.y += this.velocity.dy * this.speed;
    if (this.isColliding()) this.position.y -= this.velocity.dy * this.speed;
  }

  private isColliding(): boolean {
    return isColidingTile(
      this.position.x,
      this.position.y,
      this.size.w - 2,
      this.size.h - 2,
      this.solidTiles
    );
  }

  private moveVertical(dy: number, direction: DirectionType, spriteIdx: number) {
    this.velocity.dy = dy;
    this.direction = direction;
    this.animation.spriteIdx = spriteIdx;
    this.flip = this.animation.frameCounter < this.animation.duration ? 0 : 1;
  }

  private moveHorizontal(dx: number, direction: DirectionType, flip: number) {
    this.velocity.dx = dx;
    this.direction = direction;
    this.animation.spriteIdx = this.animation.frameCounter < this.animation.duration ? 3 : 4;
    this.flip = flip;
  }

  private setIdleSprite() {
    if (this.direction === Direction.up) {
      this.animation.spriteIdx = 5;
      this.flip = 0;
    } else if (this.direction === Direction.down) {
      this.animation.spriteIdx = 0;
      this.flip = 0;
    } else {
      this.animation.spriteIdx = 2;
      this.flip = this.direction === Direction.left ? 1 : 0;
    }
  }

  private makeAction() {
    if (this.input.isA()) this.tryOpenDoor();
  }

  private passiveActions() {
    this.tryCrossDoor();
  }

  private tryCrossDoor() {
    const tile = onTile(this.position.x, this.position.y);
    const offset = 16;

    if (this.direction === Direction.up) {
      const tileCross = onTile(this.position.x, this.position.y - offset);
      if (
        tile === MapConfig.OPEN_DOOR_TOP &&
        tileCross === MapConfig.OPEN_DOOR_BOTTOM
      ) {
        const { x, y } = aimUp(this.position.x, this.position.y, this.size.w, this.size.h);
        const next = goToTile(x, y - 1.6);
        this.position.x = next.x;
        this.position.y = next.y;
      }
    }

    if (this.direction === Direction.down) {
      const tileCross = onTile(this.position.x, this.position.y + offset);
      if (
        tile === MapConfig.OPEN_DOOR_BOTTOM &&
        tileCross === MapConfig.OPEN_DOOR_TOP
      ) {
        const { x, y } = aimUp(this.position.x, this.position.y, this.size.w, this.size.h);
        const next = goToTile(x, y + 3);
        this.position.x = next.x;
        this.position.y = next.y;
      }
    }
  }

  private tryOpenDoor() {
    if (this.direction === Direction.up) {
      const tile = getTileUP(this.position.x, this.position.y, this.size.w, this.size.h);
      const tileCross = getTileUP(this.position.x, this.position.y - 16, this.size.w, this.size.h);
      const { x, y } = aimUp(this.position.x, this.position.y, this.size.w, this.size.h);

      if (
        MapConfig.closedDoor.includes(tile) &&
        MapConfig.closedDoor.includes(tileCross)
      ) {
        mset(x, y, MapConfig.OPEN_DOOR_TOP);
        mset(x, y - 2, MapConfig.OPEN_DOOR_BOTTOM);
      } else if (MapConfig.closedDoor.includes(tile)) {
        mset(x, y, MapConfig.OPEN_DOOR_TOP);
      }
    }

    if (this.direction === Direction.down) {
      const tile = getTileDown(this.position.x, this.position.y, this.size.w, this.size.h);
      const tileCross = getTileDown(
        this.position.x,
        this.position.y + 16,
        this.size.w,
        this.size.h
      );
      const { x, y } = aimDown(this.position.x, this.position.y, this.size.w, this.size.h);

      if (
        MapConfig.closedDoor.includes(tile) &&
        MapConfig.closedDoor.includes(tileCross)
      ) {
        mset(x, y, MapConfig.OPEN_DOOR_BOTTOM);
        mset(x, y + 2, MapConfig.OPEN_DOOR_TOP);
      } else if (MapConfig.closedDoor.includes(tile)) {
        mset(x, y, MapConfig.OPEN_DOOR_BOTTOM);
      }
    }
  }

  draw(): void {
    const sprite = this.sprites[this.animation.spriteIdx];
    spr(sprite, this.position.x, this.position.y, 0, 1, this.flip, 0);
  }
}
