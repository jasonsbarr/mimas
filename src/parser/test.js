import parse from "./parser.js";

const code = `let mutable x: number = 10`;

const parsed = parse(code);
console.log(JSON.stringify(parsed, null, 2));
