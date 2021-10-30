const { point, first, last } = require("./helpers.cjs");

exports.Program = (data) => ({
  node: "Program",
  prog: last(data),
  start: first(last(data)) && first(last(data)).start,
  end: last(last(data)) && last(last(data)).end,
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

const BinOperator = (data) => {
  const op = Array.isArray(data) ? data[0] : data;
  return {
    value: op.value,
    start: point(op),
    end: point(op),
  };
};

exports.Parenthesize = (data) => data[1];

exports.BinOp = (data) => ({
  node: "BinOp",
  left: first(data),
  op: BinOperator(data[1]),
  right: last(data),
  start: first(data).start,
  end: last(data).end,
});

exports.VarDecl = (data) => ({
  node: "VarDecl",
  name: data[1],
  expr: data[3],
  start: point(first(data)),
  end: point(last(data)),
});

const Func = (data) => {
  console.log(data);
  return data;
};
exports.Func = Func;
