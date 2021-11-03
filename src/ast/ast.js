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
   *   value: number,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Num"),
  /**
   * String of {
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Str"),
  /**
   * Boolean of {
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Bool"),
  /**
   * Nil of {
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Nil"),
  /**
   * Var of {
   *   value: string,
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Var"),
  /**
   * Apply - represents a unary function application
   * Apply of {
   *   func: Ast,
   *   arg: Ast,
   *   type: string | null
   *   loc: {line: number, col: number}
   * }
   */
  VariantInfo("Apply"),
  /**
   * BinOp - represents a binary operation
   * BinOp of {
   *   left: Ast,
   *   op: string,
   *   loc: { line: number, col: number }
   * }
   */
  VariantInfo("BinOp"),
  /**
   * Assign - represents a mutable variable assignment
   * Assign of {
   *   name: Ast,
   *   expr: Ast,
   *   loc: { line: number, col: number }
   * }
   */
  VariantInfo("Assign"),
  /**
   * UnOp - represents a unary operation
   * UnOp of {
   *   op: string,
   *   operand: Ast,
   *   loc: { line: number, col: number }
   * }
   */
  VariantInfo("UnOp"),
  /**
   * VarDecl - represents a variable declaration
   * VarDecl of {
   *   name: Ast,
   *   type: string
   *   mutable: boolean,
   *   recursive: boolean,
   *   expr: Ast,
   *   loc: { line: number, col: number }
   * }
   */
  VariantInfo("VarDecl"),
  /**
   * Func - represents a unary function expression
   * Func of {
   *   arg: Ast,
   *   body: Ast,
   *   loc: { line: number, col: number }
   * }
   */
  VariantInfo("Func"),
  /**
   * LetExpr - represents a let expression with a block
   * LetExpr of {
   *   name: Ast,
   *   type: string
   *   mutable: boolean,
   *   recursive: boolean,
   *   expr: Ast,
   *   body: Ast,
   *   loc: { line: number, col: number }
   * }
   */ VariantInfo("LetExpr"),
];

export const Ast = createType("Ast", variantInfos);
export const {
  Program,
  Num,
  Str,
  Bool,
  Nil,
  Var,
  Apply,
  BinOp,
  Assign,
  UnOp,
  VarDecl,
  Func,
  LetExpr,
} = Ast;
