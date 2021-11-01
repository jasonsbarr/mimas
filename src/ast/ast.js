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
      const value = this.value;
      return `{
  node: ${value.node},
  prog: [
${value.prog.reduce((str, n) => str + "    " + n.toString() + ",\n", "")}  ]
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
      const value = this.value;
      return `{ node: ${value.node}, value: ${value.value} }`;
    },
  }),
  /**
   * String of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("String", [], {
    toString() {
      const value = this.value;
      return `{ node: ${value.node}, value: ${value.value} }`;
    },
  }),
  /**
   * Boolean of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Boolean", [], {
    toString() {
      const value = this.value;
      return `{ node: ${value.node}, value: ${value.value} }`;
    },
  }),
  /**
   * Nil of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Nil", [], {
    toString() {
      const value = this.value;
      return `{ node: ${value.node}, value: ${value.value} }`;
    },
  }),
  /**
   * Var of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Var", [], {
    toString() {
      const value = this.value;
      return `{ node: ${value.node}, value: ${value.value} }`;
    },
  }),
];

export const Ast = createType("Ast", variantInfos);
export const { Program, Number, String, Boolean, Nil, Var } = Ast;
