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
 //字符串查询
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
//提交回复
    $('#sub').click(function(){
        $.ajax({
            type: "GET",
            url: "/AddQuestionComment.do",
            data: {
                questionid : getSearchString('questionId'),
                content : $('#content').val(),
                userid : $.cookie(COOKIE_NAME_userId)
            },
            success: function(data){
                if (data.status === 0) {
                    alert(data.message);
                }
                else{
                    alert("提交成功");
                    window.location.reload();
                }
            },
            error: function(data){
                alert("提交失败");
            }
        });
    })

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
//分页按钮
    var pageNum; 
    var itemNum;  
	var index;
    var nowPage = 1;
    var userdata;
    (function(){   
    //获取文章数目
        $.ajax({
            type: 'GET',
            url: '/getQuestionCommentNum.do',
            data:{
                userId : $.cookie(COOKIE_NAME_userId),
                questionId: getSearchString('questionId')
            },
            success: function(data){
                if(data.status === '0') {
                    alert(data.message);    
                }
                else{
                    itemNum = data.object;
                    pageNum = Math.ceil(itemNum/4);
                    var pageBtnStr = '';
                    for(var i = 1; i <= pageNum; i++) {
                        pageBtnStr += '<li class="page_li">'+ i +'</li>';
                    }
                    $('.page_ul').append(pageBtnStr);
                }
            },
            error : function(data){
                alert("获取总数失败");
            }
        });
    })();
//默认页
    (function(){
        nowPage = 1;
        index = 0;
            $.ajax({
                type : "GET",
                url : "/GetQuestionComment.do",
                data :{
                    page : nowPage,
                    pagesize : 4,
                    questionId :  getSearchString('questionId')
                },
                success : function(data){
                    var postContentStr = '';
                    var pageData;
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        for(var j=0;j<pageData.length;j++){
                        postContentStr +='<div class="main">'+
                                         '<div class="box">'+
                                         '<img src="'+ pageData[j].userPicture +'" class="main_box1">'+
                                         '<div class="main_box2">'+pageData[j].content+'</div>'+
                                         '<p class=username>'+pageData[j].userName+'</p>'+
                                         '<b class="time">'+pageData[j].date +'</b>'+
                                        '</div>'+
                                         '</div>';
                            }
                        $('.discussion_contain').html(postContentStr);
                    }    

                }
            });
            $('.page_li').addClass('pageColor');
            (function(){
                bgColor();
            })();
    })();

//分页按钮点击
    
    (function(){
        $('.page_li').click(function(){
            $(this).addClass('pageColor').siblings().removeClass('pageColor');
            nowPage = $(this).text();
            index = $(this).index();
            $.ajax({
                type : "GET",
                url : "/GetQuestionComment.do",
                data :{
                    page : nowPage,
                    pagesize : 4,
                    questionId :  getSearchString('questionId')
                },
                success : function(data){
                    var postContentStr = '';
                    var pageData;
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        userdata=data.object;
                        for(var j=0;j<pageData.length;j++){
                       postContentStr +='<div class="main">'+
                                     '<div class="box">'+
                                     '<img src="'+ pageData[j].userPicture +'" class="main_box1">'+
                                     '<div class="main_box2">'+pageData[j].content+'</div>'+
                                     '<p class=username>'+pageData[j].userName+'</p>'+
                                     '<b class="time">'+pageData[j].date +'</b>'+
                                    '</div>'+
                                     '</div>';
                        }
                    $('.discussion_contain').html(postContentStr);
                    }    

                }
            });
        //按钮点击变换
        (function(){
                bgColor();
            })();
        }).eq(0).click();


    //上一页
        $("#page_prev").click(function(){
            index = index-1;
        //按钮点击变换
            $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
            (function(){
                bgColor();
            })();
           if(nowPage != 1){
                nowPage = nowPage -1;
               //获取当前数据
               $.ajax({
                    type : "GET",
                    url : "/GetQuestionComment.do",
                    data :{
                        page : nowPage,
                        pagesize : 4,
                        questionId :  getSearchString('questionId')
                    },
                    success : function(data){
                        var postContentStr = '';
                        var pageData;
                        if (data.status === '0') {
                            alert(data.message);
                        }
                        else{
                            pageData = data.object;
                            userdata=data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<div class="main">'+
                                             '<div class="box">'+
                                             '<img src="'+ pageData[j].userPicture +'" class="main_box1">'+
                                             '<div class="main_box2">'+pageData[j].content+'</div>'+
                                             '<p class=username>'+pageData[j].userName+'</p>'+
                                             '<b class="time">'+pageData[j].date +'</b>'+
                                            '</div>'+
                                             '</div>';
                            }
                        $('.discussion_contain').html(postContentStr);
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
                url : "/GetQuestionComment.do",

                data :{
                    page : nowPage,
                    pagesize : 4,
                    questionId :  getSearchString('questionId')
                },
                success : function(data){
                    var postContentStr = '';
                    var pageData;
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        userdata=data.object;
                        for(var j=0;j<pageData.length;j++){
                        postContentStr +='<div class="main">'+
                                         '<div class="box">'+
                                         '<img src="'+ pageData[j].userPicture +'" class="main_box1">'+
                                         '<div class="main_box2">'+pageData[j].content+'</div>'+
                                         '<p class=username>'+pageData[j].userName+'</p>'+
                                         '<b class="time">'+pageData[j].date +'</b>'+
                                        '</div>'+
                                         '</div>';
                        }
                    $('.discussion_contain').html(postContentStr);
                      }    

                }
            });
            }
        }) 
    })();


    /*$(".submit").click(function(){
    	$.ajax({
    		type : "GET",
            url : "/AddQuestionComment.do",
            data : {
                	context: $("textarea").val(),
                	title: $(".mytitle").val(),
                	classId:  $.cookie(COOKIE_NAME_classId),
                	userId: $.cookie(COOKIE_NAME_userId),
                	picture: $(".pic").val()
            },
            success : function(data){
                if (data.status === '0') {
                    alert(data.message);
                }
                else{
                  //  var aricleData=data.map.Article;
                

                }
            }
    	});
    });*/

})