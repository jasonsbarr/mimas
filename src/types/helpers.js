const cons = (car, cdr) => [car, cdr];
exports.cons = cons;

const fst = (pair) => pair[0];
exports.fst = fst;

const snd = (pair) => pair[1];
exports.snd = snd;
