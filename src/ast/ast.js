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
      return ``;
    },
  }),
  /**
   * Number of {
   *   node: string,
   *   value: number,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Num", [], {
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
  VariantInfo("Str", [], {
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
  VariantInfo("Bool", [], {
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
  /**
   * Apply - represents a function application
   * Apply of {
   *   node: string,
   *   func: Ast,
   *   arg: Ast,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Apply", [], {
    toString() {
      const value = this.value;
      return JSON.stringify(
        { node: "Apply", func: value.func, arg: value.arg },
        2,
        null
      );
    },
  }),
];

export const Ast = createType("Ast", variantInfos);
export const { Program, Num, Str, Bool, Nil, Var, Apply } = Ast;
