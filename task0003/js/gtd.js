/**
 * Created by Rong08077 on 2016/10/18.
 */
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
	setNum()
	var oldChoose = $('.type-wrap .choose');
	$('#type-all').innerHTML = '<i class="icon-menu-1"></i><span>所有任务</span>(' + task.length + ')'
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

	if (oldChoose) {
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
					if (cateEle[i].getElementsByTagName('span')[0].innerHTML === name ) {
						cateEle[i].click();
						isClick = true;
					}
				}
				break;
			case 'h4':
				var childEle = document.getElementsByTagName('h4');
				for (var i = 0; i < childEle.length; i++) {
					if (childEle[i].getElementsByTagName('span')[0].innerHTML === name) {
						childEle[i].click();
						isClick = true;
					}
				}
				break;
		}
		if (!isClick) {                                   // 之前选中的元素不再显示的情况
			$('h2').click();
		}
	}
	else {
		$('h2').click();
	}


}

// 得到分类对象的num属性
function setNum() {
	var sum;
	for (var i = 0; i < cate.length; i++) {
		sum = 0;
		for (var j = 0; j < cate[i].child.length; j++) {
			var childNum = getObjByKey(childCate,'id',cate[i].child[j]).child.length;
			sum += childNum;
		}
		cate[i].num = sum;
	}
}

// 根据对象的属性，得到对象
function getObjByKey(obj, key,value) {
	for (var i = 0;i < obj.length;i++) {
		if (obj[i][key] === value) {
			return obj[i];
		}
	}
}

// 点击效果
function typeClick(ele) {
	var temp = ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var otherChoose = ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('*');
	for (var i = 0;i < otherChoose.length; i++) {
		if (otherChoose[i].className === 'choose') {
			otherChoose[i].className = '';
			break;
		}
	}
	ele.className = 'choose';

}
// newType 弹窗
function newType() {
	$('.pop').style.display = 'block';
	$('.overlay').style.display = 'block';
	$('.pop-name').innerHTML = '新增分类';
	var html = ''
		+ '<p>'
		+     '新分类名称:'
		+     '<input type="text" class="myText typeText" placeholder="在此输入新分类的名称">'
		+ '</p>'
		+ '<p>'
		+     '新分类父节点:'
		+     '<select class="mySelect">'
		+         '<option value="-1">无</option>'

	var itemWrap = $('.item-wrap');
	var itemName = itemWrap.getElementsByTagName('h3');
	for (var i = 0; i < itemName.length; i++) {
		html += ''
			+     '<option value="'+ i +'">'
			+        itemName[i].getElementsByTagName('span')[0].innerHTML
			+      '</option>'
	}

	html += ''
		+     '</select>'
		+ '</p>'
		+ '<p class="error"></p>'
		+ '<button class="myButton btn1" onclick="closePop()">取消</button>'
		+ '<button class="myButton btn2" onclick="typeAdd()">确定</button>'

	$('.pop-content').innerHTML = html;

}

//关闭 弹窗
function closePop() {
	$('.pop').style.display = 'none';
	$('.overlay').style.display = 'none';
}

window.onload = function() {
	//h5 web 存储
	if(!localStorage.getItem('cate')){
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