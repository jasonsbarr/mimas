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
  comment: /;;.*/u,
  number: [
    {
      match: /[1-9]\d*\.\d*[eE][\+-]?\d+/u,
      value: (n) => Number(n),
    },
    {
      match: /0\.\d*[eE][\+-]?\d+/u,
      value: (n) => Number(n),
    },
    {
      match: /0+\.\d*/u,
      value: (n) => Number(n),
    },
    {
      match: /[1-9]\d*\.\d*/u,
      value: (n) => Number(n),
    },
    {
      match: /[1-9]\d*|0+/u,
      value: (n) => Number(n),
    },
  ],
  hexlit: { match: /0[xX][0-9a-fA-F_]+/u, value: (x) => parseInt(x, 16) },
  octlit: { match: /0[oO][0-7_]+/u, value: (x) => parseInt(x, 8) },
  binlit: { match: /0[bB][01_]+/u, value: (x) => parseInt(x, 2) },
  true: { match: /true/u, value: () => true },
  false: { match: /false/u, value: () => false },
  nil: { match: /nil/u, value: () => null },
  identifier: {
    match: /[\p{L}_\$][\p{L}\p{N}_\$]*/u,
    type: moo.keywords(
      Object.fromEntries(
        [
          "def",
          "let",
          "rec",
          "in",
          "and",
          "if",
          "then",
          "else",
          "is",
          "fun",
          "when",
          "for",
          "while",
          "type",
          "match",
          "with",
          "module",
          "private",
          "mutable",
          "not",
          "begin",
          "end",
          "as",
          "import",
          "from",
          "open",
        ].map((w) => [w, w])
      )
    ),
  },
  string: [
    { match: /"""[\s\S]*"""/u, value: (s) => readString(s).slice(2, -2) },
    { match: /@".*"@/u, value: (s) => String.raw`${s}`.slice(2, -2) },
    { match: /".*"/u, value: (s) => readString(s) },
  ],
  eof: { match: "<*endofinput*>", value: () => Symbol.for("end of input") },
  arrow: /->/u,
  pipe: "|>",
  concat: "++",
  cons: "::",
  plus: "+",
  minus: /-/u,
  exp: "**",
  mul: "*",
  intdiv: "//",
  div: "/",
  rem: "%",
  rshift: ">>>",
  lshift: "<<<",
  andop: "&&",
  or: "||",
  nc: "??",
  bwxor: "^",
  bwand: "&",
  bwor: "|",
  bwnot: "~",
  composer: ">>",
  composel: "<<",
  lt: "<",
  gt: ">",
  lte: "<=",
  gte: ">=",
  eq: "==",
  ne: "!=",
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
  comma: ",",
  optch: "?.",
  spread: /\.\.\./u,
  doubledot: /\.\./u,
  dot: /\./u,
  quest: "?",
  bang: "!",
  hash: "#",
};

export default moo.compile(tokens);
