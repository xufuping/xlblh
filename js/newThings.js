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


	(function(){
	var num=$('.Carousel_span span').length;
	var i_mun=0;
	var timer_banner=null;
	$('.Carousel_ul li:gt(0)').hide();//页面加载隐藏所有的li，除了第一个底下小图标点击切换
	$('.Carousel_span span').click(function(){
		$(this).addClass('Carousel_span_one')
			   .siblings('span').removeClass('Carousel_span_one');
		var i_mun1=$('.Carousel_span span').index(this);
		$('.Carousel_ul li').eq(i_mun1).fadeIn('slow')
			                .siblings('li').fadeOut('slow');
		i_mun=i_mun1;
	});
	//左边箭头点击时切换
	$('.Carousel_left').click(function(){
		if(i_mun==0){
			i_mun=num
		}
		//大图切换
		$('.Carousel_ul li').eq(i_mun-1).fadeIn('slow')
								   .siblings('li').fadeOut('slow');
		//小图切换
		$('.Carousel_span span').eq(i_mun-1).addClass('Carousel_span_one')
				                .siblings('span').removeClass('Carousel_span_one');
		i_mun--
	});
	//右边箭头点击时切换
	$('.Carousel_right').click(function(){
		move_banner()
	});
	//鼠标移动到幻灯片上时 显示左右切换案例
	$('.Carousel').mouseover(function(){
		$('.Carousel_left').show();
		$('.Carousel_right').show();
	});

	//鼠标离开幻灯片上时 隐藏左右切换案例
	$('.Carousel').mouseout(function(){
		$('.Carousel_left').hide();
		$('.Carousel_right').hide();
	});
	//自动播放函数
	function bannerMoveks(){
		timer_banner=setInterval(function(){
			move_banner()
		},4000)
	};
	bannerMoveks();//开始自动播放
	//鼠标移动到banner上时停止播放
	$('.Carousel').mouseover(function(){
		clearInterval(timer_banner);
	});
	//鼠标离开 banner 开启定时播放
	$('.Carousel').mouseout(function(){
		bannerMoveks();
	});
	//banner 右边点击执行函数
   	function move_banner(){
			if(i_mun==num-1){
				i_mun=-1
			}
			//大图切换
			$('.Carousel_ul li').eq(i_mun+1).fadeIn('slow')
									   .siblings('li').fadeOut('slow');
			//小图切换
			$('.Carousel_span span').eq(i_mun+1).addClass('Carousel_span_one')
					   .siblings('span').removeClass('Carousel_span_one');
			i_mun++
	}
	})();
// 以上是轮播

// 点击视频轮播链接新闻视频
//获取到三个视频的详细地址
	(function(){
		$.ajax({
			type : "GET",
			url : "/GetNewsBySchool.do",
			data : {
				schoolId : $.cookie(COOKIE_NAME_schoolId)
			},
			success : function(data){
				if (data.status === 0) {
					alert(data.message);
				}
				else{
					var newsData = data.object;
					// console.log(moocData);
					var newsStr = '';
					newsStr =
				'<li><a href="newsvideo.html?commentId='+ newsData[0].commentid +'&newsid='+ newsData[0].newsid +'" id="vedio_1" class="img"><img src="images/news.jpg"  alt="新闻视频1" /></a></li>'
            	+'<li><a href="newsvideo.html?newsid='+ newsData[0].newsid +'" id="vedio_2" class="img"><img src="images/news.jpg"    alt="新闻视频2" /></a></li>'
            	+'<li><a href="newsvideo.html?newsid='+ newsData[0].newsid +'" id="vedio_3" class="img"><img src="images/news.jpg"   alt="新闻视频3" /></a></li>'
				
				}
				$('.Carousel_ul').append(newsStr);
			},
			error: function(data){
				alert("无法获取视频");
			}
		});
	})();


$.ajax({
	type: 'GET',
	url: '/GetNewsBySchool.do',
	datatype: 'json',
	data: {
		schoolId: $.cookie(COOKIE_NAME_schoolId)
	},
	success: function(data){
		var schoolData;
		var str2 = '';
		if(data.status === '0') {
			alert(data.message);
		} else {
			schoolData = data.object;
			if(schoolData.length<=10){
				var length = schoolData.length;
			}else{
				length = 10;
			}
			for(var i=0; i<length;i++){
			//alert(schoolData.secondtitle);
 			str2 +='<h3>'+schoolData[i].secondtitle+'</h3>';//schoolData[i].secondtitle
			}   
			
		}
		 
            $(".newThings_box2").append(str2);
		 
    }
});

//获取学校名称
$.ajax({
    type: 'GET',
	url: 'http://rap.taobao.org/mockjsdata/8810/GetSchoolInformation',
	data: {
		schoolld: $.cookie(COOKIE_NAME_schoolId)
	},
    success: function(data){
		//alert(data);
        if(data.status === '0') {
			alert(data.message);
		} else {
			var schoolData;
            schoolData = data.map.achool;
			// console.log(schoolData.schoolName);
			$(".school").html(schoolData.schoolName);
		}
	}
});

$.ajax({
	type: 'GET',
	url: '/GetNewsByDate.do',
	data: {
		schoolId: $.cookie(COOKIE_NAME_schoolId)
	},
	success: function(data){
		var schoolData;
		var str = '';
		if(data.status === '0') {
			alert(data.message);
		} else {
			schoolData = data.object;
			//alert(schoolData[0].picture);
 			$(".newThings_box").append(schoolData.picture);
			if(schoolData.length<=5){
				var length = schoolData.length;
			}else{
				length = 5;
			}
 			for(var i=0; i<length;i++){
			//	alert(schoolData[i].picture);
			str += '<a href="newsword.html?commentid='+ schoolData[i].newsid +'&newsId='+ schoolData[i].newsid +'" class="newThings_box1_h3">'+schoolData[i].title+'</a>'+
		           '<li>'+schoolData[i].createdate+'</li>'+
		           '<li>'+'点赞'+'（'+schoolData[i].praise+'）'+'</li>'+
		           '<li>'+'评论'+'（'+schoolData[i].commentNumber+'）'+'</li>';
 		   }       	
		 $(".newThings_box1").append(str);
		}
	},
	error: function(){
		alert("网络错误");
	}

	})
})


	