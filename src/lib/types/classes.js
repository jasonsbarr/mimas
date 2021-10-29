const { concatValues, equals, identity, eq } = require("../../utils");

// Right typeclasses
exports.Fold = {
  fold(f) {
    return f(this.value);
  },
};

exports.RightFold = {
  fold(f, g) {
    return g(this.value);
  },
};

exports.Functor = {
  map(f) {
    return this.constructor(f(this.value));
  },
};

exports.Apply = {
  ap(other) {
    return other.map(this.value);
  },
};

exports.Chain = {
  chain(f) {
    return f(this.value);
  },
};

exports.Bifunctor = {
  bimap(f, g) {
    throw new Error("bimap method must be implemented on the instance");
  },
};

exports.RightBifunctor = {
  bimap(leftFunc, rightFunc) {
    return this.constructor(rightFunc(this.value));
  },
};

exports.RightBichain = {
  bichain(leftFunc, rightFunc) {
    return rightFunc(this.value);
  },
};

exports.RightAlt = {
  alt(other) {
    return this;
  },
};

exports.SemiGroup = {
  concat(o) {
    return this.constructor(concatValues(this.value, o.value));
  },
};

exports.RightSemiGroup = {
  concat(o) {
    return o.fold(
      (l) => o.constructor(l),
      (r) => this.constructor(concatValues(this.value, r))
    );
  },
};

exports.Setoid = {
  equals(x) {
    return (
      eq(this.type, x.type) &&
      eq(this.variant, x.variant) &&
      equals(this.value, x.value)
    );
  },
};

exports.Traversable = {
  traverse(point, fn) {
    throw new Error(
      "Traverse method must be implemented individually for each type"
    );
  },

  sequence(point) {
    return this.traverse(point, identity);
  },
};

exports.Swap = {
  swap(leftMapFn, rightMapFn) {
    throw new Error(
      "Swap method must be implemented individually for each type"
    );
  },
};

// Left typeclasses
exports.LeftFold = {
  fold(f, g) {
    return f(this.value);
  },
};

exports.LeftFunctor = {
  map(f) {
    return this;
  },
};

exports.LeftApply = {
  ap(other) {
    return this;
  },
};

exports.LeftChain = {
  chain(f) {
    return this;
  },
};

exports.LeftBifunctor = {
  bimap(leftFunc, rightFunc) {
    return this.constructor(leftFunc(this.value));
  },
};

exports.LeftBichain = {
  bichain(leftFunc, rightFunc) {
    return leftFunc(this.value);
  },
};

exports.LeftAlt = {
  alt(other) {
    return other.isRight() ? other : this;
  },
};

exports.LeftSemiGroup = {
  concat(o) {
    return this;
  },
};

// for type representative
exports.Applicative = {
  of() {
    throw new Error("of method must be implemented individually for each type");
  },
};

exports.Monoid = {
  empty() {
    throw new Error(
      "empty method must be implemented individually for each type"
    );
  },
};
