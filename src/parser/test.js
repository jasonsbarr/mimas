import parse from "./parser.cjs";

const code = `1
2
"hello"
true
nil
greeting

4`;

console.log(JSON.stringify(parse(code), null, 2));
