// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  /*
   * Need to define symbols here by type so I can feed Nearly an
   * array and filter out the whitespace tokens I don't need
   */

  // token matchers
  const match = (type) => (token) => token.type === type;
  const matchNl = match("NL");
  const matchComment = match("comment");
  const matchNumber = match("number");
  const matchHexlit = match("hexlit");
  const matchOctlit = match("octlit");
  const matchBinlit = match("binlit");
  const matchIdentifier = match("identifier");
  const matchDef = match("def");
  const matchLet = match("let");
  const matchRec = match("rec");
  const matchIn = match("in");
  const matchAnd = match("and");
  const matchIf = match("if");
  const matchThen = match("then");
  const matchElse = match("else");
  const matchFun = match("fun");
  const matchWhen = match("when");
  const matchFor = match("for");
  const matchType = match("type");
  const matchMatch = match("match");
  const matchWith = match("with");
  const matchModule = match("module");
  const matchPrivate = match("private");
  const matchMutable = match("mutable");
  const matchNot = match("not");
  const matchBegin = match("begin");
  const matchDo = match("do");
  const matchEnd = match("end");
  const matchAs = match("as");
  const matchImport = match("import");
  const matchOpen = match("open");
  const matchTrue = match("true");
  const matchFalse = match("false");
  const matchNil = match("nil");
  const matchIs = match("is");
  const matchString = match("string");
  const matchEof = match("eof");
  const matchApply = match("apply");
  const matchPipe = match("pipe");
  const matchConcat = match("concat");
  const matchPlus = match("plus");
  const matchMinus = match("minus");
  const matchExp = match("exp");
  const matchMul = match("mul");
  const matchDiv = match("div");
  const matchIntdiv = match("intdiv");
  const matchRem = match("rem");
  const matchRshift = match("rshift");
  const matchLshift = match("lshift");
  const matchBwxor = match("bwxor");
  const matchBwand = match("bwand");
  const matchBwor = match("bwor");
  const matchBwnot = match("bwnot");
  const matchLt = match("lt");
  const matchGt = match("gt");
  const matchLte = match("lte");
  const matchGte = match("gte");
  const matchEq = match("eq");
  const matchNe = match("ne");
  const matchAndop = match("andop");
  const matchOr = match("or");
  const matchNc = match("nc");
  const matchLparen = match("lparen");
  const matchRparen = match("rparen");
  const matchLbracket = match("lbracket");
  const matchRbracket = match("rbracket");
  const matchLbrace = match("lbrace");
  const matchRbrace = match("rbrace");
  const matchAssign = match("assign");
  const matchBind = match("bind");
  const matchColon = match("colon");
  const matchSemi = match("semi");
  const matchQuote = match("quote");
  const matchTick = match("tick");
  const matchAt = match("at");
  const matchComposer = match("composer");
  const matchComposel = match("composel");
  const matchComma = match("comma");
  const matchDot = match("dot");
  const matchQuest = match("quest");
  const matchBang = match("bang");

  // token testers
  const Nl = { test: t => matchNl(t) };
  const Comment = { test: t => matchComment(t) };
  const Number = { test: t => matchNumber(t) };
  const Hexlit = { test: t => matchHexlit(t) };
  const Octlit = { test: t => matchOctlit(t) };
  const Binlit = { test: t => matchBinlit(t) };
  const Identifier = { test: t => matchIdentifier(t) };
  const Def = { test: t => matchDef(t) };
  const Let = { test: t => matchLet(t) };
  const Rec = { test: t => matchRec(t) };
  const In = { test: t => matchIn(t) };
  const And = { test: t => matchAnd(t) };
  const If = { test: t => matchIf(t) };
  const Then = { test: t => matchThen(t) };
  const Else = { test: t => matchElse(t) };
  const Fun = { test: t => matchFun(t) };
  const When = { test: t => matchWhen(t) };
  const For = { test: t => matchFor(t) };
  const Type = { test: t => matchType(t) };
  const Match = { test: t => matchMatch(t) };
  const With = { test: t => matchWith(t) };
  const Module = { test: t => matchModule(t) };
  const Private = { test: t => matchPrivate(t) };
  const Mutable = { test: t => matchMutable(t) };
  const Not = { test: t => matchNot(t) };
  const Begin = { test: t => matchBegin(t) };
  const Do = { test: t => matchDo(t) };
  const End = { test: t => matchEnd(t) };
  const As = { test: t => matchAs(t) };
  const Import = { test: t => matchImport(t) };
  const Open = { test: t => matchOpen(t) };
  const True = { test: t => matchTrue(t) };
  const False = { test: t => matchFalse(t) };
  const Nil = { test: t => matchNil(t) };
  const Is = { test: t => matchIs(t) };
  const String = { test: t => matchString(t) };
  const Eof = { test: t => matchEof(t) };
  const Apply = { test: t => matchApply(t) };
  const Pipe = { test: t => matchPipe(t) };
  const Concat = { test: t => matchConcat(t) };
  const Plus = { test: t => matchPlus(t) };
  const Minus = { test: t => matchMinus(t) };
  const Exp = { test: t => matchExp(t) };
  const Mul = { test: t => matchMul(t) };
  const Div = { test: t => matchDiv(t) };
  const Intdiv = { test: t => matchIntdiv(t) };
  const Rem = { test: t => matchRem(t) };
  const Rshift = { test: t => matchRshift(t) };
  const Lshift = { test: t => matchLshift(t) };
  const Bwxor = { test: t => matchBwxor(t) };
  const Bwand = { test: t => matchBwand(t) };
  const Bwor = { test: t => matchBwor(t) };
  const Bwnot = { test: t => matchBwnot(t) };
  const Lt = { test: t => matchLt(t) };
  const Gt = { test: t => matchGt(t) };
  const Lte = { test: t => matchLte(t) };
  const Gte = { test: t => matchGte(t) };
  const Eq = { test: t => matchEq(t) };
  const Ne = { test: t => matchNe(t) };
  const Andop = { test: t => matchAndop(t) };
  const Or = { test: t => matchOr(t) };
  const Nc = { test: t => matchNc(t) };
  const Lparen = { test: t => matchLparen(t) };
  const Rparen = { test: t => matchRparen(t) };
  const Lbracket = { test: t => matchLbracket(t) };
  const Rbracket = { test: t => matchRbracket(t) };
  const Lbrace = { test: t => matchLbrace(t) };
  const Rbrace = { test: t => matchRbrace(t) };
  const Assign = { test: t => matchAssign(t) };
  const Bind = { test: t => matchBind(t) };
  const Colon = { test: t => matchColon(t) };
  const Semi = { test: t => matchSemi(t) };
  const Quote = { test: t => matchQuote(t) };
  const Tick = { test: t => matchTick(t) };
  const At = { test: t => matchAt(t) };
  const Composer = { test: t => matchComposer(t) };
  const Composel = { test: t => matchComposel(t) };
  const Comma = { test: t => matchComma(t) };
  const Dot = { test: t => matchDot(t) };
  const Quest = { test: t => matchQuest(t) };
  const Bang = { test: t => matchBang(t) };

  // AST node constructors
  const {
    Program,
    NumberN,
    StringN,
    BooleanN,
    NilN,
    Var,
    Parenthesize,
    BinOp,
    VarDecl,
    ParamList,
    FuncDecl
  } = require("./nodes.cjs");
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "program$ebnf$1", "symbols": []},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "expterm"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program$ebnf$2", "symbols": []},
    {"name": "program$ebnf$2", "symbols": ["program$ebnf$2", "expression"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program", "symbols": ["program$ebnf$1", "program$ebnf$2"], "postprocess": Program},
    {"name": "expression$ebnf$1", "symbols": []},
    {"name": "expression$ebnf$1", "symbols": ["expression$ebnf$1", "expterm"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expression", "symbols": ["expr", "expression$ebnf$1"], "postprocess": ([data]) => data},
    {"name": "expr", "symbols": ["atom"], "postprocess": id},
    {"name": "expr", "symbols": ["binOp"], "postprocess": id},
    {"name": "expr", "symbols": ["variableDeclaration"], "postprocess": id},
    {"name": "expr", "symbols": ["funcDeclaration"]},
    {"name": "funcDeclaration", "symbols": ["def", "identifier", "lparen", "paramList", "rparen", "colon", "expr"], "postprocess": FuncDecl},
    {"name": "paramList", "symbols": ["identifier", "comma", "paramList"], "postprocess": ParamList},
    {"name": "paramList$ebnf$1", "symbols": ["identifier"], "postprocess": id},
    {"name": "paramList$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "paramList", "symbols": ["paramList$ebnf$1"], "postprocess": id},
    {"name": "variableDeclaration", "symbols": ["let", "identifier", "bind", "expression"], "postprocess": VarDecl},
    {"name": "let", "symbols": [Let], "postprocess": id},
    {"name": "def", "symbols": [Def], "postprocess": id},
    {"name": "binOp", "symbols": ["expOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["mulOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["plusOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["shiftOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["compareOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["eqOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["bwandOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["bwxorOp"], "postprocess": id},
    {"name": "binOp", "symbols": ["bworOp"]},
    {"name": "ncOp$subexpression$1", "symbols": ["nc"]},
    {"name": "ncOp", "symbols": ["orOp", "ncOp$subexpression$1", "ncOp"], "postprocess": BinOp},
    {"name": "ncOp", "symbols": ["orOp"], "postprocess": id},
    {"name": "orOp$subexpression$1", "symbols": ["or"]},
    {"name": "orOp", "symbols": ["andoper", "orOp$subexpression$1", "orOp"], "postprocess": BinOp},
    {"name": "orOp", "symbols": ["andoper"], "postprocess": id},
    {"name": "andoper$subexpression$1", "symbols": ["andop"]},
    {"name": "andoper", "symbols": ["bworOp", "andoper$subexpression$1", "andoper"], "postprocess": BinOp},
    {"name": "andoper", "symbols": ["bworOp"], "postprocess": id},
    {"name": "bworOp$subexpression$1", "symbols": ["bwor"]},
    {"name": "bworOp", "symbols": ["bwxorOp", "bworOp$subexpression$1", "bworOp"], "postprocess": BinOp},
    {"name": "bworOp", "symbols": ["bwxorOp"], "postprocess": id},
    {"name": "bwxorOp$subexpression$1", "symbols": ["bwxor"]},
    {"name": "bwxorOp", "symbols": ["bwandOp", "bwxorOp$subexpression$1", "bwxorOp"], "postprocess": BinOp},
    {"name": "bwxorOp", "symbols": ["bwandOp"], "postprocess": id},
    {"name": "bwandOp$subexpression$1", "symbols": ["bwand"]},
    {"name": "bwandOp", "symbols": ["eqOp", "bwandOp$subexpression$1", "bwandOp"], "postprocess": BinOp},
    {"name": "bwandOp", "symbols": ["eqOp"], "postprocess": id},
    {"name": "eqOp$subexpression$1", "symbols": ["eq"]},
    {"name": "eqOp$subexpression$1", "symbols": ["ne"]},
    {"name": "eqOp", "symbols": ["compareOp", "eqOp$subexpression$1", "eqOp"], "postprocess": BinOp},
    {"name": "eqOp", "symbols": ["compareOp"], "postprocess": id},
    {"name": "compareOp$subexpression$1", "symbols": ["lt"]},
    {"name": "compareOp$subexpression$1", "symbols": ["gt"]},
    {"name": "compareOp$subexpression$1", "symbols": ["lte"]},
    {"name": "compareOp$subexpression$1", "symbols": ["gte"]},
    {"name": "compareOp$subexpression$1", "symbols": ["in"]},
    {"name": "compareOp", "symbols": ["shiftOp", "compareOp$subexpression$1", "compareOp"], "postprocess": BinOp},
    {"name": "compareOp", "symbols": ["shiftOp"], "postprocess": id},
    {"name": "shiftOp$subexpression$1", "symbols": ["lshift"]},
    {"name": "shiftOp$subexpression$1", "symbols": ["rshift"]},
    {"name": "shiftOp", "symbols": ["plusOp", "shiftOp$subexpression$1", "shiftOp"], "postprocess": BinOp},
    {"name": "shiftOp", "symbols": ["plusOp"], "postprocess": id},
    {"name": "plusOp$subexpression$1", "symbols": ["plus"]},
    {"name": "plusOp$subexpression$1", "symbols": ["minus"]},
    {"name": "plusOp", "symbols": ["mulOp", "plusOp$subexpression$1", "plusOp"], "postprocess": BinOp},
    {"name": "plusOp", "symbols": ["mulOp"], "postprocess": id},
    {"name": "mulOp$subexpression$1", "symbols": ["mul"]},
    {"name": "mulOp$subexpression$1", "symbols": ["div"]},
    {"name": "mulOp$subexpression$1", "symbols": ["rem"]},
    {"name": "mulOp", "symbols": ["expOp", "mulOp$subexpression$1", "mulOp"], "postprocess": BinOp},
    {"name": "mulOp", "symbols": ["expOp"], "postprocess": id},
    {"name": "expOp", "symbols": ["atom", "exp", "expOp"], "postprocess": BinOp},
    {"name": "expOp", "symbols": ["atom"], "postprocess": id},
    {"name": "bind", "symbols": [Bind], "postprocess": id},
    {"name": "nc", "symbols": [Nc], "postprocess": id},
    {"name": "or", "symbols": [Or], "postprocess": id},
    {"name": "andop", "symbols": [Andop], "postprocess": id},
    {"name": "bwor", "symbols": [Bwor], "postprocess": id},
    {"name": "bwxor", "symbols": [Bwxor], "postprocess": id},
    {"name": "bwand", "symbols": [Bwand], "postprocess": id},
    {"name": "eq", "symbols": [Eq], "postprocess": id},
    {"name": "ne", "symbols": [Ne], "postprocess": id},
    {"name": "lt", "symbols": [Lt], "postprocess": id},
    {"name": "gt", "symbols": [Gt], "postprocess": id},
    {"name": "lte", "symbols": [Lte], "postprocess": id},
    {"name": "gte", "symbols": [Gte], "postprocess": id},
    {"name": "in", "symbols": [In], "postprocess": id},
    {"name": "lshift", "symbols": [Lshift], "postprocess": id},
    {"name": "rshift", "symbols": [Rshift], "postprocess": id},
    {"name": "plus", "symbols": [Plus], "postprocess": id},
    {"name": "minus", "symbols": [Minus], "postprocess": id},
    {"name": "mul", "symbols": [Mul], "postprocess": id},
    {"name": "div", "symbols": [Div], "postprocess": id},
    {"name": "rem", "symbols": [Rem], "postprocess": id},
    {"name": "exp", "symbols": [Exp], "postprocess": id},
    {"name": "atom", "symbols": ["identifier"], "postprocess": id},
    {"name": "atom", "symbols": ["string"], "postprocess": id},
    {"name": "atom", "symbols": ["number"], "postprocess": id},
    {"name": "atom", "symbols": ["boolean"], "postprocess": id},
    {"name": "atom", "symbols": ["nil"], "postprocess": id},
    {"name": "atom", "symbols": ["lparen", "expr", "rparen"], "postprocess": Parenthesize},
    {"name": "identifier", "symbols": [Identifier], "postprocess": Var},
    {"name": "string", "symbols": [String], "postprocess": StringN},
    {"name": "number", "symbols": [Number], "postprocess": NumberN},
    {"name": "number", "symbols": [Hexlit], "postprocess": NumberN},
    {"name": "number", "symbols": [Octlit], "postprocess": NumberN},
    {"name": "number", "symbols": [Binlit], "postprocess": NumberN},
    {"name": "boolean", "symbols": [True], "postprocess": BooleanN},
    {"name": "boolean", "symbols": [False], "postprocess": BooleanN},
    {"name": "nil", "symbols": [Nil], "postprocess": NilN},
    {"name": "lparen", "symbols": [Lparen], "postprocess": id},
    {"name": "rparen", "symbols": [Rparen], "postprocess": id},
    {"name": "comma", "symbols": [Comma], "postprocess": id},
    {"name": "colon", "symbols": [Colon], "postprocess": id},
    {"name": "expterm", "symbols": ["newline"], "postprocess": id},
    {"name": "expterm", "symbols": ["semi"], "postprocess": id},
    {"name": "expterm", "symbols": ["eof"], "postprocess": id},
    {"name": "newline", "symbols": [Nl], "postprocess": id},
    {"name": "semi", "symbols": [Semi], "postprocess": id},
    {"name": "eof", "symbols": [Eof], "postprocess": id}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
