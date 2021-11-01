import { pipeline } from "@jasonsbarr/functional-core/lib/lambda/pipeline.js";
import lexer from "./lexer.js";
import { Program, Number, String, Boolean, Nil, Var } from "../ast/ast.js";

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
const matchUnless = match("unless");
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
const matchOptch = match("optch");
const matchSpread = match("spread");
const matchDoubledot = match("doubledot");
const matchDot = match("dot");
const matchQuest = match("quest");
const matchBang = match("bang");
const matchHash = match("hash");

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
  matchUnless(token) ||
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
  matchIn(token) ||
  matchIs(token) ||
  matchArrow(token) ||
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
  matchBang(token) ||
  matchHash(token) ||
  matchAt(token);

const matchPunc = (token) =>
  matchComma(token) ||
  matchColon(token) ||
  matchOptch(token) ||
  matchDot(token) ||
  matchQuote(token) ||
  matchTick(token) ||
  matchLparen(token) ||
  matchRparen(token) ||
  matchLbracket(token) ||
  matchRbracket(token) ||
  matchLbrace(token) ||
  matchRbrace(token) ||
  matchQuest(token);

const makePoint = (token) => ({ line: token.line, col: token.col });
const makePrimNode = (name, token) => ({
  node: name,
  value: token.value,
  loc: makePoint(token),
});

const precedence = {
  "=": 5, // binding
  ":=": 5, // assignment
  "??": 10, // nullish coalescing
  "||": 15, // logical or
  "&&": 20, // logical and
  "|": 25, // bitwise or
  "^": 30, // bitwise not
  "&": 35, // bitwise and
  "!=": 40, // not equal (structural equality)
  "==": 40, // structural equality
  is: 40, // reference equality
  in: 45, // is a member of
  ">": 45, // greater than
  "<": 45, // less than
  "<=": 45, // less than or equal to
  ">=": 45, // greater than or equal to
  ">>>": 50, // bitwise right shift
  "<<<": 50, // bitwise left shift
  "+": 55, // addition
  "++": 55, // concatenate strings
  "@": 55, // concatenate lists
  "-": 55, // subtraction
  "*": 60, // multiplication
  "/": 60, // division
  "//": 60, // integer division
  "%": 60, // remainder
  "::": 60, // cons
  "**": 65, // exponentiation
  "|>": 65, // pipe forward
  ">>": 65, // compose right
  "<<": 65, // compose left
  "->": 70, // lambda application
};

const parse = (input) => {
  let pos = 0;
  let saved = -1;
  let buffer = [];

  const next = () => input[++pos];
  const skip = () => ++pos;
  const resetBuffer = () => (buffer = []);
  const resetSaved = () => (saved = -1);
  const peek = () => input[pos];
  const lookahead = (lh) => input[pos + lh] ?? null;
  const eof = () => matchEof(peek());
  const croak = (message) => {
    throw new SyntaxError(message);
  };
  const skipIf = (pred, expected) =>
    pred(peek())
      ? skip()
      : croak(
          `Invalid token ${peek().text}${
            expected ? ", expected " + expected : ""
          } at line: ${peek().line}, col: ${peek().col}`
        );
  const skipNewlines = () => {
    while (matchNl(peek())) {
      skip();
    }
  };

  const maybeBinary = (left, prec) => {
    return left;
  };

  const parseCall = (func) => {};

  const maybeCall = (expr) => {
    expr = expr();
    return matchLparen(peek()) ? parseCall(expr) : expr;
  };

  /**
   * atom ->
   *    '(' expr ')'
   *  | number
   *  | string
   */
  const parseAtom = () => {
    let tok = peek();

    return maybeCall(() => {
      if (matchLparen(tok)) {
        // parenthesized expression
        skip();

        const expr = parseExpr();

        skipIf(matchRparen, ")");

        return expr;
      }

      // Must be an identifier or primitive literal
      skip();

      if (matchNumTok(tok)) {
        return Number(makePrimNode("Number", tok));
      }

      if (matchString(tok)) {
        return String(makePrimNode("String", tok));
      }

      if (matchBool(tok)) {
        return Boolean(makePrimNode("Boolean", tok));
      }

      if (matchNil(tok)) {
        return Nil(makePrimNode("Nil", tok));
      }

      if (matchIdentifier(tok)) {
        return Var(makePrimNode("Var", tok));
      }

      croak(`Unknown token ${tok.value} at line: ${tok.line}, col: ${tok.col}`);
    });
  };

  /**
   * expr ->
   *    atom
   */
  const parseExpr = () => {
    return maybeCall(() => maybeBinary(parseAtom(), 0));
  };

  /**
   * expression -> expr exprterm
   */
  const parseExpression = () => {
    const expr = parseExpr();

    // enforce having either a newline or semicolon between expressions
    if (!eof()) {
      skipIf(matchExpTerm, "newline or ;");
    }

    skipNewlines(); // to allow for blank lines between expressions

    return expr;
  };

  /**
   * program -> expression*
   */
  const parseProgram = () => {
    const start = input[0] ? { line: input[0].line, col: input[0].col } : null;
    const last = input[input.length - 1];
    const end = last ? { line: last.line, col: last.col } : null;
    let prog = [];

    skipNewlines(); // in case there are blank lines at the top of the input

    while (!eof()) {
      prog.push(parseExpression());
    }

    return Program({
      node: "Program",
      prog,
      start,
      end,
    });
  };

  return parseProgram();
};

export default (code) => pipeline(code, raw, eof, lex, parse);
