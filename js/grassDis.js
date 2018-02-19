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
	//插入登录块html代码css代码js代码mask代码mask的css，图片images
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
//点击提交
    $("#sub").click(function(){
            $.ajax({
                type : "GET",
                dataType: "json",
                url : "/AddArticle.do",
                data : {
                    userid : $.cookie(COOKIE_NAME_userId),
                    schoolid : $.cookie(COOKIE_NAME_schoolId),
                    text : $('#txt_content').text(),
                    title : $('.input_title').val()
                },
                success:function(data){
                    if(data.status === '0'){
                        alert(data.message);
                    }else{
                       alert("提交成功");
                       window.location.reload();
                    }
                },
                error : function(data){
                    alert("提交数据时出现问题，请重试");
                } 
            });
        });

//分页按钮
    var pageNum; 
    var itemNum;
    var nowPage = 1;
    (function(){
        
        //获取文章数目s
        $.ajax({
            type: 'GET',
            url: '/GetArticleSumNumber.do',
            data:{
                schoolId : $.cookie(COOKIE_NAME_schoolId)
            },
            success: function(data){
                if(data.status === '0') {
                    alert(data.message);    
                }
                else{
                    itemNum = data.object;
                    var pageNum = Math.ceil(itemNum/10);
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
            url : "/GetArticlesBySchool.do",
            data :{
                page : nowPage,
                pagesize : 10,
                schoolId : $.cookie(COOKIE_NAME_schoolId),
                topicid : getSearchString('topicId')
            },
            success : function(data){
                //console.log(data);
                var postContentStr = '';
                var pageData;
                var topicStr = '';
                if (data.status === '0') {
                    alert(data.message);
                }
                else{
                    pageData = data.object;
                    //console.log(pageData);
                    for(var j=0;j<pageData.length;j++){
                    postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?t=4&articleId='+ pageData[j].aricleid +'">'+ pageData[j].title
                                     +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid
                                     //+'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                     +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                     +'</span></p>';
                    }
                topicStr = '<span class="nowtitle">'+ getSearchString('topicname') +'</span>';
                $('.grass').append(topicStr);
                $('.mypost_content').html(postContentStr);
                }    
            }
        });

    })();

//分页按钮点击
    var index;

    var pageData;
    (function(){
        $('.page_li').click(function(){
            $(this).addClass('pageColor').siblings().removeClass('pageColor');
            nowPage = $(this).text();
            index = $(this).index();
            $.ajax({
                type : "GET",
                url : "/GetArticlesBySchool.do",
                data : {
                    page : nowPage,
                    pagesize: 10,
                    schoolId : $.cookie(COOKIE_NAME_schoolId),
                    topicid : getSearchString('topicId')
                },
                success : function(data){
                    var postContentStr = '';
                    var pageData;
                    var topicStr = '';
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        for(var j=0;j<pageData.length;j++){
                        postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?articleId="'+ pageData[j].aricleid +'>'+ pageData[j].title
                                         +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid
                                         //+'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                         +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                         +'</span></p>';
                        }
                        topicStr = '<span class="nowtitle">'+ getSearchString('topicname') +'</span>';
                        $('.grass').append(topicStr);
                        $('.mypost_content').html(postContentStr);
                    }
                }
            });
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
                url : " /GetArticlesBySchool.do",
                data : {
                    page : nowPage,
                    pagesize:10,
                    schoolId : $.cookie(COOKIE_NAME_schoolId),
                    topicid : getSearchString('topicId')
                },
                success : function(data){
                    if(data.status === '0'){
                        alert(data.message);
                    }
                    else {
                        var topicStr = '';
                        var postContentStr = '';
                        pageData = data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?articleId="'+ pageData[j].aricleid +'>'+ pageData[j].title
                                             +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid
                                             //+'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                             +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                             +'</span></p>';
                            }
                    topicStr = '<span class="nowtitle">'+ getSearchString('topicname') +'</span>';
                    $('.grass').append(topicStr);
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
                url : "/GetArticlesBySchool.do",
                data : {
                    page : nowPage,
                    pagesize: 10,
                    schoolId : $.cookie(COOKIE_NAME_schoolId),
                    topicid : getSearchString('topicId')
                },
                success : function(data){
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        var topicStr = '';
                        var postContentStr = '';
                        pageData = data.object;
                            for(var j=0;j<pageData.length;j++){
                            postContentStr +='<p class="mypost_content_li"><span class="Post_Name" id="Post_Name"><a href = "discussion.html?articleId="'+ pageData[j].aricleid +'>'+ pageData[j].title
                                             +'</a></span><span class="Post_Username_1" id="Username">'+ pageData[j].userid
                                             //+'</span><span class="Post_Username_2" id="Username">'+ pageData[j].comment 
                                             +'</span><span class="Post_Date" id="Date">'+ pageData[j].publishdate
                                             +'</span></p>';
                            }
                    topicStr = '<span class="nowtitle">'+ getSearchString('topicname') +'</span>';
                    $('.grass').append(topicStr);
                    $('.mypost_content').html(postContentStr);
                    }
                }
               }); 
            }
        }) 
    })();
    
     
})

 