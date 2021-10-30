import parse from "./parser.cjs";

const code = `let x = 10`;

const parsed = parse(code);
console.log(JSON.stringify(parsed[0], null, 2));
console.log("# of parses:", parsed.length);
