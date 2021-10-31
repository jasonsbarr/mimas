import parse from "./parser.cjs";

const code = `let a = 10`;

const parsed = parse(code);
console.log(JSON.stringify(parsed[0], null, 2));
console.log("# of parses:", parsed.length);
