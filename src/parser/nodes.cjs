const { point, first, last } = require("./helpers.cjs");

exports.Program = ([data]) => ({
  node: "Program",
  prog: data,
  start: first(data) && first(data).start,
  end: last(data) && last(data).end,
});

exports.NumberN = (data) => ({
  node: "Number",
  value: first(data).value,
  start: point(first(data)),
  end: point(last(data)),
});

exports.StringN = (data) => ({
  node: "String",
  value: first(data).value,
  start: point(first(data)),
  end: point(last(data)),
});

exports.BooleanN = (data) => ({
  node: "Boolean",
  value: first(data).value,
  start: point(first(data)),
  end: point(last(data)),
});

exports.NilN = (data) => ({
  node: "Nil",
  value: first(data).value,
  start: point(first(data)),
  end: point(last(data)),
});

exports.Var = (data) => ({
  node: "Var",
  value: first(data).value,
  start: point(first(data)),
  end: point(last(data)),
});
