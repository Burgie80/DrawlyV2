import { Order } from 'blockly/python';
import * as Blockly from 'blockly/core';

export const forBlock = Object.create(null);

forBlock['move_steps'] = function (block, generator) {
    const value_steps = generator.valueToCode(block, 'STEPS', Order.ATOMIC);
    return `t.fd(${value_steps})\n`;
};

forBlock['turn_degrees_clockwise'] = function (block, generator) {
    const angle_degrees = block.getFieldValue('DEGREES');
    return `t.right(${angle_degrees})\n`;
};

forBlock['turn_degrees_anticlockwise'] = function (block, generator) {
    const angle_degrees = block.getFieldValue('DEGREES');
    return `t.left(${angle_degrees})\n`;
};

forBlock['goto'] = function (block, generator) {
    const value_x = generator.valueToCode(block, 'X', Order.ATOMIC);
    const value_y = generator.valueToCode(block, 'Y', Order.ATOMIC);

    return `t.goto(${value_x}, ${value_y})\n`;
};

forBlock['set_x'] = function (block, generator) {
    const number_x = block.getFieldValue('X');
    return `t.setx(${number_x})\n`;
};

forBlock['set_y'] = function (block, generator) {
    const number_y = block.getFieldValue('Y');
    return `t.sety(${number_y})\n`;
};

forBlock['change_x'] = function (block, generator) {
    const number_x = block.getFieldValue('X');
    return `t.setx(t.pos()[0] + ${number_x})\n`;
};

forBlock['change_y'] = function (block, generator) {
    const number_y = block.getFieldValue('Y');
    return `t.sety(t.pos()[1] + ${number_y})\n`;
};

forBlock['for_loop'] = function (block, generator) {
    const variable_for_var = generator.getVariableName(block.getFieldValue('FOR_VAR'));

    const value_from = generator.valueToCode(block, 'FROM', Order.ATOMIC);

    const value_to = generator.valueToCode(block, 'TO', Order.ATOMIC);

    const value_by = generator.valueToCode(block, 'BY', Order.ATOMIC);

    const statement_body = generator.statementToCode(block, 'BODY');
    
    return `for ${variable_for_var} in range(${value_from}, ${value_to}, ${value_by}):\n${statement_body}\n`;
};
