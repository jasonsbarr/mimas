import {
  Option,
  Some,
  None,
} from "@jasonsbarr/functional-core/lib/types/Option.js";
import { Record } from "@jasonsbarr/functional-core/lib/types/Record.js";
import {
  createType,
  VariantInfo,
} from "@jasonsbarr/functional-core/lib/types/createType.js";
import { switchType } from "@jasonsbarr/functional-core/lib/types/switchType.js";
import { gt } from "@jasonsbarr/functional-core/lib/predicates/gt.js";
import { eq } from "@jasonsbarr/functional-core/lib/predicates/eq.js";
import { length as strlen } from "@jasonsbarr/functional-core/lib/string/length.js";
import { slice } from "@jasonsbarr/functional-core/lib/string/slice.js";
import { string as str } from "@jasonsbarr/functional-core/lib/string/string.js";
import { fromCharCode } from "@jasonsbarr/functional-core/lib/string/fromCharCode.js";
import { charCodeAt } from "@jasonsbarr/functional-core/lib/string/charCodeAt.js";
import { number as num } from "@jasonsbarr/functional-core/lib/number/number.js";
import { noop } from "@jasonsbarr/functional-core/lib/helpers/noop.js";
import { identity } from "@jasonsbarr/functional-core/lib/helpers/identity.js";
import { length } from "@jasonsbarr/functional-core/lib/array/length.js";
import { join } from "@jasonsbarr/functional-core/lib/array/join.js";
import { map } from "@jasonsbarr/functional-core/lib/array/map.js";
import { Expr, Ident, Lambda, ApplyFn, Let, Letrec } from "./expr.js";

/**
 * Simple implementation of Hindley-Milner type inference algorithm
 * see also: https://github.com/7sharp9/write-you-an-inference-in-fsharp/blob/master/HMBasic/HMBasic.fs
 * and: https://github.com/7sharp9/write-you-an-inference-in-fsharp/blob/master/HMPure/HMPure.fs
 * and: https://github.com/7sharp9/write-you-an-inference-in-fsharp/blob/master/HMSplitSolve/HMSplitSolve.fs
 * and: https://github.com/rob-smallshire/hindley-milner-python/blob/master/inference.py
 * and: https://github.com/alehander92/Airtight/blob/master/airtight/hindley_milner_ast.py
 * and: https://github.com/billpmurphy/hask/blob/master/hask/lang/hindley_milner.py
 * and: https://github.com/quchen/articles/blob/master/hindley-milner/src/HindleyMilner.hs
 * and: https://github.com/tomprimozic/type-systems/blob/master/algorithm_w/infer.ml
 */

let nextVariableId = 0;
let nextVariableName = "a";

const getNextVariableName = () => {
  const newVar = nextVariableName;
  const code = charCodeAt(0, nextVariableName);
  let i;

  if (code === 122) {
    if (gt(1, strlen(newVar))) {
      i = num(slice(1, newVar)) + 1;
    } else {
      i = 1;
    }
    nextVariableName = "a" + str(i);
  } else {
    nextVariableName = fromCharCode(code + 1);
  }

  return newVar;
};

/**
 * type TyVar = {
 *    id: number,
 *    name: string option,
 *    instance: Typ option
 * }
 */
const TyVar = Record("id", "name", "instance");

/**
 * type TyOp = {
 *    name: string,
 *    types: Typ array
 * }
 */
const TyOp = Record("name", "types");

/**
 * type Typ =
 *  | TypeVariable of TyVar
 *  | TypeOperator of TyOp
 */
const Typ = createType("Typ", [
  VariantInfo("TypeVariable", [], {
    init() {
      this.value = TyVar.of(this.value);
    },
  }),
  VariantInfo("TypeOperator", [], {
    init() {
      this.value = TyOp.of(this.value);
    },
  }),
]);

const { TypeVariable, TypeOperator } = Typ;

const makeVariable = () =>
  TypeVariable({ id: nextVariableId++, name: None(), instance: None() });

const nameVariable = ({ value }) =>
  value.name.fold(
    () => TypeVariable({ ...value, name: Some(getNextVariableName()) }),
    () => TypeVariable({ ...value })
  );

const typToString = (typ) =>
  switchCase(
    Typ,
    {
      TypeVariable: ({ value: { name, instance } }) => {
        if (Option.isSome(instance)) {
          return typToString(instance);
        }

        const { value: name } = nameVariable(typ.value);
        // will always return a value, because I just set a name on the previous line
        return name.fold(noop, identity);
      },
      TypeOperator: ({ value: { name, types } }) => {
        if (eq(0, length(types))) {
          return name;
        }

        if (eq(2, length(types))) {
          return `(${typToString(types[0])} ${name} ${typToString(types[1])})`;
        }

        return join(" ", map(typToString, types));
      },
    },
    typ
  );
