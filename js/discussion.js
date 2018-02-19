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
    function getSearchString(key){

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
    
    //按钮点击变换
    function  bgColor(){
        if (nowPage == 1) {
                $('#page_prev').hide();
                $('#page_next').show();
            }
            else if(nowPage>1 && nowPage<pageNum){
                $('#page_prev').show();
                $('#page_next').show();
            }
            else if (nowPage == pageNum) {
                $('#page_next').hide();
                $('#page_prev').show();
            }
    }

    //按钮背景变换
    function  Color(){
        if (index == 0) {
                $('#page_prev').hide();
            }
            else if(index>0 && index<(pageNum-1)){
                $('#page_prev').show();
                $('#page_next').show();
            }
            else if (index == (pageNum-1)) {
                $('#page_next').hide();
            }
    }

    //我的帖子链接
    if (getSearchString('t') == 0) {
        //分页按钮
        var pageNum; 
        var itemNum;
        var nowPage = 1; 
        (function(){
            
            //获取文章数目
            $.ajax({
                type: 'GET',
                url: '/getArticleCommentNumber.do',
                data:{
                    userId : $.cookie(COOKIE_NAME_userId)
                },
                success: function(data){
                    if(data.status === '0') {
                        alert(data.message);    
                    }
                    else{
                        itemNum = data.object;
                        var pageNum = Math.ceil(itemNum/4);
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
                url : " /GetArticleCommet.do",
                data :{
                    page :nowPage,
                    pagesize :4,
                    articleId : getSearchString('articleId')
                },
                success : function(data){
                    var postContentStr = '';
                    var nowPage;
                    var pageData;
                    if (data.status === '0'){
                        alert(data.message);
                    }else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                            length=pageData.length;
                        }else{
                            length=4;
                        }
                        for(var j=0;j<length;j++){
                        postContentStr +='<div class="main">'+
                                        '<div class="box">'+
                                                    '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                    '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                    '<p>'+userdata[j].userName+'</p>'+
                                                '</div>'+
                                            '</div>';
                        }
                        $('.discussion_contain').html(postContentStr);
                    }   
                }
            });
              
        })();

        //分页按钮点击
        var index;
        var userdata;
        (function(){
            $('.page_li').click(function(){
                $(this).addClass('pageColor').siblings().removeClass('pageColor');
                nowPage = $(this).text();
                index = $(this).index();
                $.ajax({
                type : "GET",
                url : "/GetArticleCommet.do",

                data :{
                    page : nowPage,
                    pagesize : 4,
                    articleId : getSearchString('articleId')
                },
                success : function(data){
                   // console.log(data);
                    var postContentStr = '';
                    var pageData;
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                                    length=pageData.length;
                                }else{
                                    length=4;
                                }
                        for(var j=0;j<length;j++){
                       postContentStr +='<div class="main">'+
                                                '<div class="box">'+
                                                    '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                    '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                    '<p>'+userdata[j].userName+'</p>'+
                                              '</div>'+
                                          '</div>';
                        }
                    $('.discussion_contain').html(postContentStr);
                    }    

                }
            });
            
            //按钮背景变换
            (function(){
                bgColor();
            })();
        }).eq(0).click();


            //上一页
            $("#page_prev").click(function(){
                index = index-1;
                //按钮点击变换
                $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
                //按钮背景变换
                (function(){
                   Color();
                })();
                if(nowPage != 1){
                    nowPage = nowPage -1;
                    //获取当前数据
                    $.ajax({
                        type : "GET",
                        url : "/GetArticleCommet.do",

                        data :{
                            page : nowPage,
                            pagesize : 4,
                            articleId : getSearchString('articleId')
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
                                if(pageData.length<=4){
                                            length=pageData.length;
                                        }else{
                                            length=4;
                                        }
                                for(var j=0;j<length;j++){
                                postContentStr +='<div class="main">'+
                                                    '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
                                                            '</div>'+
                                                        '</div>';
                                }
                            $('.discussion_contain').html(postContentStr);
                            $('.main_box1').html('<img src="'+userdata[j].userPicutre+'">');
                            $('.main_box2').html(pageData[j].content);
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
                //按钮背景变换
                (function(){
                    Color();
                })();
                if(nowPage != pageNum){
                    nowPage = nowPage + 1;
                //获取当前数据
                $.ajax({
                    type : "GET",
                    url : "/GetArticleCommet.do",

                    data :{
                        page : nowPage,
                        pagesize : 4,
                        articleId : getSearchString('articleId')
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
                            if(pageData.length<=4){
                                        length=pageData.length;
                                    }else{
                                        length=4;
                                    }
                            for(var j=0;j<length;j++){
                            postContentStr +='<div class="main">'+
                                        '<div class="box">'+
                                                    '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                    '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                    '<p>'+userdata[j].userName+'</p>'+
                                                '</div>'+
                                            '</div>';
                            }
                        $('.discussion_contain').html(postContentStr);
                        $('.main_box1').html('<img src="'+userdata[j].userPicutre+'">');
                        $('.main_box2').html(pageData[j].content);
                        }    
                    }
                });
                }
            }) 
        })();

     //提交新帖
        $(".submit").click(function(){
            $.ajax({
                type : "GET",
                url : "/AddArticleCommet.do",
                data : {
                        content: $("textarea").val(),
                        title: $(".mytitle").val(),
                        articleid: getSearchString('articleId'),
                        userid: $.cookie(COOKIE_NAME_userId),
                        picture: $(".pic").val()
                },
                success : function(data){
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        alert("提交成功");
                        window.location.reload();
                    }
                },
                error : function(data){
                    alert("提交失败");
                }
            });
        });
    }

    //我的回复链接
    else if (getSearchString('t') == 1){
        //分页按钮
        var pageNum; 
        var itemNum;
        var nowPage = 1; 
        (function(){
            
            //获取文章数目
            $.ajax({
                type: 'GET',
                url: '/getArticleCommentNumber.do',
                data:{
                    userId : $.cookie(COOKIE_NAME_userId)
                },
                success: function(data){
                    if(data.status === '0') {
                        alert(data.message);    
                    }
                    else{
                        itemNum = data.object;
                        var pageNum = Math.ceil(itemNum/4);
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
                url : " /GetArticleCommet.do",
                data :{
                    page :nowPage,
                    pagesize :4,
                    articleId : getSearchString('articleId')
                },
                success : function(data){
                    var postContentStr = '';
                    var nowPage;
                    var pageData;
                    if (data.status === '0'){
                        alert(data.message);
                    }else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                            length=pageData.length;
                        }else{
                            length=4;
                        }
                        for(var j=0;j<length;j++){
                        postContentStr +='<div class="main">'+
                                        '<div class="box">'+
                                                    '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                    '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                    '<p>'+userdata[j].userName+'</p>'+
                                                '</div>'+
                                            '</div>';
                        }
                        $('.discussion_contain').html(postContentStr);
                    }   
                }
            });
              
        })();

        //分页按钮点击
        var index;
        var userdata;
        (function(){
            $('.page_li').click(function(){
                $(this).addClass('pageColor').siblings().removeClass('pageColor');
                nowPage = $(this).text();
                index = $(this).index();
                $.ajax({
                type : "GET",
                url : "/GetArticleCommet.do",

                data :{
                    page : nowPage,
                    pagesize : 4,
                    articleId : getSearchString('articleId')
                },
                success : function(data){
                   // console.log(data);
                    var postContentStr = '';
                    var pageData;
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                                    length=pageData.length;
                                }else{
                                    length=4;
                                }
                        for(var j=0;j<length;j++){
                       postContentStr +='<div class="main">'+
                                                '<div class="box">'+
                                                    '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                    '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                    '<p>'+userdata[j].userName+'</p>'+
                                              '</div>'+
                                          '</div>';
                        }
                    $('.discussion_contain').html(postContentStr);
                    }    

                }
            });
            
            //按钮背景变换
            (function(){
                bgColor();
            })();
        }).eq(0).click();


            //上一页
            $("#page_prev").click(function(){
                index = index-1;
                //按钮点击变换
                $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
                //按钮背景变换
                (function(){
                   Color();
                })();
                if(nowPage != 1){
                    nowPage = nowPage -1;
                    //获取当前数据
                    $.ajax({
                        type : "GET",
                        url : "/GetArticleCommet.do",

                        data :{
                            page : nowPage,
                            pagesize : 4,
                            articleId : getSearchString('articleId')
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
                                if(pageData.length<=4){
                                            length=pageData.length;
                                        }else{
                                            length=4;
                                        }
                                for(var j=0;j<length;j++){
                                postContentStr +='<div class="main">'+
                                                    '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
                                                            '</div>'+
                                                        '</div>';
                                }
                            $('.discussion_contain').html(postContentStr);
                            $('.main_box1').html('<img src="'+userdata[j].userPicutre+'">');
                            $('.main_box2').html(pageData[j].content);
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
                //按钮背景变换
                (function(){
                    Color();
                })();
                if(nowPage != pageNum){
                    nowPage = nowPage + 1;
                //获取当前数据
                $.ajax({
                    type : "GET",
                    url : "/GetArticleCommet.do",

                    data :{
                        page : nowPage,
                        pagesize : 4,
                        articleId : getSearchString('articleId')
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
                            if(pageData.length<=4){
                                        length=pageData.length;
                                    }else{
                                        length=4;
                                    }
                            for(var j=0;j<length;j++){
                            postContentStr +='<div class="main">'+
                                                '<div class="box">'+
                                                            '<div class="main_box1">'+'<img src="'+userdata[j].userPicutre+'">'+'</div>'+
                                                            '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                            '<p>'+userdata[j].userName+'</p>'+
                                                        '</div>'+
                                                    '</div>';
                            }
                        $('.discussion_contain').html(postContentStr);
                        $('.main_box1').html('<img src="'+userdata[j].userPicutre+'">');
                        $('.main_box2').html(pageData[j].content);
                        }    
                    }
                });
                }
            }) 
        })();

      //提交新帖
         $(".submit").click(function(){
            $.ajax({
                type : "GET",
                url : "/AddArticleCommet.do",
                data : {
                        content: $("textarea").val(),
                        title: $(".mytitle").val(),
                        articleid: getSearchString('articleId'),
                        userid: $.cookie(COOKIE_NAME_userId),
                        picture: $(".pic").val()
                },
                success : function(data){
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        alert("提交成功");
                        window.location.reload();
                    }
                },
                error : function(data){
                    alert("提交失败");
                }
            });
        });
    }
    //我的问题链接
    else if(getSearchString('t') == 2){
        //分页按钮
        var pageNum; 
        var itemNum;   
        var nowPage = 1;  
        (function(){
            //获取文章数目
            $.ajax({
                type: 'GET',
                url: '/getArticleCommentNumber.do',
                data:{
                    userId : $.cookie(COOKIE_NAME_userId)
                },
                success: function(data){
                    if(data.status == '0') {
                        alert(data.message);    
                    }
                    else{
                        itemNum = data.object;
                        var pageNum = Math.ceil(itemNum/4);
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
                        url : "/GetQuestionComment.do",
                        data :{
                            page : nowPage,
                            pagesize :4,
                            questionId : getSearchString('questionId')
                        },
                        success : function(data){
                            var postContentStr = ''; 
                            var nowPage;
                            var pageData;
                            if (data.status == '0'){
                                alert(data.message);
                            }else{
                                pageData = data.object;
                                userdata=data.object;
                                if(pageData.length<=4){
                                    length=pageData.length;
                                }else{
                                    length=4;
                                }
                                for(var j=0;j<length;j++){
                                    postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicture+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
                                                          '</div>'+
                                                      '</div>';
                                                   
                                }
                             $('.discussion_contain').html(postContentStr);
                            }   

                        }
                    });

                })();

        //分页按钮点击
        var index;
        var userdata;
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
                    questionId : getSearchString('questionId')
                },
                success : function(data){
                   // console.log(data);
                    var postContentStr = ''; 
                    var pageData;
                    if (data.status == '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                                    length=pageData.length;
                                }else{
                                    length=4;
                                }
                        for(var j=0;j<length;j++){
                            postContentStr +='<div class="main">'+
                                                    '<div class="box">'+
                                                        '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                        '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                        '<p>'+userdata[j].userName+'</p>'+
                                                  '</div>'+
                                              '</div>';
                                           
                        }
                     $('.discussion_contain').html(postContentStr);
                    }    
                }
            });
                //按钮背景变换
                (function(){
                    bgColor();
                })();
                
            }).eq(0).click();


            //上一页
            $("#page_prev").click(function(){
                index = index-1;
                //按钮点击变换
                $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
                //按钮背景变换
                (function(){
                    Color();
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
                            questionId : getSearchString('questionId')
                        },
                        success : function(data){
                             var postContentStr = ''; 
                            var pageData;
                            if (data.status == '0') {
                                alert(data.message);
                            }
                            else{
                                pageData = data.object;
                                userdata=data.object;
                                if(pageData.length<=4){
                                            length=pageData.length;
                                        }else{
                                            length=4;
                                        }
                                for(var j=0;j< length;j++){
                                    postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
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
                //按钮背景变换
                (function(){
                    Color();
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
                        questionId : getSearchString('questionId')
                    },
                    success : function(data){
                       // console.log(data);
                        var postContentStr = '';
                        var pageData;
                        if (data.status == '0') {
                            alert(data.message);
                        }
                        else{
                            pageData = data.object;
                            userdata=data.object;
                            if(pageData.length<=4){
                                        length=pageData.length;
                                    }else{
                                        length=4;
                                    }
                            for(var j=0; j<length;j++){
                                postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
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

        //提交新帖
        $(".submit").click(function(){
            $.ajax({
                type : "GET",
                url : "AddQuestionComment.do",
                data : {
                        content: $("textarea").val(),
                        title: $(".mytitle").val(),
                        articleid: getSearchString('articleId'),
                        userid: $.cookie(COOKIE_NAME_userId),
                        picture: $(".pic").val()
                },
                success : function(data){
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        alert("提交成功");
                        window.location.reload();
                    }
                },
                error : function(data){
                    alert("提交失败");
                }
            });
        });
    }

    //我的回答链接
    else if(getSearchString('t') == 3) {
        //分页按钮
        var pageNum; 
        var itemNum;   
        var nowPage = 1;  
        (function(){
            //获取文章数目
            $.ajax({
                type: 'GET',
                url: '/getArticleCommentNumber.do',
                data:{
                    userId : $.cookie(COOKIE_NAME_userId)
                },
                success: function(data){
                    if(data.status == '0') {
                        alert(data.message);    
                    }
                    else{
                        itemNum = data.object;
                        var pageNum = Math.ceil(itemNum/4);
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
                        url : "/GetQuestionComment.do",
                        data :{
                            page : nowPage,
                            pagesize :4,
                            questionId : getSearchString('questionId')
                        },
                        success : function(data){
                            var postContentStr = ''; 
                            var nowPage;
                            var pageData;
                            if (data.status == '0'){
                                alert(data.message);
                            }else{
                                pageData = data.object;
                                userdata=data.object;
                                if(pageData.length<=4){
                                    length=pageData.length;
                                }else{
                                    length=4;
                                }
                                for(var j=0;j<length;j++){
                                    postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicture+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
                                                          '</div>'+
                                                      '</div>';
                                                   
                                }
                             $('.discussion_contain').html(postContentStr);
                            }   

                        }
                    });

                })();

        //分页按钮点击
        var index;
        var userdata;
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
                    questionId : getSearchString('questionId')
                },
                success : function(data){
                   // console.log(data);
                    var postContentStr = ''; 
                    var pageData;
                    if (data.status == '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                                    length=pageData.length;
                                }else{
                                    length=4;
                                }
                        for(var j=0;j<length;j++){
                            postContentStr +='<div class="main">'+
                                                    '<div class="box">'+
                                                        '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                        '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                        '<p>'+userdata[j].userName+'</p>'+
                                                  '</div>'+
                                              '</div>';
                                           
                        }
                     $('.discussion_contain').html(postContentStr);
                    }    
                }
            });
                //按钮背景变换
                (function(){
                    bgColor();
                })();
                
            }).eq(0).click();


            //上一页
            $("#page_prev").click(function(){
                index = index-1;
                //按钮点击变换
                $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
                //按钮背景变换
                (function(){
                    Color();
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
                            questionId : getSearchString('questionId')
                        },
                        success : function(data){
                             var postContentStr = ''; 
                            var pageData;
                            if (data.status == '0') {
                                alert(data.message);
                            }
                            else{
                                pageData = data.object;
                                userdata=data.object;
                                if(pageData.length<=4){
                                            length=pageData.length;
                                        }else{
                                            length=4;
                                        }
                                for(var j=0;j< length;j++){
                                    postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
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
                //按钮背景变换
                (function(){
                    Color();
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
                        questionId : getSearchString('questionId')
                    },
                    success : function(data){
                       // console.log(data);
                        var postContentStr = '';
                        var pageData;
                        if (data.status == '0') {
                            alert(data.message);
                        }
                        else{
                            pageData = data.object;
                            userdata=data.object;
                            if(pageData.length<=4){
                                        length=pageData.length;
                                    }else{
                                        length=4;
                                    }
                            for(var j=0; j<length;j++){
                                postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
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

        //提交新帖
        $(".submit").click(function(){
            $.ajax({
                type : "GET",
                url : "/AddQuestionComment.do",
                data : {
                        content: $("textarea").val(),
                        title: $(".mytitle").val(),
                        articleid: getSearchString('articleId'),
                        userid: $.cookie(COOKIE_NAME_userId),
                        picture: $(".pic").val()
                },
                success : function(data){
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        alert("提交成功");
                        window.location.reload();
                    }
                },
                error : function(data){
                    alert("提交失败");
                }
            });
        });
    }
    //草坪讨论点击
    else if(getSearchString('t') == 4){
        var pageNum; 
        var itemNum;   
        var nowPage = 1;  
        (function(){
            //获取文章数目
            $.ajax({
                type: 'GET',
                url: '/GetArticleSumNumber.do',
                data:{
                    userId : $.cookie(COOKIE_NAME_userId)
                },
                success: function(data){
                    if(data.status == '0') {
                        alert(data.message);    
                    }
                    else{
                        itemNum = data.object;
                        var pageNum = Math.ceil(itemNum/4);
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
                url : "/GetArticleCommet.do",
                data :{
                    page : nowPage,
                    pagesize :4,
                    articleId : getSearchString('articleId')
                },
                success : function(data){
                    var postContentStr = ''; 
                    var nowPage;
                    var pageData;
                    if (data.status == '0'){
                        alert(data.message);
                    }else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                            length=pageData.length;
                        }else{
                            length=4;
                        }
                        for(var j=0;j<length;j++){
                            postContentStr += '<div class="main">'+
                                                '<div class="box">'+
                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicture+'">'+'</div>'+
                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                '<p>'+userdata[j].userName+'</p>'+
                                                '</div>'+
                                               '</div>';
                                                   
                        }
                        $('.discussion_contain').html(postContentStr);
                    }   

                }
            });

        })();

        //分页按钮点击
        var index;
        var userdata;
        (function(){
            $('.page_li').click(function(){
                $(this).addClass('pageColor').siblings().removeClass('pageColor');
                nowPage = $(this).text();
                index = $(this).index();
                $.ajax({
                type : "GET",
                url : "/GetArticleCommet.do",
                data :{
                    page : nowPage,
                    pagesize : 4,
                    articleId : getSearchString('articleId')
                },
                success : function(data){
                   // console.log(data);
                    var postContentStr = ''; 
                    var pageData;
                    if (data.status == '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        userdata=data.object;
                        if(pageData.length<=4){
                                    length=pageData.length;
                                }else{
                                    length=4;
                                }
                        for(var j=0;j<length;j++){
                            postContentStr +='<div class="main">'+
                                                    '<div class="box">'+
                                                        '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                        '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                        '<p>'+userdata[j].userName+'</p>'+
                                                  '</div>'+
                                              '</div>';
                                           
                        }
                     $('.discussion_contain').html(postContentStr);
                    }    
                }
            });
                //按钮背景变换
                (function(){
                    bgColor();
                })();
                
            }).eq(0).click();


            //上一页
            $("#page_prev").click(function(){
                index = index-1;
                //按钮点击变换
                $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
                //按钮背景变换
                (function(){
                    Color();
                })();
               if(nowPage != 1){
                    nowPage = nowPage -1;
                    //获取当前数据
                    $.ajax({
                        type : "GET",
                        url : "/GetArticleCommet.do",
                        data :{
                            page : nowPage,
                            pagesize : 4,
                            articleId : getSearchString('articleId')
                        },
                        success : function(data){
                             var postContentStr = ''; 
                            var pageData;
                            if (data.status == '0') {
                                alert(data.message);
                            }
                            else{
                                pageData = data.object;
                                userdata=data.object;
                                if(pageData.length<=4){
                                            length=pageData.length;
                                        }else{
                                            length=4;
                                        }
                                for(var j=0;j< length;j++){
                                    postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
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
                //按钮背景变换
                (function(){
                    Color();
                })();
                if(nowPage != pageNum){
                    nowPage = nowPage + 1;
                //获取当前数据
                $.ajax({
                    type : "GET",
                    url : "/GetArticleCommet.do",
                    data :{
                        page : nowPage,
                        pagesize : 4,
                        articleId : getSearchString('articleId')
                    },
                    success : function(data){
                       // console.log(data);
                        var postContentStr = '';
                        var pageData;
                        if (data.status == '0') {
                            alert(data.message);
                        }
                        else{
                            pageData = data.object;
                            userdata=data.object;
                            if(pageData.length<=4){
                                        length=pageData.length;
                                    }else{
                                        length=4;
                                    }
                            for(var j=0; j<length;j++){
                                postContentStr += '<div class="main">'+
                                                            '<div class="box">'+
                                                                '<div class="main_box1">'+'<img src="'+pageData[j].userPicutre+'">'+'</div>'+
                                                                '<div class="main_box2">'+pageData[j].content+'</div>'+
                                                                '<p>'+userdata[j].userName+'</p>'+
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

        //提交新帖
        $(".submit").click(function(){
            $.ajax({
                type : "GET",
                url : "/AddArticleCommet.do",
                data : {
                        content: $("textarea").val(),
                        title: $(".mytitle").val(),
                        articleid: getSearchString('articleId'),
                        userid: $.cookie(COOKIE_NAME_userId),
                        picture: $(".pic").val()
                },
                success : function(data){
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        alert("提交成功");
                        window.location.reload();
                    }
                },
                error : function(data){
                    alert("提交失败");
                }
            });
        });
    }

});