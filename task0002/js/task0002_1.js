function showHobby() {
	var text = $('.myTextArea').value;
	text = text.replace(/[\s,，、;；]+/g, ' ');    
	var hobby = text.split(' ');                  
	hobby = uniqArray2(hobby);     

	if (hobby.length < 1) {
		$('.error').innerHTML = '请输入至少一个爱好';		
	}
	else if (hobby.length > 10) {
		$('.error').innerHTML = '爱好数量不能超过10个';

	}
	else {
		$('.error').innerHTML = '';               // 删除旧元素
		if ($('.result')) {
		    $('.center').removeChild($('.result'));
		}

		var result = document.createElement('div');
		result.className = 'result';
		var h3 = document.createElement('h3');
		h3.innerHTML = '爱好：';
		result.appendChild(h3);
		for (var i = 0, len = hobby.length; i < len; i++) {
		    var checkbox = document.createElement('input');
		    checkbox.type = 'checkbox';
		    result.appendChild(checkbox);
		    var data = document.createTextNode(hobby[i] + ' ');
		    result.appendChild(data);
		}
		$('.center').appendChild(result);
	}
}

function reset() {
    $('.error').innerHTML = '';
    $('.myTextArea').value = '';
    if ($('.result')) {
        $('.center').removeChild($('.result'));
    }
}