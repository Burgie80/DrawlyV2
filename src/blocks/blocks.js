import * as Blockly from 'blockly/core';

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
