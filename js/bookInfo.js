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
        type: "GET",
        url: "/GetBookInformation.do",
        data :{
            bookId : getSearchString('bookId')
        },
        success : function(data){
            var str='';
            var userData;
            if(data.status === '1'){
                alert(data.message);
            }
            else{
                userData=data.object;
                str = '<img src="'+ userData.picture +'" class="bookImg"></p><div class="bookInfo_word">'
                     +'<p>书名：'+ userData.bookname +'</p>'
                     +'<p>出版社：'+ userData.publisher +'</p>'
                     +'<p>作者：'+ userData.author +'</p>'
                     +'<p class="bookSum">概要：</p><span class="bookSum_contain">' + userData.introduce +'</span></div>';
            }
        $('#bookInfo_contain').append(str);
        }
    })
})