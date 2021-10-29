const { ifElse, isFunction, isNullish } = require("../utils");
const { VariantInfo, createType } = require("./createType.js");
const {
  RightAlt,
  Applicative,
  Apply,
  RightBifunctor,
  RightBichain,
  Functor,
  LeftAlt,
  LeftApply,
  LeftBifunctor,
  LeftBichain,
  LeftFold,
  LeftFunctor,
  LeftChain,
  LeftSemiGroup,
  Chain,
  Monoid,
  RightFold,
  RightSemiGroup,
} = require("./typeClasses.js");

const variantInfos = [
  VariantInfo("Some", [
    RightFold,
    Functor,
    Apply,
    Chain,
    RightBifunctor,
    RightBichain,
    RightAlt,
    RightSemiGroup,
  ]),
  VariantInfo("None", [
    LeftFold,
    LeftFunctor,
    LeftApply,
    LeftChain,
    LeftBifunctor,
    LeftBichain,
    LeftAlt,
    LeftSemiGroup,
  ]),
];

const Option = createType("Option", variantInfos, [Monoid, Applicative], {
  of(x) {
    return isNullish(x) ? Option.None(x) : Option.Some(x);
  },

  empty() {
    return Option.Some();
  },

  isSome(x) {
    return isFunction(x.isSome) && x.isSome();
  },

  isNone(x) {
    return isFunction(x.isNone) && x.isNone();
  },
});

const { Some, None } = Option;

const safe = (pred) => ifElse(pred, Option.Some, Option.None);

module.exports = { Option, Some, None, safe };
