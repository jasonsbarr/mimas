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
  /**
   * Number of {
   *   node: string,
   *   value: number,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Number", [], {
    toString() {
      return `{ node: ${this.node}, value: ${this.value} }`;
    },
  }),
];

export const Ast = createType("Ast", variantInfos);
export const { Program, Number } = Ast;
