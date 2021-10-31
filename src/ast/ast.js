import {
  createType,
  VariantInfo,
} from "@jasonsbarr/functional-core/lib/types/createType.js";

const variantInfos = [
  // Program of {
  //   node: string,
  //   prog: list Ast,
  //   start: {line: number, col: number},
  //   end: {line: number, col: number}
  // }
  VariantInfo("Program", [], {
    toString() {
      return `{
        node: ${this.node},
        prog: [${this.prog.toString()}]
      }`;
    },
  }),
];

export const Ast = createType("Ast", variantInfos);
export const { Program } = Ast;
