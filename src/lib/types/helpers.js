const cons = (car, cdr) => [car, cdr];
exports.cons = cons;

const fst = (pair) => pair[0];
exports.fst = fst;

const snd = (pair) => pair[1];
exports.snd = snd;

const point = ({ line, col } = {}) => ({ line, col });
exports.point = point;

const first = (arr) => arr[0];
exports.first = first;

const last = (arr) => arr[arr.length - 1];
exports.last = last;
