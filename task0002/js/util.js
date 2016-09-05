/**
 * Created by Rong08077 on 16/09/03
 */

// task 2.1.1 
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
	// 方法1 ES 5
    // return Array.isArray(arr);
    // 方法2
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

// task 2.1.2  
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
	var clone =src;

	// Date
	if (src instanceof Date) {
		// 使用new 调用基本包装类型的构造函数 ，创建对象
        clone = new Date(src.getDate());
        return clone;
    }

    // Array
    // for in 遍历Array，变量key为Array元素的索引
    if (src instanceof Array) {
            clone = [];
            for (var key in src) {
                clone[key] = cloneObject(src[key]);
            }
            return clone;
    }

    // Object
    // for in 遍历Object，变量key为Object的属性名
    if (src instanceof Object) {
        clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {       // 忽略掉继承属性
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone;
    }

    return src;
}

// 测试用例：
/*
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
*/

// task 2.1.3 
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(source) {
    var len = source.length,
        result = source.slice(0),
        i, datum;


    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];//
        i = len;
        while (i--) {
            if (datum === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
}

// hash
function uniqArray1(arr) {
    var obj = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {

        var key = arr[i];

        if (!obj[key]) {
            result.push(key);
            obj[key] = true;
        }
    }
    return result;
}


// hash + es5
// 速度最快
function uniqArray2(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

function uniqArray3(arr) {
    var new_array = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0 ) {    // indexOf方法不支持IE9以下
            new_array.push(arr[i]);
        }
    }
    return new_array;
}

// 使用示例
/*
var al = 10000;
var a = [];
while (al--){
a.push(al%2);
}

console.time('uniqArray')
console.log(uniqArray(a).length);
console.timeEnd('uniqArray')

console.time('uniqArray1')
console.log(uniqArray1(a).length);
console.timeEnd('uniqArray1')

console.time('uniqArray2')
console.log(uniqArray2(a).length);
console.timeEnd('uniqArray2')

console.time('uniqArray3')
console.log(uniqArray3(a).length);
console.timeEnd('uniqArray3')
*/