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

