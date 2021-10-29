exports.pipe = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);

exports.point = ({ line, col } = {}) => ({ line, col });

exports.first = (arr) => arr[0];

exports.last = (arr) => arr[arr.length - 1];
