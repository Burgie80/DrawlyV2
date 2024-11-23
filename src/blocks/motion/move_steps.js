// Create a custom block called 'move_steps' that moves
// a certain image a number of steps according to the given number.
export const moveSteps = {
  type: "move_steps",
  tooltip: "Move an amount of steps in the direction the turtle is facing",
  helpUrl: "",
  message0: "move %1 steps %2",
  args0: [
    {
      type: "input_value",
      name: "STEPS",
      check: "Number"
    },
    {
      type: "input_end_row",
      name: "NAME"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 225
};