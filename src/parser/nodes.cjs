const { point, first, last } = require("./helpers.cjs");

exports.Program = (data) => ({
  node: "Program",
  prog: last(data),
});

exports.NumberN = (data) => ({
  node: "Number",
  value: first(data).value,
  loc: point(first(data)),
});

exports.StringN = (data) => ({
  node: "String",
  value: first(data).value,
  loc: point(first(data)),
});

exports.BooleanN = (data) => ({
  node: "Boolean",
  value: first(data).value,
  loc: point(first(data)),
});

exports.NilN = (data) => ({
  node: "Nil",
  value: first(data).value,
  loc: point(first(data)),
});

const Var = (data) => ({
  node: "Var",
  value: first(data).value,
  loc: point(first(data)),
});

exports.Var = Var;

const BinOperator = (data) => {
  const op = Array.isArray(data) ? data[0] : data;
  return {
    value: op.value,
    loc: point(op),
  };
};

exports.Parenthesize = (data) => data[1];

exports.BinOp = (data) => ({
  node: "BinOp",
  left: first(data),
  op: BinOperator(data[1]),
  right: last(data),
  loc: first(data).loc,
});

const TypeAnnotation = (data) => {
  const id = first(data);
  return { ...id, type: data[2].value };
};

exports.TypeAnnotation = TypeAnnotation;

exports.VarDecl = (data) => ({
  node: "VarDecl",
  name: data[1][0],
  expr: data[3][0],
  type: data[1][0].type,
  loc: point(first(data)),
});

const Func = (args, body, retType, loc) => {
  body = Array.isArray(body) ? body[0] : body;
  const params =
    args !== null ? args.filter((t) => t && t.type !== "comma") : [];
  const makeFunc = (params) =>
    params.length === 0
      ? {
          node: "Func",
          arg: null,
          body: body,
          type: retType,
          loc,
        }
      : params.length == 1
      ? {
          node: "Func",
          arg: params[0],
          body: body,
          type: retType,
          loc,
        }
      : {
          node: "Func",
          arg: params[0],
          body: makeFunc(params.slice(1)),
          loc,
        };

  return makeFunc(params);
};

exports.ParamList = (data) => data.flat(Infinity);

exports.ReturnAnnotation = (data) => last(data).value;

exports.FuncDecl = (data) => {
  const id = {
    node: "VarDecl",
    name: data[1],
    expr: Func(data[3], data[8], data[5], {
      line: data[0].line,
      col: data[0].col,
    }),
    type: data[5],
    loc: { line: data[0].line, col: data[0].col },
  };
  return id;
};

const Apply = (data) => {};

exports.Apply = Apply;
