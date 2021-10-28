exports.pipe = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);

exports.assign = (target, ...sources) => Object.assign(target, ...sources);

exports.definePropWithOpts = (
  prop,
  obj,
  { writable = true, configurable = true, enumerable = true, value = null } = {}
) =>
  Object.defineProperty(obj, prop, {
    writable,
    configurable,
    enumerable,
    value,
  });

exports.freeze = (obj) => Object.freeze(obj);

const _isPlaceholder = (a) => {
  return (
    a != null && typeof a === "object" && a["@@functional/placeholder"] === true
  );
};

const _arity = (n, fn) => {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error(
        "First argument to _arity must be a non-negative integer no greater than ten"
      );
  }
};

const _curry1 = (fn) => {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

const _curry2 = (fn) => {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a)
          ? f2
          : _curry1(function (_b) {
              return fn(a, _b);
            });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? f2
          : _isPlaceholder(a)
          ? _curry1(function (_a) {
              return fn(_a, b);
            })
          : _isPlaceholder(b)
          ? _curry1(function (_b) {
              return fn(a, _b);
            })
          : fn(a, b);
    }
  };
};

const _curryN = (length, received, fn) => {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (
        combinedIdx < received.length &&
        (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)
      ) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn));
  };
};

exports.curryN = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});

exports.curry = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

exports.keys = (obj) => Object.keys(obj);

exports.includes = curry((value, arr) => arr.includes(value));

exports.not = (bool) => !bool;

exports.isNil = (obj) => obj == null;

exports.concatValues = (value1, value2) => {
  if (
    typeof value1 === "string" ||
    typeof value1 === "number" ||
    typeof value1 === "bigint"
  ) {
    return value1 + value2;
  } else if (typeof value1 === "boolean") {
    return value1 && value2;
  } else if (isNil(value1)) {
    return value2;
  } else if (typeof value1 === "symbol") {
    return Symbol(value1.description + value2.description);
  }
  // add cases for Maps, Sets, and functions?
  return value1.concat(value2);
};

exports.equals = (a, b) => {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    // I just want to check for structural equality, not necessarily having the same constructors, so I'm commenting this out
    // if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equals(a[i], b[i])) return false;
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      for (i of a.entries()) if (!equals(i[1], b.get(i[0]))) return false;
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      var key = keys[i];

      if (!equals(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
};

exports.identity = (x) => x;

exports.eq = curry((v1, v2) => equals(v1, v2));
