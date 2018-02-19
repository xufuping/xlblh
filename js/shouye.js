
$(document).ready(function(){
	// 链接后台的代码——安徽财经大学盒子
	$.ajax({
	    type: "GET",
		url: '/getSchools.do',
		
		success: function(data){
			if(data.status === '0') {
				alert("高校数据获取失败");
			}else{
				var schooldata = data.object;
				for (var i = 0; i < schooldata.length; i++) {
					var str = '';
				    str+= '<li class="school">'+'<a href="">'+schooldata[i].schoolname+'</a>'+'</li>';
				}
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>'+
			         // '<li class="school">'+'<a href="">'+schooldata.school+'</a>'+'</li>';
			}
			$(".school_ul").append(str);
		}
	})

	var num=$('.Carousel_span span').length;
	var i_mun=0;
	var timer_banner=null;
	$('.Carousel_ul li:gt(0)').hide();//页面加载隐藏所有的li 除了第一个
	
//底下小图标点击切换
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

});	

// $(function(){
// 	function getStyle(obj,attr){
// 	if(obj.currentStyle){
// 		return obj.currentStyle[attr]
// 	}else{
// 		return getComputedStyle(obj,false)[attr]
// 	}
// }

// function getByClass(oParent,nClass){
// 	var eLe = oParent.getElementsByTagName('*');
// 	var aRrent  = [];
// 	for(var i=0; i<eLe.length; i++){
// 		if(eLe[i].className == nClass){
// 			aRrent.push(eLe[i]);
// 		}
// 	}
// 	return aRrent;
// }

// $('#playBox').mouseover(function(){
// 	$('.pre').show();
// 	$('.next').show();
// });


// $('#playBox').mouseout(function(){
// 	$('.pre').hide();
// 	$('.next').hide();
// });

// function startMove(obj,att,add){
// 	clearInterval(obj.timer)
	
// 	obj.timer = setInterval(function(){
// 		var cutt = 0 ;
// 	   		if(att=='opacity'){
	   		
// 		   		cutt = Math.round(parseFloat(getStyle(obj,att)));
// 	   		}else{
// 		   		cutt = Math.round(parseInt(getStyle(obj,att)));
// 	   		}
			
// 		var speed = (add-cutt)/4;
		
// 		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		
// 		if(cutt==add){
// 		   clearInterval(obj.timer)
		
// 		}else{
// 		    if(att=='opacity'){
		    
// 			   obj.style.opacity = (cutt+speed)/100;
// 			   obj.style.filter = 'alpha(opacity:'+(cutt+speed)+')';
// 		    }else{
// 			   obj.style[att] = cutt+speed+'px';
			
// 		    }
// 	    }
// 	},30)
// }

// window.onload = function(){
// 	var playBox = document.getElementById('playBox');
// 	var oPre = getByClass(playBox,'pre')[0];
// 	var oNext = getByClass(playBox,'next')[0];
// 	var oUlBig = getByClass(playBox,'oUlplay')[0];
// 	var aBigLi = oUlBig.getElementsByTagName('li');
// 	var oDivSmall = getByClass(playBox,'smalltitle')[0]
// 	var aSmallLi = oDivSmall.getElementsByTagName('li');
	 
// 	var now = 0;

// 	function tab(){
// 	    for(var i=0; i<aSmallLi.length; i++){
// 		    aSmallLi[i].className = '';
// 	    }
// 	    aSmallLi[now].className = 'thistitle'
// 	    startMove(oUlBig,'left',-(now*aBigLi[0].offsetWidth))
// 	}

	
// 	for(var i=0; i<aSmallLi.length; i++){
// 	//i小于li总个数
// 		  	aSmallLi[i].index = i;
// 		  	//当前索引位置等于i
// 		  	aSmallLi[i].onclick = function(){
// 		  	//如果在点击之后，触发这个函数
// 			  	now = this.index;
// 			  	//now等于点击的第几个点数
// 			  	tab();
// 			  	//执行tab()
// 		}
// 	}

// 	oPre.onclick = function(){
// 	//点击向左的效果
// 		now--;
// 		if(now ==-1){
// 			now = aBigLi.length-1;
// 		}
// 		//如果在第一个图片点击向左，那么now=-1，这时候直接让now等于li总数减去一个（数组计算如果不减去1会多一个）
// 		   tab();
// 	}

// 	oNext.onclick = function(){
// 		now++;
// 		if(now ==aBigLi.length){
// 			now = 0;
// 		}
// 		  tab();
// 	}
	  
// 	var timer = setInterval(oNext.onclick,3000) 
// 	playBox.onmouseover = function(){
// 		clearInterval(timer)
// 	}
// 	playBox.onmouseout = function(){
// 		timer = setInterval(oNext.onclick,3000) 
// 	}
//   }
// })
