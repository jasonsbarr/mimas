import { Record } from "@jasonsbarr/functional-core/lib/types/Record.js";
import {
  createType,
  VariantInfo,
} from "@jasonsbarr/functional-core/lib/types/createType";

/**
 * type Loc = {
 *    line: number,
 *    col: number
 * }
 */
/**
 * type IdentExp = {
 *    name: string,
 *    type: string option,
 *    loc: Loc
 * }
 */
const IdentExp = Record("name", "type", "loc");

/**
 * type LambdaExp = {
 *    param: string,
 *    ptype: string option,
 *    body: Expr,
 *    rtype: string option,
 *    loc: Loc
 * }
 */
const LambdaExp = Record("param", "ptype", "body", "rtype", "loc");

/**
 * type ApplyExp = {
 *    arg: Expr,
 *    body: Expr,
 *    loc: Loc
 * }
 */
const ApplyExp = Record("arg", "body", "loc");

/**
 * type LetExp = {
 *    name: string,
 *    defn: Expr,
 *    body: Expr,
 *    loc: Loc
 * }
 */
const LetExp = Record("name", "defn", "body", "loc");

/**
 * type LetrecExp = {
 *    name: string,
 *    defn: Expr,
 *    body: Expr,
 *    loc: Loc
 * }
 */
const LetrecExp = Record("name", "defn", "body", "loc");

const variantInfos = [
  /**
   *  Ident of IdentExp
   */
  VariantInfo("Ident", [], {
    init() {
      this.value = IdentExp.of(this.value);
    },
  }),
  /**
   * Lambda of LambdaExp
   */
  VariantInfo("Lambda", [], {
    init() {
      this.value = LambdaExp.of(this.value);
    },
  }),
  /**
   * ApplyFn of ApplyExp
   */
  VariantInfo("ApplyFn", [], {
    init() {
      this.value = ApplyExp.of(this.value);
    },
  }),
  /**
   * Let of LetExp
   */
  VariantInfo("Let", [], {
    init() {
      this.value = LetExp.of(this.value);
    },
  }),
  /**
   * Letrec of LetrecExp
   */
  VariantInfo("Letrec", [], {
    init() {
      this.value = LetrecExp.of(this.value);
    },
  }),
];

/**
 * type Expr =
 *  | Ident of IdentExp
 *  | Lambda of LambdaExp
 *  | ApplyFn of ApplyExp
 *  | Let of LetExp
 *  | Letrec of LetrecExp
 */
export const Expr = createType("Expr", variantInfos);

export const { Ident, Lambda, ApplyFn, Let, Letrec } = Expr;
