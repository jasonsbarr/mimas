import parse from "./parser.js";

const code = `1 + 2`;

const parsed = parse(code);
console.log(JSON.stringify(parsed, null, 2));
