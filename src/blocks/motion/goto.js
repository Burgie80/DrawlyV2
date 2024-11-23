export const goTo = {
  type: "goto",
  tooltip: "Go to a specific cardinal position",
  helpUrl: "",
  message0: "go to x: %1 , y: %2 %3",
  args0: [
    {
      type: "input_value",
      name: "X"
    },
    {
      type: "input_dummy",
      name: "NAME"
    },
    {
      type: "input_value",
      name: "Y"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 225
};