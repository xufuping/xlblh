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
//视频轮播
	(function(){
		var index=0;
		var num=$(".btn span");
		len=num.length;
	//点击按钮换图
		$(".btn span").mouseover(function(){
			index=$(this).index();
			$(this).addClass('active1').siblings().removeClass('active1');
			$(".learn_content a").eq(index).stop(true,true).fadeIn()
								 .siblings().fadeOut();
		}).eq(0).mouseover();
	//图片自动滚动
		var timer=setInterval(showImg,5000);
		function showImg(){
			index++;
			if (index==len) {
				index=0;
			}
			$(".btn span").eq(index).addClass('active1').siblings().removeClass('active1');
			$(".learn_content a").eq(index).stop(true,true).fadeIn()
								 .siblings().fadeOut();
		}
		$(".learn_content").hover(function(){
			clearInterval(timer);
		},function(){
			timer=setInterval(showImg,5000);
		})
	})();

//点击视频
	/*(function(){
		$('.learn_content a').click(function(){
			$.ajax({
				type : "GET",
				url : "/GetMoocs.do",
				data : {
					SchoolId : $.cookie(COOKIE_NAME_schoolId)
				},
				success : function(data){
					var moocData = data.object;
					var newhref = 'mukebofangye.html'+'?MoocId='+ moocData.moocId
					$('.learn_content a').attr('href',newhref)
				}
			});
		})
	})();*/
	(function(){
		$.ajax({
			type : "GET",
			url : "/GetMoocs.do",
			data : {
				SchoolId : $.cookie(COOKIE_NAME_schoolId)
			},
			success : function(data){
				if (data.status === 0) {
					alert(data.message);
				}
				else{
					var moocData = data.object;
					// console.log(moocData);
					var moocStr = '';
					for(var i=0;i<moocData.length;i++){
					moocStr += '<a href="mukebofangye.html?MoocId='+ moocData[i].moocid +'" id="vedio_1"><img src="images/learn.jpg"></a>';
				}
				}
				$('.learn_content').append(moocStr);
			},
			error: function(data){
				alert("无法获取数据");
			}
		});
	})();

//图书推荐交互
	 (function(){

		$.ajax({
			type : "GET",
			url : "/GetBooks.do",
			data : {
				schoolId : $.cookie(COOKIE_NAME_schoolId)
			},
			success : function(data){
				if(data.status === '0'){
					alert(data. message);
				}
				else{
					var booksStr = '';
					var booksData;
					booksData = data.object;
					for(i=0; i<booksData.length; i++){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
						booksStr +=' <li class="books_li"><img src="'+ booksData[i].picture +'" class="book_img">'
								  +'</span><a href="bookInfo.html?bookId=' + booksData[i].bookid + '" class="book_name">'+ booksData[i].bookname
								  +'</a><span class="book_press">'+ booksData[i].publisher
								  +'</span></li>';
					}
				$('.books_ul').append(booksStr);
				$('.books_li').eq(booksData.length-1).addClass('books_li_last');
				}
			}
		});
		/*var data=[
			{
				picture : 'images/adv.jpg',
				bookid : 1,
				bookName : 2,
				publisher :3
			},
			{
				picture : 'images/adv.jpg',
				bookid : 1,
				bookName : 2,
				publisher :3
			},
			{
				picture : 'images/adv.jpg',
				bookid : 1,
				bookName : 2,
				publisher :3
			},
			{
				picture : 'images/adv.jpg',
				bookid : 1,
				bookName : 2,
				publisher :3
			},
		];
		var booksStr = '';
					var booksData;
					booksData = data;
					for(i=0; i<booksData.length; i++){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
						booksStr +=' <li class="books_li"><img src="'+ booksData[i].picture +'" class="book_img">'
								  +'</span><a href="bookInfo.html?bookId=' + booksData[i].bookid + '" class="book_name">'+ booksData[i].bookName
								  +'</a><span class="book_press">'+ booksData[i].publisher
								  +'</span></li>';
					}
				$('.books_ul').append(booksStr);
				$('.books_li').eq(booksData.length-1).addClass('books_li_last');*/
	})();
})