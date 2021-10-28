import moo from "moo";

const isHexadecimalChar = (ch) => /^[0-9a-fA-F]$/.test(ch);

/**
 *
 * @param {String} raw raw value from token match
 * @return {String}
 */
const readString = (raw) => {
  const temp = [...raw.slice(1, -1)];
  let i = 0;

  const readWhile = (pred) => {
    let str = "";

    while (pred(temp[i])) {
      str += temp[i++];
    }
    return str;
  };

  const readEscape = (ch) => {
    console.log(ch);
    let str = "";
    let seq = "";

    if (ch == "n") {
      str += "\n";
    } else if (ch == "b") {
      str += "\b";
    } else if (ch == "f") {
      str += "\f";
    } else if (ch == "r") {
      str += "\r";
    } else if (ch == "t") {
      str += "\t";
    } else if (ch == "v") {
      str += "\v";
    } else if (ch == "0") {
      str += "\0";
    } else if (ch == "'") {
      str += "'";
    } else if (ch == '"') {
      str += '"';
    } else if (ch == "\\") {
      str += "\\";
    } else if (ch == "x") {
      // is hexadecimal escape sequence
      seq = readWhile(isHexadecimalChar);
      str += String.fromCharCode(parseInt(seq, 16));
    } else if (ch == "u") {
      // is Unicode escape sequence
      seq = readWhile(isHexadecimalChar);
      str += String.fromCodePoint(parseInt(seq, 16));
    }

    return str;
  };

  let str = "";
  let escaped = false;

  while (i < temp.length) {
    let ch = temp[i++];
    escaped && console.log(escaped);

    if (escaped) {
      str += readEscape(ch);
      escaped = false;
    } else if (ch === "\\") {
      escaped = true;
    } else {
      str += ch;
    }
  }

  console.log(str.length);
  return str;
};

const tokens = {
  WS: /[ \t]/u,
  NL: { match: /\r?\n|\r/u, lineBreaks: true },
  comment: /#.*/u,
  true: { match: /^true$/u, value: () => true },
  false: { match: /^false$/u, value: () => false },
  nil: { match: /^nil$/u, value: () => null },
  number: [
    {
      match: /^[1-9]\d*|0|[1-9]\d*\.|0\.$/u,
      value: (n) => Number(n),
    },
    {
      match: /^[1-9]\d*\.|0\.\d+$/u,
      value: (n) => Number(n),
    },
    {
      match: /^[1-9]\d*\.|0\.\d+[eE][\+-]?\d+$/u,
      value: (n) => Number(n),
    },
  ],
  hexlit: /0[xX][0-9a-fA-F]+/u,
  octlit: /0[oO][0-7]+/u,
  binlit: /0[bB][01]+/u,
  symbol: {
    match: /[\p{L}_\$][\p{L}\p{N}_\$\?!=\+-<>=\*\/]*/u,
    type: moo.keywords(
      Object.fromEntries(
        [
          "let",
          "rec",
          "in",
          "and",
          "if",
          "then",
          "else",
          "fun",
          "when",
          "for",
          "type",
          "match",
          "with",
          "module",
          "private",
          "mutable",
          "not",
          "begin",
          "do",
          "end",
        ].map((w) => [w, w])
      )
    ),
  },
  string: { match: /".*"/u, value: (s) => readString(s) },
  apply: /->/u,
  pipe: "|>",
  concat: "++",
  plus: "+",
  minus: /-/u,
  exp: "**",
  mul: "*",
  div: "/",
  intdiv: "//",
  mod: "%",
  rshift: ">>>",
  lshift: "<<<",
  bwxor: "^",
  bwand: "&",
  bwor: "|",
  bwnot: "~",
  lt: "<",
  gt: ">",
  lte: "<=",
  rte: ">=",
  eq: "==",
  ne: "!=",
  andop: "&&",
  or: "||",
  lparen: "(",
  rparen: ")",
  lbracket: "[",
  rbracket: "]",
  lbrace: "{",
  rbrace: "}",
  assign: ":=",
  bind: "=",
  colon: ":",
  semi: ";",
  quote: "'",
  tick: "`",
  at: "@",
  composer: ">>",
  composel: "<<",
  comma: ",",
  dot: ".",
  quest: "?",
  bang: "!",
};

export const lexer = moo.compile(tokens);

lexer.reset(String.raw`"hello \u0065"`);
console.log([...lexer]);
