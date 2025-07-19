
// title:   Dark Forest
// author:  PHACF
// desc:    short description
// site:    website link
// license: MIT License (change this to your license of choice)
// version: 0.1
// script:  js
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
      257,
      // down
      258,
      259,
      // left/right
      262
      // up
    ];
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
      this.spriteIdx = 3;
      this.flip = this.frameCounter < this.duration ? 0 : 1;
    } else if (isDown()) {
      this.dy = 1;
      this.direction = Direction.down;
      this.spriteIdx = 0;
      this.flip = this.frameCounter < this.duration ? 0 : 1;
    } else if (isLeft()) {
      this.dx = -1;
      this.direction = Direction.left;
      this.spriteIdx = this.frameCounter < this.duration ? 1 : 2;
      this.flip = 1;
    } else if (isRight()) {
      this.dx = 1;
      this.direction = Direction.right;
      this.spriteIdx = this.frameCounter < this.duration ? 1 : 2;
      this.flip = 0;
    } else {
      this.checkSpriteDirection();
      this.frameCounter = 0;
    }
    this.x += this.speed * this.dx;
    this.y += this.speed * this.dy;
  }
  checkSpriteDirection() {
    if (this.direction === Direction.up) {
      this.spriteIdx = 3;
      this.flip = 0;
    } else if (this.direction === Direction.down) {
      this.spriteIdx = 0;
      this.flip = 0;
    } else if (this.direction === Direction.left) {
      this.spriteIdx = 1;
      this.flip = 1;
    } else if (this.direction === Direction.right) {
      this.spriteIdx = 1;
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
