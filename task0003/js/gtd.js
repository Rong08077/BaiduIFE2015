/**
 * Created by DIYgod on 15/5/10.
 */

// localStorage + JSON 存储任务数据
// cate代表分类，childCate代表子分类，task代表任务
var cate;
var childCate;
var task;

var cateText = '['
	+ '{'
	+     '"id": 0,'
	+     '"name": "默认分类",'
	+     '"child": [0]'
	+ '},'
	+ '{'
	+     '"id": 1,'
	+     '"name": "百度IFE项目",'
	+     '"child": [1, 3]'
	+ '}'
	+ ']';

var childCateText = '['
	+ '{'
	+     '"id": 0,'
	+     '"name": "默认子分类",'
	+     '"child": [],'
	+     '"father": 0'
	+ '},'
	+ '{'
	+     '"id": 1,'
	+     '"name": "task0001",'
	+     '"child": [0, 1, 2],'
	+     '"father": 1'
	+ '},'
	+ '{'
	+     '"id": 3,'
	+     '"name": "task0002",'
	+     '"child": [3],'
	+     '"father": 1'
	+ '}'
	+ ']';

var taskText = '['
	+ '{'
	+     '"id": 0,'
	+     '"name": "to-do 1",'
	+     '"father": 1,'
	+     '"finish": true,'
	+     '"date": "2015-05-28",'
	+     '"content": "开始 task0001 的编码任务。"'
	+ '},'
	+ '{'
	+     '"id": 1,'
	+     '"name": "to-do 3",'
	+     '"father": 1,'
	+     '"finish": true,'
	+     '"date": "2015-05-30",'
	+     '"content": "完成 task0001 的编码任务。"'
	+ '},'
	+ '{'
	+     '"id": 2,'
	+     '"name": "to-do 2",'
	+     '"father": 1,'
	+     '"finish": false,'
	+     '"date": "2015-05-29",'
	+     '"content": "重构 task0001 的编码任务。"'
	+ '},'
	+ '{'
	+     '"id": 3,'
	+     '"name": "to-do 4",'
	+     '"father": 3,'
	+     '"finish": false,'
	+     '"date": "2015-06-29",'
	+     '"content": "完成 task0002 的编码任务。"'
	+ '}'
	+ ']';

// 生成任务分类列表
function makeType() {
	setNum();               // 刷新分类对象的num属性
	var oldChoose = $('.type-wrap .choose');    // 保存正在选中的分类选项
	$('#type-all').innerHTML = '<i class="icon-menu"></i><span>所有任务</span>(' + task.length + ')'
	var html = '';
	for (var i = 0; i < cate.length; i++) {
		html += ''
			+ '<li>'
			+     '<h3 onclick="typeClick(this)">'
			+         '<i class="icon-folder-open-empty"></i><span>' + cate[i].name + '</span>(' + cate[i].num + ')<i class="delete icon-minus-circled" onclick="del(event, this)"></i>'
			+     '</h3>'
			+     '<ul class="item">';

		for (var j = 0; j < cate[i].child.length; j++) {
			var childNode = getObjByKey(childCate, 'id', cate[i].child[j]);
			html += ''
				+         '<li>'
				+             '<h4 onclick="typeClick(this)">'
				+                 '<i class="icon-doc-text"></i><span>' + childNode.name + '</span>(' + childNode.child.length + ')<i class="delete icon-minus-circled" onclick="del(event, this)"></i>'
				+             '</h4>'
				+         '</li>'
		}
		html += ''
			+     '</ul>'
			+ '</li>'
	}
	html = html.replace(/<i class="delete icon-minus-circled" onclick="del\(event, this\)"><\/i>/, '');    // 去掉默认分类的删除按钮
	html = html.replace(/<i class="delete icon-minus-circled" onclick="del\(event, this\)"><\/i>/, '');    // 去掉默认子分类的删除按钮
	$('.item-wrap').innerHTML = html;

	if (oldChoose) {                                          // 恢复之前选中的选项
		var tag = oldChoose.tagName.toLowerCase();
		var name = oldChoose.getElementsByTagName('span')[0].innerHTML;
		var isClick = false;
		switch (tag) {
			case 'h2':
				$('h2').click();
				isClick = true;
				break;
			case 'h3':
				var cateEle = document.getElementsByTagName('h3');
				for (var i = 0; i < cateEle.length; i++) {
					if (cateEle[i].getElementsByTagName('span')[0].innerHTML === name) {
						cateEle[i].click();
						isClick = true;
						break;
					}
				}
				break;
			case 'h4':
				var childEle = document.getElementsByTagName('h4');
				for (var i = 0; i < childEle.length; i++) {
					if (childEle[i].getElementsByTagName('span')[0].innerHTML === name) {
						childEle[i].click();
						isClick = true;
						break;
					}
				}
				break;
		}
		if (!isClick) {                                   // 之前选中的元素不再显示的情况
			$('h2').click();
		}
	}
	else {                   // 否则默认选择第一个分类
		$('h2').click();
	}

	makeTask();
}

