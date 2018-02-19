$(function(){

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
//分页按钮
	var pageNum; 
    var itemNum;   
    var nowPage = 1; 
    var pageLen = 6; // 每页显示6条数据
    var index = 0; // 当前页面的索引值
    var searchpage_contain = ''; // 当前页面分页的内容
    var pageContentStr = '';
    var pageBtnStr = ''; // 页面的page_li
    var page_li = ''; // 当前
	var searchData;
    (function(){
        //获取文章数目//得到搜索内容
        $.ajax({
            type: 'GET',
            url: '/searchSchool.do',
			data : {
				text : getSearchString('text')
			},
            success: function(data){
                if(data.status === '0') {
                    alert(data.message);    
                }
                else{
                    // var pageNum = Math.ceil(itemNum/6);
                    // var pageBtnStr = '';
                    //searchData = data.Object; // 你们的自己改为data.object
					console.log(data.object.length-1);
                    initPage(data.object);
                    addPageNum(pageNum);
                    showPage(0);
                // 点击页数切换
                    $('.page_li').click(function(){
				    	index = $(this).index();
				    	showPage(index);
				    })
                }
            },
            error : function(data){
                alert("1");
            }
        });
    })();
	
    function initPage(searchData){
        //var pageData = data.object;
        for(var i=0;i<searchData.length;i++){
            pageContentStr +='<div class="searchpage_contain"><h3>' + searchData[i].schoolName
                        	+'</h3><img src="'+ searchData[i].logo +'"><p>'+ searchData[i].address
                        	+'<a href="http://www.baidu.com">www.baidu.com</a></p></div>';
        }
        $('.searchpage_box_int').html(pageContentStr); // 将内容添加到页面
        searchpage_contain = $('.searchpage_box_int').find('.searchpage_contain'); // 找出页面共有多少条内容
        searchpage_contain.oListsLen = searchpage_contain.length; // 求出内容的条数
        pageNum = Math.ceil(searchpage_contain.oListsLen/pageLen); // 根据内容数与每页显示条数求出多少页
        // $('.allNum').html("共"+getPage.pageNum+"页");
    }

    // 添加页数
	function addPageNum(pageNum){
		 for(var i = 1; i <= pageNum; i++) {
             pageBtnStr += '<li class="page_li">'+ i +'</li>';
         }
         $('.page_ul').append(pageBtnStr);
         page_li = $('.page_ul').find('.page_li');
	}


    function showPage(num) {
        $(searchpage_contain).hide();
        for(var i = index * pageLen;i < (index + 1) * pageLen;i++){
            $(searchpage_contain[i]).css({"display":"block"});
        }
        $('.page_li').eq(num).css({'color':'#fff','background-color':'#eaec63'}).siblings().css({'color':'#333','background-color':'#fff'});
        // isFirstLast();
    }

    // 点击下一页切换
    $('#page_next').click(function(){
    	if(index == (pageNum - 1)){
    		alert('这是尾页!');
    		return false;
    	}
    	index +=1;
    	showPage(index);
    })
    // 点击上一页切换
    $('#page_prev').click(function(){
    	if(index == 0){
    		alert('这是首页!');
    		return false;
    	}
    	index -=1;
    	showPage(index);
    	page_li = $('.page_ul').find('.page_li');
    })

})