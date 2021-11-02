import parse from "./parser.js";

const code = `let add2 = fun (a, b) -> a + b`;

const parsed = parse(code);
console.log(JSON.stringify(parsed, null, 2));
