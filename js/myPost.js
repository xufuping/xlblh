$(function(){
//个人中心
	//读取cookie缓存
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

    (function(){
        //个人中心信息
        $.ajax({
            type: 'GET',
            url: '/GetUserInformation.do',
            data: {
                userId: $.cookie(COOKIE_NAME_userId)
            },
            success: function(data){
                var userData;
                var str = '';
                if(data.status === '0') {
                    alert(data.message);
                } else {
                    userData = data.object;
                    str1 = '<h2>' + userData.username + '<a href="updatedata.html?userId="'+ userData.userid +'>（修改资料）</a></h2>' +
                          '<p id="email">' + userData.email + '</p>' +
                          '<p id="schoolName">"'+ data.schoolname + '</p>' +
                          '<p id="studentNumber">' + userData.studentnumber + '</p>';
                    var $str2=$("<img src='"+ userData.picture+ "' width='230px' heigth='160px'>");
                    //alert(userData.picture); 
                }
                $('.mancenter_msg_box1').append(str1);
                $('.mancenter_msg_box').append($str2);
            }
        });
    })();

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
    var nowPage = 1;
    (function(){
        
        //获取文章数目
        $.ajax({
            type: 'GET',
            url: '/GetArticleSumNumber.do',
            data: {
                userId: $.cookie(COOKIE_NAME_userId)
            },
            success: function(data){
                if(data.status === '0') {
                    alert(data.message);    
                }
                else{
                    itemNum = data.object;
                    pageNum = Math.ceil(itemNum/6);
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
        $.ajax({
            type : "GET",
            url : "/GetArticlesByUser.do",

            data :{
                page : nowPage,
                pagesize : 6,
                userId : $.cookie(COOKIE_NAME_userId)
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
                    postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?articleId="'+ pageData[j].aricleid +'>'+ pageData[j].title
                                     +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid 
                                     // +'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                     +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                     +'</span></p>';
                    }
                $('.mypost_content').html(postContentStr);
                }    
            }
        });

    })();

//分页按钮点击
    var index;
    (function(){
        $('.page_li').click(function(){
            $(this).addClass('pageColor').siblings().removeClass('pageColor');
            nowPage = $(this).text();
            index = $(this).index();
            $.ajax({
                type : "GET",
                url : "/GetArticlesByUser.do",
                data : {
                    page : nowPage,
                    pagesize: 6,
                    userId : $.cookie(COOKIE_NAME_userId)
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
                        postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?articleId="'+ pageData[j].aricleid +'>'+ pageData[j].title
                                         +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid 
                                         // +'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                         +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                         +'</span></p>';
                        }
                    $('.mypost_content').html(postContentStr);
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
                url : "/GetArticlesByUser.do",
                data : {
                    page : nowPage,
                    pagesize: 6,
                    userId : $.cookie(COOKIE_NAME_userId)
                },
                success : function(data){
                    if(data.status === '0'){
                        alert(data.message);
                    }
                    else {
                        var postContentStr = '';
                        var pageData;
                        pageData = data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?articleId="'+ pageData[j].aricleid+'>'+ pageData[j].title
                                             +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid 
                                             // +'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                             +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                             +'</span></p>';
                            }
                    $('.mypost_content').html(postContentStr);
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
                url : "/GetArticlesByUser.do",
                data : {
                    page : nowPage,
                    pagesize: 6,
                    userId : $.cookie(COOKIE_NAME_userId)
                },
                success : function(data){
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        var postContentStr = '';
                        var pageData;
                        pageData = data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?articleId="'+ pageData[j].aricleid +'>'+ pageData[j].title
                                             +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid 
                                             // +'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                             +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                             +'</span></p>';
                            }
                    $('.mypost_content').html(postContentStr);
                    }
                }
               }); 
            }
        })
    })();
})