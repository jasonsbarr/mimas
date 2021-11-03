import parse from "./parser.js";

const code = `let x = 10 in x + 1`;

const parsed = parse(code);
console.log(JSON.stringify(parsed, null, 2));
