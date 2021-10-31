@{%
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
  const matchArrow = match("arrow");
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
  const Arrow = { test: t => matchArrow(t) };
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
    TypeAnnotation,
    VarDecl,
    ParamList,
    ReturnAnnotation,
    FuncDecl,
    ArgList,
    Apply
  } = require("./nodes.cjs");
%}

program -> expterm:* expression:*                                                                                   {% Program %}

expression ->
    expr expterm:*                                                                                                  {% ([data]) => data %}

expr ->
  atom                                                                                                              {% id %}
  | binOp                                                                                                           {% id %}
  | variableDeclaration                                                                                             {% id %}
  | funcDeclaration                                                                                                 {% id %}

funcApplication ->
    expr lparen argList rparen                                                                                      {% Apply %}

argList ->
    expr comma argList                                                                                              {% ArgList %}
  | expr:?                                                                                                          {% data => data %}

funcDeclaration ->
    def identifier lparen paramList rparen returnAnnotation:? colon newline:* expr                                  {% FuncDecl %}

returnAnnotation
    -> arrow identifier                                                                                             {% ReturnAnnotation %}

paramList ->
    (identifier|typeAnnotation) comma paramList                                                                     {% ParamList %}
  | (identifier|typeAnnotation):?                                                                                   {% id %}

variableDeclaration ->
    let (identifier|typeAnnotation) bind expression                                                                 {% VarDecl %}

typeAnnotation ->
    identifier colon identifier                                                                                     {% TypeAnnotation %}

let -> %Let                                                                                                         {% id %}
def -> %Def                                                                                                         {% id %}

binOp ->
    expOp                                                                                                           {% id %}
  | mulOp                                                                                                           {% id %}
  | plusOp                                                                                                          {% id %}
  | shiftOp                                                                                                         {% id %}
  | compareOp                                                                                                       {% id %}
  | eqOp                                                                                                            {% id %}
  | bwandOp                                                                                                         {% id %}
  | bwxorOp                                                                                                         {% id %}
  | bworOp

ncOp -> orOp (nc) ncOp                                                                                              {% BinOp %}
  | orOp                                                                                                            {% id %}
orOp -> andoper (or) orOp                                                                                           {% BinOp %}
  | andoper                                                                                                         {% id %}
andoper -> bworOp (andop) andoper                                                                                   {% BinOp %}
  | bworOp                                                                                                          {% id %}
bworOp -> bwxorOp (bwor) bworOp                                                                                     {% BinOp %}
  | bwxorOp                                                                                                         {% id %}
bwxorOp -> bwandOp (bwxor) bwxorOp                                                                                  {% BinOp %}
  | bwandOp                                                                                                         {% id %}
bwandOp -> eqOp (bwand) bwandOp                                                                                     {% BinOp %}
  | eqOp                                                                                                            {% id %}
eqOp -> compareOp (eq|ne) eqOp                                                                                      {% BinOp %}
  | compareOp                                                                                                       {% id %}
compareOp -> shiftOp (lt|gt|lte|gte|in) compareOp                                                                   {% BinOp %}
  | shiftOp                                                                                                         {% id %}
shiftOp -> plusOp (lshift|rshift) shiftOp                                                                           {% BinOp %}
  | plusOp                                                                                                          {% id %}
plusOp -> mulOp (plus|minus) plusOp                                                                                 {% BinOp %}
  | mulOp                                                                                                           {% id %}
mulOp -> expOp (mul|div|rem) mulOp                                                                                  {% BinOp %}
  | expOp                                                                                                           {% id %}
expOp -> atom exp expOp                                                                                             {% BinOp %}
  | atom                                                                                                            {% id %}

bind -> %Bind                                                                                                       {% id %}
nc -> %Nc                                                                                                           {% id %}
or -> %Or                                                                                                           {% id %}
andop -> %Andop                                                                                                     {% id %}
bwor -> %Bwor                                                                                                       {% id %}
bwxor -> %Bwxor                                                                                                     {% id %}
bwand -> %Bwand                                                                                                     {% id %}
eq -> %Eq                                                                                                           {% id %}
ne -> %Ne                                                                                                           {% id %}
lt -> %Lt                                                                                                           {% id %}
gt -> %Gt                                                                                                           {% id %}
lte -> %Lte                                                                                                         {% id %}
gte -> %Gte                                                                                                         {% id %}
in -> %In                                                                                                           {% id %}
lshift -> %Lshift                                                                                                   {% id %}
rshift -> %Rshift                                                                                                   {% id %}
plus -> %Plus                                                                                                       {% id %}
minus -> %Minus                                                                                                     {% id %}
mul -> %Mul                                                                                                         {% id %}
div -> %Div                                                                                                         {% id %}
rem -> %Rem                                                                                                         {% id %}
exp -> %Exp                                                                                                         {% id %}
arrow => %Arrow                                                                                                     {% id %}

atom ->
    identifier                                                                                                      {% id %}
  | string                                                                                                          {% id %}
  | number                                                                                                          {% id %}
  | boolean                                                                                                         {% id %}
  | nil                                                                                                             {% id %}
  | lparen expr rparen                                                                                              {% Parenthesize %}
  # needs to be an atom so it can be used in a binary operation
  | funcApplication                                                                                                 {% id %}

identifier -> %Identifier                                                                                           {% Var %}

string -> %String                                                                                                   {% StringN %}

number ->
    %Number                                                                                                         {% NumberN %}
  | %Hexlit                                                                                                         {% NumberN %}
  | %Octlit                                                                                                         {% NumberN %}
  | %Binlit                                                                                                         {% NumberN %}

boolean ->
    %True                                                                                                           {% BooleanN %}
  | %False                                                                                                          {% BooleanN %}

nil -> %Nil                                                                                                         {% NilN %}

lparen -> %Lparen                                                                                                   {% id %}
rparen -> %Rparen                                                                                                   {% id %}
comma -> %Comma                                                                                                     {% id %}
colon -> %Colon                                                                                                     {% id %}

expterm ->
    newline                                                                                                         {% id %}
  | semi                                                                                                            {% id %}
  | eof                                                                                                             {% id %}

newline -> %Nl                                                                                                      {% id %}

semi -> %Semi                                                                                                       {% id %}

eof -> %Eof                                                                                                         {% id %}
