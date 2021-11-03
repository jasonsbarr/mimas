import parse from "./parser.js";

const code = `if true then 1 else 0`;

const parsed = parse(code);
console.log(JSON.stringify(parsed, null, 2));
