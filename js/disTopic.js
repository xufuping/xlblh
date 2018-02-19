$(function(){
	
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
//分页按钮背景变换
    function bgColor(){
        if (index == 0) {
                $('#page_prev').hide();
                $('#page_next').show();
            }
            else if(index>0 && index<pageNum-1){
                $('#page_prev').show();
                $('#page_next').show();
            }
            else if (index == pageNum-1) {
                $('#page_next').hide();
                $('#page_prev').show();
            }
    }
//提交主题
    (function(){
        $('#sub').click(function(){
            $.ajax({
                type : "GET",
                url : "/AddTopic.do",
                data : {
                    topicname : $(".mytitle").val(),
                    schoolid : $.cookie(COOKIE_NAME_schoolId),
                    userid : $.cookie(COOKIE_NAME_userId)
                },
                success : function(data){
                    if (data.status === 0) {
                        alert(data.message);
                    } else{
                        alert("提交成功");
                        window.location.reload();
                    }
                },
                error : function(data){
                    alert("提交失败，请重试");
                }
            });
        });
    })();
//分页按钮
    var pageNum; 
    var itemNum;
    var nowPage = 1;
	var index;
	var pageData;
    (function(){
        
        //获取文章数目
        $.ajax({
            type: 'GET',
            url: '/getTopicNum.do',
            data:{
                schoolId : $.cookie(COOKIE_NAME_schoolId),
                userId : $.cookie(COOKIE_NAME_userId)
            },
            success: function(data){
                if(data.status === '0') {
                    alert(data.message);    
                }
                else{
                    var postContentStr='';
                    itemNum = data.object;
                    pageNum = Math.ceil(itemNum/10);
                    var pageBtnStr = '';
                    for(var i = 1; i <= pageNum; i++) {
                        pageBtnStr += '<li class="page_li">'+ i +'</li>';
                    }
                    $('.page_ul').append(pageBtnStr);
                }
            }
        });
    })();
//默认页
    (function(){
				index =0;
				nowPage = 1;
                $('.page_li').eq(0).addClass('pageColor').siblings().removeClass('pageColor');
                $.ajax({
                    type : "GET",
                    url : "/GetTopicsBySchool.do",
                    data :{
                        nowPage : nowPage,
                        pagesize : 10,
                        schoolId : $.cookie(COOKIE_NAME_schoolId)
                    },
                    success : function(data){
						//console.log(data);
                        var postContentStr = '';
                        var pageData;
                        if (data.status === '0'){
                            alert(data.message);
                        }else{
                            pageData = data.object;
                            console.log(pageData);
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<div>'+
			                                    '<a href="grassDis.html?topicname=' + pageData[j].topicname + '&topicId='+ pageData[j].topicid +'" class="wraper_title">'+pageData[j].topicname+'</a>'+
		                                     '</div>';
                            }
                        $('#wraper').html(postContentStr);
                        }   
				}
            });
			(function(){
                    bgColor();
            })()

    })();

//分页按钮点击
    
    var userdata;
    (function(){
        $('.page_li').click(function(){
            $(this).addClass('pageColor').siblings().removeClass('pageColor');
            nowPage = $(this).text();
            index = $(this).index();
             $.ajax({
                    type : "GET",
                    url : "/GetTopicsBySchool.do",

                    data :{
                        nowPage : nowPage,
                        pagesize : 10,
                        schoolId : $.cookie(COOKIE_NAME_schoolId)
                    },
                    success : function(data){
                        var postContentStr = '';
                        var pageData;
                        if (data.status === '0'){
                            alert(data.message);
                        }else{
                            pageData = data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<div>'+
			                                     '<a href="grassDis.html?topicname=' + pageData[j].topicname + '&topicId='+ pageData[j].topicid +'" class="wraper_title">'+pageData[j].topicname+'</a>'+
		                                     '</div>';
                            }
                        $('#wraper').html(postContentStr);
                        }   

                    }
                });
           
        //按钮点击变换
            (function(){
                    bgColor();
            })()
        }).eq(0).click();


    //上一页
        $("#page_prev").click(function(){
            index = index-1;
        //按钮点击变换
            $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
           (function(){
                    bgColor();
            })()
           if(nowPage != 1){
                nowPage = nowPage -1;
               //获取当前数据
               $.ajax({
                    type : "GET",
                    url : "/GetTopicsBySchool.do",
                    data :{
                        nowPage : nowPage,
                        pagesize : 10,
                        schoolId : $.cookie(COOKIE_NAME_schoolId)
                    },
                    success : function(data){
               // console.log(data);
                        var postContentStr = '';
                        var pageData;
                        if (data.status === '0'){
                            alert(data.message);
                        }else{
                            pageData = data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<div>'+
			                                     '<a href="grassDis.html?topicname=' + pageData[j].topicname + '&topicId='+ pageData[j].topicid +'" class="wraper_title">'+pageData[j].topicname+'</a>'+
		                                     '</div>';
                            }
                        $('#wraper').html(postContentStr);
                        }   

                    }
                });
            }
        })
    //下一页
        $('#page_next').click(function(){
            index = index+1;
        //按钮点击变换
            $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
            (function(){
                    bgColor();
            })();
            if(nowPage != pageNum){
                nowPage = nowPage + 1;
            //获取当前数据
             $.ajax({
                    type : "GET",
                    url : "/GetTopicsBySchool.do",

                    data :{
                        nowPage : nowPage,
                        pagesize : 10,
                        schoolId : $.cookie(COOKIE_NAME_schoolId)
                    },
                    success : function(data){
               // console.log(data);
                        var postContentStr = '';
                        var pageData;
                        if (data.status === '0'){
                            alert(data.message);
                        }else{
                            pageData = data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<div>'+
			                                     '<a href="grassDis.html?topicname=' + pageData[j].topicname + '&topicId='+ pageData[j].topicid +'" class="wraper_title">'+pageData[j].topicname+'</a>'+
		                                     '</div>';
                            }
                        $('#wraper').html(postContentStr);
                        }   

                    }
                });
            /*var postContentStr = '';

            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<div>'+
			                                     '<h2>'+pageData[j].title+'</h2>'+
		                                     '</div>';
                            }
                        $('#wraper').html(postContentStr);*/
            }
        }) 
    })();


    /*$(".submit").click(function(){
    	$.ajax({
    		type : "GET",
            url : "/AddArticle.do",
            data : {
            	    schoolid: $.cookie(COOKIE_NAME_schoolId),
                 	title: $(".mytitle").val(),
                 	text: $(".mytitle").val(),
                 	userId: $.cookie(COOKIE_NAME_userId),
             },
            success : function(data){
                if (data.status === '0') {
                    alert(data.message);
                }
                else{
                    var aricleData=data.object;
                }
            }
    	});
    });*/
})