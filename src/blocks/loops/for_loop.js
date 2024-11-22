export const for_loop = {
    type: "for_loop",
    tooltip: "",
    helpUrl: "",
    message0: "count with %1 %2 from %3 to %4 by %5 %6 %7",
    args0: [
      {
        type: "field_variable",
        name: "FOR_VAR",
        variable: "i"
      },
      {
        type: "input_dummy",
        name: "ITER_VAR"
      },
      {
        type: "input_value",
        name: "FROM",
        check: "Number"
      },
      {
        type: "input_value",
        name: "TO"
      },
      {
        type: "input_value",
        name: "BY"
      },
      {
        type: "input_end_row",
        name: "END"
      },
      {
        type: "input_statement",
        name: "BODY"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120
  };  