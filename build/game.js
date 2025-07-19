
// title:   Dark Forest
// author:  PHACF
// desc:    short description
// site:    website link
// license: MIT License (change this to your license of choice)
// version: 0.1
// script:  js
const MapConfig = {
  walls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  closedDoor: [32, 33, 34, 35]
};
const Direction = {
  up: "up",
  down: "down",
  left: "left",
  right: "right"
};
const Keypad = {
  // Player 1 (ID base: 0)
  up: 0,
  down: 1,
  left: 2,
  right: 3,
  a: 4,
  //A z
  b: 5,
  //B x
  x: 6,
  //X a
  y: 7
};
class InputController {
  isUp() {
    return btn(Keypad.up);
  }
  isDown() {
    return btn(Keypad.down);
  }
  isLeft() {
    return btn(Keypad.left);
  }
  isRight() {
    return btn(Keypad.right);
  }
  isA() {
    return btn(Keypad.a);
  }
  isB() {
    return btn(Keypad.b);
  }
  isX() {
    return btn(Keypad.x);
  }
  isY() {
    return btn(Keypad.y);
  }
}
function detectTile(px, py, set) {
  let cx = Math.floor(px / 8);
  let cy = Math.floor(py / 8);
  let tile = mget(cx, cy);
  return set.includes(tile);
}
function isColidingTile(x, y, w, h, set) {
  return detectTile(x, y, set) || // canto superior esquerdo
  detectTile(x + w - 1, y, set) || // superior direito
  detectTile(x, y + h - 1, set) || // inferior esquerdo
  detectTile(x + w - 1, y + h - 1, set);
}
function goToTile(tilex, tiley) {
  return { x: tilex * 8, y: tiley * 8 };
}
class Character {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 7;
    this.h = 8;
    this.dx = 0;
    this.dy = 0;
    this.speed = 1;
    this.isAttacking = false;
    this.life = 1;
    this.receivedHits = 0;
    this.flip = 0;
    this.duration = 8;
    this.frameCounter = 0;
    this.direction = Direction.down;
    this.spriteIdx = 0;
    this.sprites = [
      256,
      257,
      // down 0 1
      258,
      259,
      260,
      // left/right 2 3 4
      261,
      262
      // up 5 6
    ];
    this.IntransponibleTiles = [...MapConfig.walls, ...MapConfig.closedDoor];
    this.inputController = new InputController();
    this.gotoStart();
  }
  gotoStart() {
    const pos = goToTile(2, 14);
    this.x = pos.x;
    this.y = pos.y;
  }
  update() {
    const { isUp, isDown, isLeft, isRight } = this.inputController;
    this.dx = 0;
    this.dy = 0;
    this.frameCounter = (this.frameCounter + 1) % (this.duration * 2);
    if (isUp()) {
      this.dy = -1;
      this.direction = Direction.up;
      this.spriteIdx = 6;
      this.flip = this.frameCounter < this.duration ? 0 : 1;
    } else if (isDown()) {
      this.dy = 1;
      this.direction = Direction.down;
      this.spriteIdx = 1;
      this.flip = this.frameCounter < this.duration ? 0 : 1;
    } else if (isLeft()) {
      this.dx = -1;
      this.direction = Direction.left;
      this.spriteIdx = this.frameCounter < this.duration ? 3 : 4;
      this.flip = 1;
    } else if (isRight()) {
      this.dx = 1;
      this.direction = Direction.right;
      this.spriteIdx = this.frameCounter < this.duration ? 3 : 4;
      this.flip = 0;
    } else {
      this.checkSpriteDirection();
      this.frameCounter = 0;
    }
    this.x += this.dx * this.speed;
    if (isColidingTile(this.x, this.y, this.w - 2, this.h - 2, this.IntransponibleTiles)) {
      this.x -= this.dx * this.speed;
    }
    this.y += this.dy * this.speed;
    if (isColidingTile(this.x, this.y, this.w - 2, this.h - 2, this.IntransponibleTiles)) {
      this.y -= this.dy * this.speed;
    }
  }
  checkSpriteDirection() {
    if (this.direction === Direction.up) {
      this.spriteIdx = 5;
      this.flip = 0;
    } else if (this.direction === Direction.down) {
      this.spriteIdx = 0;
      this.flip = 0;
    } else if (this.direction === Direction.left) {
      this.spriteIdx = 2;
      this.flip = 1;
    } else if (this.direction === Direction.right) {
      this.spriteIdx = 2;
      this.flip = 0;
    }
  }
  draw() {
    const sprt = this.sprites[this.spriteIdx];
    spr(sprt, this.x, this.y, 0, 1, this.flip, 0);
  }
}
class Game {
  constructor() {
    this.player = new Character();
  }
  update() {
  }
  draw() {
    map();
    this.player.update();
    this.player.draw();
  }
}
const game = new Game();
function TIC() {
  cls();
  game.update();
  game.draw();
}
globalThis.TIC = TIC;
