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
