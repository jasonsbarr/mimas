@{%
  import { lexer } from "./lexer.js";
%}

@lexer lexer

program -> expression:*

expression -> expr expterm

expr ->
    atom

atom ->
    symbol
  | string
  | number
  | boolean
  | nil

symbol -> %symbol

string -> %string

number ->
    %number
  | %hexlit
  | %octlit
  | %binlit

boolean ->
    %true
  | %false

nil -> %nil

expterm ->
    %NL
  | %semi