// 生成任务列表
function makeTask() {
	var oldChoose = $('.task-wrap .choose');     // 保存正在选中的任务
	$('.status li').click();                     // 点击所有选项
	var ele = $('.type-wrap .choose');
	var eleTag = ele.tagName.toLowerCase();
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	var taskIdArr = [];
	switch (eleTag) {
		case 'h2':                               // 选中了所有任务
			for (var i = 0; i < task.length; i++) {
				taskIdArr.push(task[i].id);
			}
			makeTaskById(taskIdArr);
			break;
		case 'h3':                               // 选中了分类
			var cateObj = getObjByKey(cate, 'name', name);     // 得到任务分类对象
			for (var i = 0; i < cateObj.child.length; i++) {
				var childObj = getObjByKey(childCate, 'id', cateObj.child[i]);  // 得到任务子分类对象
				for (var j = 0; j < childObj.child.length; j++) {
					taskIdArr.push(childObj.child[j]);
				}
			}
			makeTaskById(taskIdArr);
			break;
		case 'h4':                               // 选中了子分类
			var childObj = getObjByKey(childCate, 'name', name);  // 得到任务子分类对象
			for (var i = 0; i < childObj.child.length; i++) {
				taskIdArr.push(childObj.child[i]);
			}
			makeTaskById(taskIdArr);
			break;
	}

	if (oldChoose) {                                          // 恢复之前选中的选项
		var childEle = document.getElementsByTagName('h6');
		var oldName = oldChoose.getElementsByTagName('span')[0].innerHTML;
		var isClick = false;
		for (var i = 0; i < childEle.length; i++) {
			if (childEle[i].getElementsByTagName('span')[0].innerHTML === oldName) {
				childEle[i].click();
				isClick = true;
				break;
			}
			if (!isClick && $('h6')) {                                   // 之前选中的元素不再显示的情况
				$('h6').click();
			}
		}
	}
	else if ($('h6')) {                   // 否则默认选择第一个任务
		$('h6').click();
	}

	makeDetails();
}


// 刷新分类对象的num属性
function setNum() {
	var sum;
	for (var i = 0; i < cate.length; i++) {
		sum = 0;
		for (var j = 0; j < cate[i].child.length; j++) {
			var childNum = getObjByKey(childCate, 'id', cate[i].child[j]).child.length;
			sum += childNum;
		}
		cate[i].num = sum;
	}
}

// 根据某对象的某属性得到某对象
function getObjByKey(obj, key, value) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i][key] === value) {
			return obj[i];
		}
	}
}

window.onload = function () {
	if (!localStorage.getItem('cate')) {  // 页面之前没被访问过的情况，载入默认值
		localStorage.cate = cateText;
		localStorage.childCate = childCateText;
		localStorage.task = taskText;
		$('#type-all').className = 'choose';
	}
	cate = JSON.parse(localStorage.cate);
	childCate = JSON.parse(localStorage.childCate);
	task = JSON.parse(localStorage.task);
	makeType();
}