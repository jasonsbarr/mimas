const pipe = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);

module.exports = { pipe };
