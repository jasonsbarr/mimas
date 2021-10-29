const nearley = require("nearley");
const { pipe } = require("../utils");
const lexer = require("./lexer.js");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const raw = (str) => String.raw`${str}`;

const eof = (code) => code.concat(" <*endofinput*>");

// Filter out whitespace tokens so they don't clutter up the parser grammar
const lex = (input) => [...lexer.reset(input)].filter((t) => t.type !== "WS");

const feed = (tokens) => parser.feed(tokens);

const parse = (code) => pipe(code, raw, eof, lex, feed).results;

module.exports = parse;
