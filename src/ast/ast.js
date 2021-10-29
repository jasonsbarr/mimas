const { VariantInfo, createType } = require("../lib/types/types");
const { Record } = require("../lib/types/record");

const ProgramNode = Record("node", "prog", "start", "end");
exports.ProgramNode = ProgramNode;

const NumberNode = Record("node", "value", "start", "end");
exports.NumberNode = NumberNode;

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
  VariantInfo("Number", [], {
    init() {
      this.value = NumberNode.of(this.value);
    },

    toString() {
      return JSON.stringify({
        node: "Number",
        value: this.value,
      });
    },
  }),
];

const Ast = createType("Ast", variantInfos);
exports.Ast = Ast;
