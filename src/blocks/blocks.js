import * as Blockly from 'blockly/core';
import { FieldAngle } from '@blockly/field-angle';

class CoolFieldAngle extends FieldAngle {
    static DEFAULT_PRECISION = 1;  // Override the 15-degree default

    constructor(value, validator = null) {
        super(value, validator);
        this.setPrecision(1);  // Ensure 1-degree precision
    }
}

Blockly.fieldRegistry.register('field_angle', CoolFieldAngle);

// import { registerFieldAngle } from '@blockly/field-angle';
// registerFieldAngle({
//     snap: 1
// });

// Motion blocks
import { moveSteps } from './motion/move_steps';
import { turnDegrees } from './motion/turn_degrees';
import { turnDegreesAnticlockwise } from './motion/turn_degrees_anticlockwise';
import { goTo } from './motion/goto';
import { setX } from './motion/set_x';
import { setY } from './motion/set_y';
import { changeX } from './motion/change_x';
import { changeY } from './motion/change_y';
// Loops blocks
import { for_loop } from './loops/for_loop';

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    // Motion blocks
    moveSteps,
    turnDegrees,
    turnDegreesAnticlockwise,
    goTo,
    setX,
    setY,
    changeX,
    changeY,
    // Loops blocks
    for_loop,
]);
