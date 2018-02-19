$(document).ready(function(){

	 var COOKIE_NAME_userName = 'userName';
    var COOKIE_NAME_password = 'password';
    var COOKIE_NAME_userId = 'userId';
    var COOKIE_NAME_schoolId = 'schoolId';
    //判断是否缓存，如果缓存过直接调用
    if($.cookie(COOKIE_NAME_userName)){
        username = $.cookie(COOKIE_NAME_userName);
        password = $.cookie(COOKIE_NAME_password);
        userid = $.cookie(COOKIE_NAME_userId);
        schooid = $.cookie(COOKIE_NAME_schoolId);
        }else{
            alert('登陆缓存已被清空');
    }

	// 获取查询字符串方法
	function getSearchString(key) {

	    // 获取URL中?之后的字符
	    var str = location.search;
	    str = str.substring(1,str.length);
	   
	    // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
	    var arr = str.split("&");
	    var obj = new Object();
	   
	    // 将每一个数组元素以=分隔并赋给obj对象    
	    for(var i = 0; i < arr.length; i++) {
	        var tmp_arr = arr[i].split("=");
	        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
	    }
	    return obj[key];
    }

    $.ajax({
	type: 'GET',
	url: '/GetSchoolInformation.do',
	data: {
		'schoolId':$.cookie(COOKIE_NAME_schoolId)
	},
	success: function(data){
		var schoolData;
		var str = '';
		var logoStr = '';
		if(data.status === '0') {
			alert(data.message);
		} else {
			schoolData= data.object;
			str ='<div class="mancenter_msg_box1">'+
				  '<p>'+'地址：'+schoolData.address+'</p>'+
                  '<p>'+'创办时间：'+schoolData.builddate+'年'+'</p>'+
                  '<p>'+'知名校友：'+schoolData.schoolmate+'等'+'</p>'+
                  '</div>';
            logoStr = ' <img class="mancenter_msg_box" src="'+ schoolData.logo +'">'
		}
		$(".basenews").html(schoolData.information);
		$(".mancenter_msg").append(logoStr);
		$('.mancenter_msg').append(str);
		$("#hository").html(schoolData.history);
		$("#learning").html(schoolData.learning);
		$("#culture").html(schoolData.culture);
	}
});

    
})
 