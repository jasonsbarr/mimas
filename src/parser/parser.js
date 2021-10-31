import { pipeline } from "@jasonsbarr/functional-core/lib/lambda/pipeline.js";
import lexer from "./lexer.js";

const raw = (str) => String.raw`${str}`;
const eof = (code) => code.concat(" <*endofinput*>");
// Filter out whitespace tokens so they don't clutter up the parser grammar
const lex = (input) => [...lexer.reset(input)].filter((t) => t.type !== "WS");

const parse = (tokens) => {
  let pos = -1;

  const parseAtom = {};

  const parseExpr = {};

  const parseProgram = {};
};

export default (code) => pipeline(code, raw, eof, lex, parse);
