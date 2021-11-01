import { pipeline } from "@jasonsbarr/functional-core/lib/lambda/pipeline.js";
import lexer from "./lexer.js";
import { Program } from "../ast/ast.js";

const raw = (str) => String.raw`${str}`;
const eof = (code) => code.concat(" <*endofinput*>");
// Filter out whitespace tokens so they don't clutter up the parser grammar
const lex = (input) => [...lexer.reset(input)].filter((t) => t.type !== "WS");

// match token types
const match = (type) => (token) => type === token.type;
const matchNl = match("NL");
const matchSemi = match("semi");
const matchEof = match("eof");

const matchComment = match("comment");
const matchNumber = match("number");
const matchHexlit = match("hexlit");
const matchOctlit = match("octlit");
const matchBinlit = match("binlit");
const matchTrue = match("true");
const matchFalse = match("false");
const matchNil = match("nil");
const matchIdentifier = match("identifier");
const matchString = match("string");
const matchDef = match("def");
const matchLet = match("let");
const matchRec = match("rec");
const matchIn = match("in");
const matchAnd = match("and");
const matchIf = match("if");
const matchThen = match("then");
const matchElse = match("else");
const matchIs = match("is");
const matchFun = match("fun");
const matchWhen = match("when");
const matchFor = match("for");
const matchWhile = match("while");
const matchType = match("type");
const matchWith = match("with");
const matchModule = match("module");
const matchPrivate = match("private");
const matchMutable = match("mutable");
const matchNot = match("not");
const matchBegin = match("begin");
const matchEnd = match("end");
const matchAs = match("as");
const matchImport = match("import");
const matchFrom = match("from");
const matchOpen = match("open");
const matchArrow = match("arrow");
const matchFatarrow = match("fatarrow");
const matchPipe = match("pipe");
const matchConcat = match("concat");
const matchCons = match("cons");
const matchPlus = match("plus");
const matchMinus = match("minus");
const matchExp = match("exp");
const matchMul = match("mul");
const matchIntdiv = match("intdiv");
const matchDiv = match("div");
const matchRem = match("rem");
const matchRshift = match("rshift");
const matchLshift = match("lshift");
const matchAndop = match("andop");
const matchOr = match("or");
const matchNc = match("nc");
const matchBwxor = match("bwxor");
const matchBwand = match("bwand");
const matchBwor = match("bwor");
const matchBwnot = match("bwnot");
const matchComposer = match("composer");
const matchComposeL = match("composel");
const matchLt = match("lt");
const matchGt = match("gt");
const matchLte = match("lte");
const matchGte = match("gte");
const matchEq = match("eq");
const matchNe = match("ne");
const matchLparen = match("lparen");
const matchRparen = match("rparen");
const matchLbracket = match("lbracket");
const matchRbracket = match("rbracket");
const matchLbrace = match("lbrace");
const matchRbrace = match("rbrace");
const matchAssign = match("assign");
const matchBind = match("bind");
const matchColon = match("colon");
const matchQuote = match("quote");
const matchTick = match("tick");
const matchAt = match("at");
const matchComma = match("comma");
const matchSpread = match("spread");
const matchDoubledot = match("doubledot");
const matchDot = match("dot");
const matchQuest = match("quest");
const matchBang = match("bang");

// match token categories
const matchExpTerm = (token) =>
  matchNl(token) || matchSemi(token) || matchEof(token);

const matchNumTok = (token) =>
  matchNumber(token) ||
  matchHexlit(token) ||
  matchOctlit(token) ||
  matchBinlit(token);

const matchBool = (token) => matchTrue(token) || matchFalse(token);

const matchKeyword = (token) =>
  matchDef(token) ||
  matchLet(token) ||
  matchRec(token) ||
  matchIn(token) ||
  matchAnd(token) ||
  matchIf(token) ||
  matchThen(token) ||
  matchElse(token) ||
  matchIs(token) ||
  matchFun(token) ||
  matchWhen(token) ||
  matchFor(token) ||
  matchWhile(token) ||
  matchType(token) ||
  matchWith(token) ||
  matchModule(token) ||
  matchPrivate(token) ||
  matchMutable(token) ||
  matchNot(token) ||
  matchBegin(token) ||
  matchEnd(token) ||
  matchAs(token) ||
  matchImport(token) ||
  matchFrom(token) ||
  matchOpen(token);

const matchBinOp = (token) =>
  matchIs(token) ||
  matchArrow(token) ||
  matchFatarrow(token) ||
  matchPipe(token) ||
  matchConcat(token) ||
  matchCons(token) ||
  matchPlus(token) ||
  matchMinus(token) ||
  matchExp(token) ||
  matchMul(token) ||
  matchIntdiv(token) ||
  matchDiv(token) ||
  matchRem(token) ||
  matchRshift(token) ||
  matchLshift(token) ||
  matchAndop(token) ||
  matchOr(token) ||
  matchNc(token) ||
  matchBwxor(token) ||
  matchBwand(token) ||
  matchBwor(token) ||
  matchComposer(token) ||
  matchComposeL(token) ||
  matchLt(token) ||
  matchGt(token) ||
  matchLte(token) ||
  matchGte(token) ||
  matchEq(token) ||
  matchNe(token) ||
  matchAssign(token) ||
  matchBind(token) ||
  matchAt(token);

const matchUnOp = (token) =>
  matchNot(token) ||
  matchPlus(token) ||
  matchMul(token) ||
  matchBwnot(token) ||
  matchSpread(token) ||
  matchBang(token);

const parse = (tokens) => {
  let pos = -1;

  const parseAtom = {};

  const parseExpr = {};

  const parseProgram = {};
};

export default (code) => pipeline(code, raw, eof, lex, parse);
