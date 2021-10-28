import { lexer } from "./lexer.js";
import nearley from "nearley";
import grammar from "./grammar.js";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const eof = (code) => code.concat(" <*endofinput*>");

// Filter out whitespace tokens so they don't clutter up the parser grammar
const lex = (input) => [...lexer.reset(input)].filter((t) => t.type !== "WS");

export const parse = (code) => parser.feed(lex(eof(code)));
