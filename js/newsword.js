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

//获取用户评论
/*$('.submit').click(function(){
       $.ajax({
            type: 'GET',
            url: '/GetArticleCommetInfo.do',
            data: {
                context: $("textarea").val(),
                picture: $(".charuimg").val(),
                userId: $.cookie(COOKIE_NAME_userId)
              },
            'success': function(data){
                   if(data.status === '0'){
                       alert(data.message);
                   }else{
                       var commentData=data.object;
                   }
              }
    });
 });


$('.submit').click(function(){
$.ajax({
 type: 'GET',
 url: '/GetNewsInformation.do',
 data: {
     newsId: getSearchString(newsId)
   },
 success: function(data){
    if(data.status === '0') {
     alert(data.message);
   } else{
     var commentData=data.object;
     var str1='';
     for(var i=0;i<4;i++){
     str1 +='<p class="word01">'+commentData[i].userName+'</p>'
            '<p class="word02">'+commentData[i].context+'</p>'+
            '<span class="word03">'+commentData[i].createDate+'</span>';
          }
      }
  }
    $(".comment").append(str1);
});
*/
 
 //新闻详细交互
  $.ajax({
     type: 'GET',
     url: '/GetNewsInformation.do',
     data: {
          newsId: getSearchString('newsId')
     },
     success: function(data){
        var newsData;
        str1='';
        if(data.status === '0') {
         alert(data.message);
        } else{ 
        var newsData=data.object;
        str1 ='<h2 class="newsTitle">'+newsData.title+'</h2>'+      
              '<h3 class="newsTime">'+newsData.createdate+'</h3><hr>'+
              '<img class="news_img" src="'+ newsData.picture +'">'+
              '<div class="news_text">'+
                    '<h4 class="orTitle">'+newsData.secondtitle+'</h4>'+
                    '<p>'+newsData.text+'</p>'+
              '</div>';
        str2 = 
        $(".newsword_contain").append(str1);
        }
      }
    });

//获取用户评论
$.ajax({
 type: 'GET',
 url: '/GetNewsCommentInfo.do',
 data: {
     commentid: getSearchString('newsid')
     //11.21
     //写给吴林霏的话————我看了下，这里我不知道是怎么进入
     //新闻文本页的，所以我不知道用什么请求后台，
     //你看到后帮我修改一下，这个问题不大，
     //如果你看到觉得问题挺大的话，把进入方式告诉我，
     //call我，我改
   },
 success: function(data){
    if(data.status === '0') {
     alert(data.message);
   } else{
     var commentData=data.object;
     var userData=data.User;
     var str1='';
     str1+='<p class="word01">'+userData.username+'</p>'+
          '<p class="word02">'+commentData.content+'</p>'+
          '<span class="word03">'+commentData.date+'</span>';
          }
          $('.comment').append(str1);
  }   
});

  $('.submit').click(function(){
       $.ajax({
            type: 'GET',
            url: '/AddNewsComment.do',
            data: {
                newsid : getSearchString('newsid'),
                content : $(".txt").val(), 
                //插入图片可否使用input type="file"
                userid: $.cookie(COOKIE_NAME_userId)
              },
            success: function(data){
                   if(status === '0'){
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
})
 