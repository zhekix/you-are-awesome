const createEnumerableProperty = x => x;

const createNotEnumerableProperty = (x) => {
	Object.defineProperty(Object.prototype, x, {
        enumerable: false,
        get: () => Object.prototype._value,
        set: (value) => Object.prototype._value = value
    });
    return x;
};

const createProtoMagicObject = () => {
  let obj = () => {};
  obj.prototype = obj.__proto__;
  return obj;
};

var count = 0;
const incrementor = () => {
	count++;
	return incrementor;
};
incrementor.toString = () => count;

var countFotIncr = 0;
const asyncIncrementor = () => {
	 return new Promise(resolve => {
        countFotIncr++;
        return resolve(countFotIncr);
    });
};

const createIncrementer = () => {
  return {
        i: 0,
        next() {
            return { value: ++this.i }
        },
        [Symbol.iterator]() {
            return {
                next: () => {
                    return this.next();
                },
            };
        },
    };
};

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (x) => {
	return new Promise(resolve => {
        setTimeout(() => resolve(x), 1000);
    });
};

const getDeepPropertiesCount = (x) => {
	let props = Object.getOwnPropertyNames(x);
    let a = props.length;
    props.forEach(prop => {
        if (Object.getOwnPropertyNames(x[prop]).length > 0){
            a += getDeepPropertiesCount(x[prop]);
        };
    });
    return a;
};

const createSerializedObject = () => null;

const sortByProto = (x) => {
	return x.map((a, i) => {
        let count = 0;
        while (a = a.__proto__){
             count++;
        }
        return [count, x[i]];
    }).sort((y, z) => y[0] - z[0]).map(([a, i]) => i);
};


exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;
