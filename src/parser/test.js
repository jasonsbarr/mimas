import parse from "./parser.js";

const code = `func(1)`;

const parsed = parse(code);
console.log(String(parsed));
