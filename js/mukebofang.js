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

$.ajax({
    type:'GET',
    url:'/GetMoocInformation.do',
    data:{
      MoocId: getSearchString('MoocId')
    },
    success:function(data){
            if(data.status === '1'){
              var  createDate = data.object.createDate;
              $('.news_data').html(createDate);
            }else{
              $('.news_data').html('无法获取时间');
            }
    }
})
//徐府平检查后不知道有什么用，news_data没有定义
//获取视频链接、视频简介
$.ajax({
    type:'GET',
    url:'/GetMoocInformation.do',
    data:{
      MoocId : getSearchString('MoocId')
    },
    success : function(data){
            if(data.status == 1){
              var video = data.object.video;
              var title = data.object.title;
              //慕课简介
              var introduce = data.object.introduce;
              var introStr = '';
              introStr = '<p>'+ introduce +'</p>';
              //慕课简介结束
              $('.introduction').append(introStr);
              $('.news_vedio').attr("src",video);
              $('.lesson_title').html(title);
              //没有新闻简介的接口
            }else{
              alert("无法播放视频");
            }
    }
})

//点赞数
$.ajax({
  type : 'GET',
  url : '/getSumNumber.do',
  data : {
    moocid : getSearchString('MoocId')
  },
  success : function(data){
      var moocData = data.object;
      var moocStr = '';
      moocStr = '(<a class="number" href="">'+ moocData +'</a>)';
      $('.like').append(moocStr);
  }
})

//点赞
  $('.like').click(function(){
    $.ajax({
    type:'GET',
    url:'/addPraice.do',
    data:{
      userid : $.cookie(COOKIE_NAME_userId),
      moocid : getSearchString('MoocId')
    },
    success:function(data){
      if (data.status == 1) {
        var number = data.object;
        $('.number').html(number);
         window.location.reload();
       }else{
        alert("点赞失败");
       }
      }
    })
  })


//评论区

//data={"message":"查询成功！","status":1,"object":[{"MoocComment":{"commentid":24,"content":"太了d3","createdate":"2016-11-21T00:00:00.000","moocid":7,"parentcommentid":1,"userid":1},"user":{"email":"this ia  email2","password":"1ml","picture":"file\\picture\\user1.jpg","schoolid":1,"studentnumber":9804,"userid":1,"username":"卧虎藏"}},{"MoocComment":{"commentid":25,"content":"","createdate":"2016-11-15T00:00:00.000","moocid":7,"parentcommentid":1,"userid":3},"user":{"email":"emial","password":"123","picture":"file\\picture\\user1.jpg","schoolid":1,"studentnumber":1234,"userid":3,"username":"123"}}]}

//console.log(data.object[0]["user"]["username"])
  $.ajax({
     type: 'GET',
     url: '/getMoocMoments.do',
     data: {
         moocId: getSearchString('MoocId')
       },
     success: function(data){
        if(data.status === '0') {
         alert(data.message);
       } else{
         var commentData=data.object;
         var str1='';
         for(var i=0,len=commentData.length;i<len;i++){ 
         str1+='<p class="word01">'+commentData[i]["user"]["username"]+'</p>'
              '<p class="word02">'+commentData[i]["MoocComment"]["content"]+'</p>'+
              '<span class="word03">'+commentData["MoocComment"]["createdate"]+'</span>';
              }
              $(".comment").append(str1);
          }

      }
    
  });
 /* var commentData=data.object;
         var str1='';
         for(var i=0,len=commentData.length;i<len;i++){ 
         str1 +='<p class="word01">'+commentData[i]["user"]["username"]+'</p>'+
              '<p class="word02">'+commentData[i]["MoocComment"]["content"]+'</p>'+
              '<span class="word03">'+commentData[i]["MoocComment"]["createdate"]+'</span>';
              }
              $(".comment").append(str1);
*/
//提交评论
  $('.submit').click(function(){
       $.ajax({
            type: 'GET',
            url: '/addMoocComment.do',
            data: {
               	userid: $.cookie(COOKIE_NAME_userId),
                moocid : getSearchString('MoocId'),
                content : $(".txt").val() 
                //插入图片可否使用input type="file"
              },
            success: function(data){
              if (status === '0') {
                alert(data.message);
              }
              else{
                alert("提交成功");
                window.location.reload(); 
              }                                          
            },
            error : function(data){
                    alert("提交数据时出现问题，请重试");
              } 
    });
 });
});

 