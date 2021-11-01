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
  VariantInfo("Program"),
  /**
   * Number of {
   *   node: string,
   *   value: number,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Num"),
  /**
   * String of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Str"),
  /**
   * Boolean of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Bool"),
  /**
   * Nil of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Nil"),
  /**
   * Var of {
   *   node: string,
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Var"),
  /**
   * Apply - represents a unary function application
   * Apply of {
   *   node: string,
   *   func: Ast,
   *   arg: Ast,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Apply"),
  /**
   * BinOp - represents a binary operation
   * BinOp of {
   *   node: string,
   *   left: Ast,
   *   op: string,
   *   loc: { line: number, col: number }
   * }
   */
  VariantInfo("BinOp"),
  /**
   * UnOp - represents a unary operation
   * UnOp of {
   *   node: string,
   *   op: string,
   *   operand: Ast,
   *   loc: { line: number, col: number }
   * }
   */
  VariantInfo("UnOp"),
];

export const Ast = createType("Ast", variantInfos);
export const { Program, Num, Str, Bool, Nil, Var, Apply, BinOp, UnOp } = Ast;
