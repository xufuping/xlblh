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
//我要提问
    (function(){
        $("#btn_2").click(function(){
            return $("#btn_1").click();
        });
        function setImagePreview() {   
        var btnObj = document.getElementById("btn_1");
        var test = document.getElementById("txt_content");
        
        if(btnObj.files && btnObj.files[0]){
            var newImg = document.createElement('img');
            newImg.src = window.URL.createObjectURL(btnObj.files[0]);  
            console.log(newImg.src);
            test.appendChild(newImg);
            // test.innerHTML += newImg;
        }
        }
    })();

     $("#sub").click(function(){
            $.ajax({
                type : "GET",
                dataType: "json",
                url : "/AddQuestion.do",
                data : {
                    userId : $.cookie(COOKIE_NAME_userId),
                    schoolId : $.cookie(COOKIE_NAME_schoolId),
                    content : $('#txt_content').text(),
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
     var index;
    (function(){ 
       // 获取文章数目
        $.ajax({
            type: 'GET',
            url: '/GetQuestionSumNumber.do',
            data:{
                schoolId : $.cookie(COOKIE_NAME_schoolId)
            },
            success: function(data){
                if(data.status === '0') {
                    alert(data.message);    
                }
                else{
                    itemNum = data.object;
                    pageNum = Math.ceil(itemNum/10);
                    var pageBtnStr = '';
                    for(var i = 1; i <= pageNum; i++) {
                        pageBtnStr += '<li class="page_li">'+ i +'</li>';
                    }
                    $('.page_ul').append(pageBtnStr);
                    $('.page_li').click(function(){
                        $(this).addClass('pageColor').siblings().removeClass('pageColor');
                        nowPage = $(this).text();
                        index = $(this).index();
                        click().eq(0).click();
                    });
                    click1();
                    click2();
                }
            }
        });

    })();

//默认页
    (function(){
        nowPage = 1;
        index = 0;
        $.ajax({
            type : "GET",
            url : "/getQuestionsBySchool.do",
            data :{
                page : nowPage,
                pageSize : 10,
                schoolId : $.cookie(COOKIE_NAME_schoolId)
            },
            success : function(data){
                var queContentStr = '';
                var pageData;
                if (data.status === '0') {
                    alert(data.message);

                }
                else{
                    pageData = data.object;
                    for(var i=0;i<pageData.length;i++){
                        queContentStr += '<p class="que_content_li"><span class="que_Name" id="que_Name"><a href = "askAnswer.html?questionId='+ pageData[i].questionid +'">'+ pageData[i].title
                                        +'</a></span><span class="que_Username_1" id="Username">'+ pageData[i].userid
                                        // +'</span><span class="que_Username_2" id="Username">'+ pageData[i].lastUser
                                        +'</span><span class="que_Date" id="Date">'+ pageData[i].createdate
                                        +'</span></p>';
                    }
                $('.que_content').html(queContentStr);
                }    
            }
        });
        $('.page_li').addClass('pageColor');
        (function(){
            bgColor();
        })();
    })();



//分页内容，按钮点击事件   
        function click(){
            $.ajax({
                type:"GET",
                url : "/getQuestionsBySchool.do",
                data :{
                    page : nowPage,
                    pageSize : 10,
                    schoolId : $.cookie(COOKIE_NAME_schoolId)
                },
                success : function(data){
                    var queContentStr = '';
                    var pageData;
                    if (data.status === '0') {
                        alert(data.message);
                    }
                    else{
                        pageData = data.object;
                        for(var i=0;i<pageData.length;i++){
                            queContentStr += '<p class="que_content_li"><span class="que_Name" id="que_Name"><a href = "askAnswer.html?questionId='+ pageData[i].questionid +'">'+ pageData[i].title
                                            +'</a></span><span class="que_Username_1" id="Username">'+ pageData[i].userid
                                            //+'</span><span class="que_Username_2" id="Username">'+ pageData[i].lastUser
                                            +'</span><span class="que_Date" id="Date">'+ pageData[i].createdate
                                            +'</span></p>';
                        }
                    $('.que_content').html(queContentStr);
                    }    
                }
            });
            
        //按钮背景变换
            (function(){
                    bgColor();
            })();
        }

    //上一页
    //按钮点击
    function click1(){
        $("#page_prev").click(function(){
            index = index-1; 
            $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
            (function(){
                    bgColor();
            })();

           if(nowPage != 1){
                nowPage = nowPage -1;
                
            //获取当前数据
               $.ajax({
                    type : "GET",
                    url : "/getQuestionsBySchool.do",
                    data :{
                        page : nowPage,
                        pageSize : 10,
                        schoolId : $.cookie(COOKIE_NAME_schoolId)
                    },
                    success : function(data){
                        var queContentStr = '';
                        var pageData;
                        if (data.status === '0') {
                            alert(data.message);
                        }
                        else{
                            pageData = data.object;
                            for(var i=0;i<pageData.length;i++){
                                queContentStr += '<p class="que_content_li"><span class="que_Name" id="que_Name"><a href = "askAnswer.html?questionId='+ pageData[i].questionid +'">'+ pageData[i].title
                                                +'</a></span><span class="que_Username_1" id="Username">'+ pageData[i].userid
                                                //+'</span><span class="que_Username_2" id="Username">'+ pageData[i].lastUser
                                                +'</span><span class="que_Date" id="Date">'+ pageData[i].createdate
                                                +'</span></p>';
                            }
                        $('.que_content').html(queContentStr);
                        }    
                    }
               });
            }
        })
        }
    //下一页//按钮背景变换
    function click2(){
        $('#page_next').click(function(){
            index = index+1;
            $('.page_li').eq(index).addClass('pageColor').siblings().removeClass('pageColor');
            (function(){
                    bgColor();
            })();
            if(nowPage != pageNum){
                nowPage = nowPage + 1;
        //获取当前数据
               $.ajax({
                    type : "GET",
                    url : "/getQuestionsBySchool.do",
                    data :{
                        page : nowPage,
                        pageSize : 10,
                        schoolId : $.cookie(COOKIE_NAME_schoolId)
                    },
                    success : function(data){
                        var queContentStr = '';
                        var pageData;
                        if (data.status === '0') {
                            alert(data.message);
                        }
                        else{
                            pageData = data.object;
                            for(var i=0;i<pageData.length;i++){
                                queContentStr += '<p class="que_content_li"><span class="que_Name" id="que_Name"><a href = "askAnswer.html?questionId='+ pageData[i].questionid +'">'+ pageData[i].title
                                                +'</a></span><span class="que_Username_1" id="Username">'+ pageData[i].userid
                                                //+'</span><span class="que_Username_2" id="Username">'+ pageData[i].lastUser
                                                +'</span><span class="que_Date" id="Date">'+ pageData[i].createdate
                                                +'</span></p>';
                            }
                        $('.que_content').html(queContentStr);
                        }    
                    }
               }); 
            }
        }) 
    }

    //提交问题
    /*(function(){
        $('#sub').click(function(){
            var title = $('.input_title').val();
            var content = $('#txt_content').text();
            if (title == ""||title == null) {
                alert("标题不能为空");
            }
            if (content == ""||content == null) {
                alert("内容不能为空");
            }
            $('#sub').submit();
        })
    })();*/
  
       
   
})