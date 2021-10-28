const nearley = require("nearley");
const { pipe } = require("@jasonsbarr/functional-core/lib/lambda/pipe");
const lexer = require("./lexer");
const grammar = require("./grammar");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const raw = (str) => String.raw`${str}`;

const eof = (code) => code.concat(" <*endofinput*>");

// Filter out whitespace tokens so they don't clutter up the parser grammar
const lex = (input) => [...lexer.reset(input)].filter((t) => t.type !== "WS");

const parse = (code) => pipe(code, raw, eof, lex, parser.feed).results;

module.exports = parse;
