import parse from "./parser.cjs";

const code = `func(1, 2, 3, 4, 5)`;

const parsed = parse(code);
console.log(JSON.stringify(parsed, null, 2));
