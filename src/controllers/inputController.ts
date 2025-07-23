import { IInputController } from "interfaces/IInputController";
import { Keypad } from "@tic/keys/keys";

export class InputController implements IInputController {
    isUp(): boolean {
        return btn(Keypad.up);
    }

    isDown(): boolean {
        return btn(Keypad.down);

    }

    isLeft(): boolean {
        return btn(Keypad.left);

    }

    isRight(): boolean {
        return btn(Keypad.right);

    }

    isA(): boolean {
        return btnp(Keypad.a);

    }

    isB(): boolean {
        return btnp(Keypad.b);

    }

    isX(): boolean {
        return btnp(Keypad.x);

    }

    isY(): boolean {
        return btnp(Keypad.y);

    }
}