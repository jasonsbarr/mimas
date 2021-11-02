import parse from "./parser.js";

const code = `fun (a: number, b: number): number -> a + 1`;

const parsed = parse(code);
console.log(JSON.stringify(parsed, null, 2));
