const objectHash = require("object-hash");

exports.pipe = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);

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

const curryN = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});

exports.curryN = curryN;

const curry = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

exports.curry = curry;

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

const keys = (obj) => Object.keys(obj);

exports.keys = keys;

const includes = curry((value, arr) => arr.includes(value));
exports.includes = includes;

exports.not = (bool) => !bool;

const isNil = (obj) => obj == null;

exports.isNil = isNil;

const concatValues = (value1, value2) => {
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

exports.concatValues = concatValues;

const equals = (a, b) => {
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

exports.equals = equals;

exports.identity = (x) => x;

exports.eq = curry((v1, v2) => equals(v1, v2));

exports.hash = (obj) => objectHash(obj);

exports.ifElse = curry((pred, ifCase, elseCase, value) =>
  pred(value) ? ifCase(value) : elseCase(value)
);

exports.isNullish = (obj) => obj == null || Number.isNaN(obj);

const property = (obj, key) => Object.getOwnPropertyDescriptor(obj, key);

exports.property = property;

const defineProperty = (target, key, source) =>
  Object.defineProperty(target, key, source);

exports.defineProperty = defineProperty;

const symbols = (obj) => Object.getOwnPropertySymbols(obj);

exports.symbols = symbols;

exports.extend = (target, ...sources) => {
  sources.forEach((source) => {
    keys(source).forEach((key) => {
      if (key === "prototype") {
        target[key] = source[key];
      } else {
        defineProperty(target, key, property(source, key));
      }
    });
    symbols(source).forEach((symbol) => {
      defineProperty(target, symbol, property(source, symbol));
    });
  });
  return target;
};

const entries = (obj) => Object.entries(obj);
exports.entries = entries;

const values = (obj) => Object.values(obj);

exports.values = values;

const isMap = (obj) => obj instanceof Map;
exports.isMap = isMap;

const isSet = (obj) => obj instanceof Set;
exports.isSet = isSet;

const names = (obj) => Object.getOwnPropertyNames(obj);
exports.names = names;

const isArray = (obj) => Array.isArray(obj);
exports.isArray = isArray;

const isDate = (obj) => obj instanceof Date;
exports.isDate = isDate;

const isRegExp = (obj) => obj instanceof RegExp;
exports.isRegExp = isRegExp;

const isObject = (obj) =>
  !isNil(obj) &&
  typeof obj === "object" &&
  !isMap(obj) &&
  !isSet(obj) &&
  !isRegExp(obj) &&
  !isDate(obj) &&
  !isArray(obj);

exports.isObject = isObject;

const copyProto = curry((source, target) => setProto(source.__proto__, target));
exports.copyProto = copyProto;

const setProto = curry((source, target) =>
  Object.setPrototypeOf(target, source)
);
exports.setProto = setProto;

// helper functions for clone
const getValue = (key, obj) => {
  let value = obj[key];
  let result;

  if (isMap(value)) {
    result = cloneMap(value);
  }
  if (isSet(value)) {
    result = cloneSet(value);
  }
  if (isArray(value)) {
    result = cloneArray(value);
  } else if (isDate(value)) {
    result = new Date(value.getTime());
  } else if (isRegExp(value)) {
    result = RegExp(value.source, getRegExpFlags(value));
  } else if (isObject(value)) {
    result = clone(value);
  } else {
    // is primitive or function
    result = value;
  }
  return result;
};

const cloneArray = (arr) => {
  let result = [];
  for (let value of obj) {
    result.push(clone(value));
  }
  return result;
};

const cloneMap = (map) => {
  let result = new Map();
  for (let [key, _] of map.entries()) {
    result.set(key, clone(map.get(key)));
  }
  return result;
};

const cloneSet = (set) => {
  let result = new Set();
  for (let value of set.values()) {
    result.add(clone(value));
  }
  return result;
};

// stolen from https://github.com/angus-c/just/blob/master/packages/collection-clone/index.js
const getRegExpFlags = (regExp) => {
  if (typeof regExp.source.flags == "string") {
    return regExp.source.flags;
  } else {
    var flags = [];
    regExp.global && flags.push("g");
    regExp.ignoreCase && flags.push("i");
    regExp.multiline && flags.push("m");
    regExp.sticky && flags.push("y");
    regExp.unicode && flags.push("u");
    return flags.join("");
  }
};

const clone = (obj) => {
  let result = isArray(obj)
    ? []
    : isMap(obj)
    ? new Map()
    : isSet(obj)
    ? new Set()
    : isDate(obj)
    ? new Date(obj.getTime())
    : isRegExp(obj)
    ? new RegExp(obj.source, getRegExpFlags(obj))
    : isObject(obj)
    ? Object.create(null)
    : // is primitive
      obj;
  if (isMap(obj)) {
    for (let [key, _] of obj.entries()) {
      result.set(key, clone(obj.get(key)));
    }
  } else if (isSet(obj)) {
    for (let value of obj.values()) {
      result.add(clone(value));
    }
  } else if (isArray(obj)) {
    result = cloneArray(obj);
  } else if (isDate(obj)) {
    result = new Date(obj.getTime());
  } else if (isRegExp(obj)) {
    result = new RegExp(obj.source, getRegExpFlags(obj));
  } else if (isObject(obj)) {
    // is actual object, not null
    for (let key of names(obj)) {
      result[key] = getValue(key, obj);
    }
    for (let key of symbols(obj)) {
      result[key] = getValue(key, obj);
    }
    // set proto because I used Object.create(null) above
    copyProto(obj, result);
  } else {
    // obj is a primitive value or function
    result = obj;
  }
  return result;
};

exports.clone = clone;

const freeze = (obj) => Object.freeze(obj);
exports.freeze = freeze;

const create = (proto) => Object.create(proto);
exports.create = create;

const toQueryString = (obj) => {
  let qStr = "";
  let i = 0;
  for (let [k, v] of entries(obj)) {
    qStr += encodeURI(k) + "=" + encodeURI(v);
    if (lt(i, length(entries(obj)) - 1)) {
      qStr += "&";
    }
    i++;
  }
  return qStr;
};

exports.toQueryString = toQueryString;
