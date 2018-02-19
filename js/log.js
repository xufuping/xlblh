//登录界面数据代码
$(function(){
	if($.cookie('userId') && $.cookie('userId')!='null'){
		// alert($.cookie('userId'));
		$('#login').css('display','none');
	    $('#regist').css('display','none');
	    $('#login_userName').html($.cookie('userName')).css('display','inline');
		$('#login_close').css('display','inline');
		$('#login_close').click(function(){
			$.cookie("userName",null,{path:"/"});
			$.cookie("userId",null,{path:"/"});
			$.cookie("schoolId",null,{path:"/"});
			window.location.reload();//刷新当前页面.
		})
	} else {
		$('#login_userName').css('display','none');
		$('#login_close').css('display','none');
		$('.log_btn').click(function(){
			if($('.userName').val() == "" || $('.password').val() == ""){
				alert("用户名或密码不为空");
				//不为空发送ajax交互
			}else {
				$.ajax({
					type:"GET",//提交请求的方式
					cache:true,//是否有缓存
					url:"/Login.do",
					data: {
						userName: $('.userName').val(),
						password: $('.password').val()
					},
					success: function(data){
						if(data.status == '1'){
							var userData = data.object;
							$.cookie('userName',userData.username,{path: '/'});
							$.cookie('userId',userData.userid,{path: '/'});
							$.cookie('schoolId',userData.schoolid,{path: '/'});

							// $('#login_close').click(function(){
							// 	$.cookie("userName",null,{path:"/"});
							// 	$.cookie("userId",null,{path:"/"});
							// 	$.cookie("schoolId",null,{path:"/"});
							// 	window.location.reload();//刷新当前页面.
							// })
							window.location.reload();//刷新当前页面.
						}else{
							alert("登录验证失败,请重试");
						}
					},
					error: function() {
						alert("服务器错误");
					}//请求出错
				})//ajax的反括号
			}
		});
	}
})//JQ的反括号

//登录盒子出现
$(function(){
	var oLog = document.getElementById('login');
	var oClose = document.getElementById('close');
	var oLog_card = document.getElementById('log_card');
	var oMask = document.getElementById('mask');
	var height = document.documentElement.scrollHeight;
	oMask.style.height=height + 'px';
	oLog.onclick = function (click){
		oLog_card.style.display = 'block';
		oMask.style.display = 'block';
		click.stopPropagation();
		return false;
	}
	oClose.onclick = disappear;
	oMask.onclick = disappear;
	function disappear(){
		oLog_card.style.display = 'none';
		oMask.style.display = 'none';
	}
});

//搜索框
$(function(){
	$('#Search_span').click(function(){
		if($.cookie('userId') && $.cookie('userId')!='null'){
			var reg = /^[a-zA-Z\u4e00-\u9fa5]{1,999}$/;
			if (reg.test($('#Search_input').val())) {
				//$('#Search_input').val()
				window.location.href = 'searchpage.html' + '?text='+$('#Search_input').val() ;
			}
			else{
				alert("不能为空或者数字或者特殊字符");
			}
		}else{
			alert("请登录");
		}
	})
});