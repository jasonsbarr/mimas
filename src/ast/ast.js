const { VariantInfo, createType } = require("../lib/types/types");
const { Record } = require("../lib/types/record");

const ProgramNode = Record("node", "prog", "start", "end");

const variantInfos = [
  VariantInfo("Program", [], {
    init() {
      this.value = ProgramNode.of(this.value);
    },

    toString() {
      return JSON.stringify(
        {
          node: "Program",
          prog: this.value.prog,
        },
        null,
        2
      );
    },
  }),
];

const Ast = createType("Ast", variantInfos);
module.exports = Ast;
