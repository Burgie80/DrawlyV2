export const turnDegrees = {
  type: "turn_degrees_clockwise",
  tooltip: "Turn an amount of degrees to the right",
  helpUrl: "",
  message0: "turn %1 degrees clockwise %2",
  args0: [
    {
      type: "field_angle",
      name: "DEGREES",
      angle: 90
    },
    {
      type: "input_dummy",
      name: "DEGREES"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 225
};