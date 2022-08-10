/**
 * object deep compare
 * @param { Object }
 */
function deepCompare() {
  var i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    var p;

    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === 'number' &&
      typeof y === 'number'
    ) {
      return true;
    }

    if (x === y) {
      return true;
    }

    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (
      Object.prototype.isPrototypeOf.call(x, y) ||
      Object.prototype.isPrototypeOf.call(y, x)
    ) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    for (p in y) {
      if (
        Object.prototype.hasOwnProperty.call(y, p) !==
        Object.prototype.hasOwnProperty.call(x, p)
      ) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (
        Object.prototype.hasOwnProperty.call(y, p) !==
        Object.prototype.hasOwnProperty.call(x, p)
      ) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true;
  }

  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = [];
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }

  return true;
}

/**
 * object key add
 * @param { Object } obj
 * @param { Array } prop
 */
const objectKeyAdd = (obj, prop) => {
  return Object.keys(obj).reduce((newObj, key) => {
    if (prop.includes(key)) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
};

export { objectKeyAdd, deepCompare };
