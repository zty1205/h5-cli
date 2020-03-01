export function setRem (pageSize) {
  let wWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
  document.getElementsByTagName('html')[0].style.fontSize = wWidth / pageSize * 100 + 'px'
}

export function fixRem() {
  let html = document.getElementsByTagName("html")[0];
  let originFontSize = parseFloat(html.style.fontSize);
  let hideDom = document.createElement("div");
  document.body.appendChild(hideDom);
  hideDom.style.cssText = "position: absolute; top: -10000px; left: -10000px; width: 1rem";
  let currentWidth = parseFloat(hideDom.offsetWidth);
  if (currentWidth != originFontSize) {
    html.style.fontSize = originFontSize / currentWidth * originFontSize + "px";
  }
  hideDom.parentElement.removeChild(hideDom);
}

export const emptyObject = Object.freeze({});

export function isUndef(v) {
  return v === undefined || v === null;
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isPrimitive(v) {
  return (
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "symbol" ||
    typeof v === "boolean"
  );
}

export function isObject(obj) {
  // 数组的话 Array.isArray()
  return obj !== null && typeof obj === "object";
}

// JSON.stringify(obj) === "{}"
// for in 循环
// Object.getOwnPropertyNames() === 空数组                                 )
export function isObjectEmpty(obj) {
  if (!isObject(obj)) {
    console.warn(`The argument ${obj} is not a Object`);
    return false;
  }
  return Object.keys(obj).length !== 0 || Object.values(obj).length !== 0;
}

/* eslint-disable no-prototype-builtins */
export function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj === "null" || typeof obj !== "object") {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let o = new obj.constructor();
  hash.set(obj, o);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      o[key] = deepClone(obj[key], hash);
    }
  }
  return o;
}

export function jsonCopy(obj) {
  if (isDef(obj)) {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString;

export function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 * {} 或 new Object 创建的
 */
export function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}

export function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}

/**
 * Check if val is a valid array index.
 */
export function isValidArrayIndex(val) {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

export function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(val) {
  return val == null
    ? ""
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

export function getRandomInteger(min, max) {
  if (isDef(min) && isUndef(max)) {
    min = 0;
    max = min;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}

/**
 * Remove an item from an array.
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Mix properties into target object.
 */
export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr) {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
export function looseIndexOf(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i;
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
export function once(fn) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

// export function curry(fn, ...args) {
//   return args.length < fn.length ? (...arguments) => curry(fn, ...args, ...arguments) : fn(...args)
// }

export function flattenDeepArray(arr, dep = Math.pow(2, 53) - 1) {
  return arr.flat(dep);
}

export function flattenDeepArraySimple(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(acc)
        ? acc.concat(flattenDeepArraySimple(val))
        : acc.concat(val),
    []
  );
}

// 防抖函数
export function debounce(func, wait, immediate = true) {
  let timeout, result;
  const later = (context, args) =>
    setTimeout(() => {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }, wait);
  let debounced = function(...params) {
    if (!timeout) {
      timeout = later(this, params);
      if (immediate) {
        // 立即执行
        result = func.apply(this, params);
      }
    } else {
      clearTimeout(timeout);
      // 函数在每个等待时延的结束被调用
      timeout = later(this, params);
    }
    return result;
  };
  // 提供外部清空定时器的方法
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}

export function throttle(func, wait, options = {}) {
  let timeout, context, args, result;
  let previous = 0;
  const later = () => {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  let throttled = function(...params) {
    let now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    // remain 为距离下次执行 func 的时间
    let remain = wait - (now - previous);
    context = this;
    args = params;
    // remain > wait 表示客户端时间被调整过
    if (remain <= 0 || remain > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(this, params);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remain);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
}
