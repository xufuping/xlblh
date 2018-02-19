﻿$(document).ready(function(){
    
	$(".register_container input").blur(function(){

		var $parent=$(this).parent();
		//验证昵称
        if($(this).is("#userName")){
        	$parent.find('.errorMsg_on').remove();
        	if(this.value == " " || this.value.length < 4){
        		var errorMsg="请输入至少4位的昵称";
         		$parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
        	}else if(/[0-9]/.test(this.value)){
        		var numMgs="请输入不包含数字的昵称";
        		$parent.append('<span class="errorMsg_on">'+numMgs+'</span>');
        	}else if(/[^a-zA-Z0-9\_\u4e00-\u9fa5]/.test(this.value)){
        		var charMgs="请不要输入非法字符！";
        		$parent.append('<span class="errorMsg_on">'+charMgs+'</span>');
        	}else{
        		var okMgs="输入正确！";
        		$parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
        	}
        }

        //验证密码
        if($(this).is("#passWord")){
        	$parent.find('.errorMsg_on').remove();
        	if(this.value == ''){
        		var errorMsg="密码不能为空哦，亲！";
         		$parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
        	}else if(this.value.length < 6){
        	    var wordMgs="密码的长度为6~18位哦！";
        		$parent.append('<span class="errorMsg_on">'+wordMgs+'</span>');
        	}else if(this.value.length > 18){
        		var charMgs="密码的长度为6~18位哦！";
        		$parent.append('<span class="errorMsg_on">'+charMgs+'</span>');
        	}
        	else if(/[^a-zA-Z0-9]/.test(this.value)){
        		var charMgs="密码由数字和字母组成！";
        		$parent.append('<span class="errorMsg_on">'+charMgs+'</span>');
        	}else{
        		var okMgs="输入正确！";
        		$parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
        	}
        }

        //确认密码
        if ($(this).is("#agpassWord")){
        	$parent.find('.errorMsg_on').remove();
        	if(this.value ==""){
            	var errorMsg="不能为空";
         		$parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
            }else if(this.value != $("#passWord").val()){
          	    var agMgs="两次输入的密码不一致，请重新输入！";
        		$parent.append('<span class="errorMsg_on">'+agMgs+'</span>');
            }else{
            	var okMgs="输入正确！";
        		$parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
            }
	    }

	    //验证邮箱
	    if ($(this).is("#email")){
        	$parent.find('.errorMsg_on').remove();
        	if( !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())){
          	    var agMgs="请输入正确的邮箱格式！";
        		$parent.append('<span class="errorMsg_on">'+agMgs+'</span>');
            }else if(this.value.length == 0){
            	var errorMsg="不能为空";
         		$parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
         	}else{
            	var okMgs="输入正确！";
        		$parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
            }
	    }
    });
    //请求验证码
    (function(){
        $.ajax({
        type: 'GET',
        url: '/ImageCode.do',
        'success': function(){
                var $img=$("<img src='/ImageCode.do'>");
                $(".checked_box").html($img);
        }
        });
    })(); 


        //请求刷新验证码图片
        $(".checked_box").click(function(){
            $.ajax({
            type: 'GET',
            url: '/ImageCode.do',
            'success': function(){
                
                    var $img=$("<img src='/ImageCode.do'>");
                    $(".checked_box").html($img);
            }
             
            });
            $(this).attr('src','/ImageCode.do?'+Math.random());
        });


    //提交数据
    $(".register_login").click(function(){
        $.ajax({
    		type:'GET',
    		dataType:'json',
            url:"/Register.do",
            data:{
                password: $('#passWord').val(),
                email: $('#email').val(),
                schoolname: $("#schoolName").val(),
                studentnumber: $('#studentNumber').val(),
    			code: $('#imgCode').val(),
                username: $("#userName").val()
            },
            success:function(data){
                if( data.status == 1) {
                    alert( "注册成功！请登录" );
                    window.location.href="shouye.html";
                }else {
                // 注册失败
                var errorMsg = data.message;
                    alert(errorMsg);
                }
            },
			error: function(){
				alert("网络错误！");
			}
        });
    });


});


 
