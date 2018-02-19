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
//点击图片上的讨论主题
	$.ajax({
		type : "GET",
		url : "/GetTopicsBySchool.do",
		data : {
			nowPage : 1,
            pagesize : 5,
            schoolId : $.cookie(COOKIE_NAME_schoolId)
		},
		success : function(data){
			if (data.status === 0) {
				alert(data.message);
			}
			else{
				var topicData = data.object;
				var topicStr = '';
				topicStr = '<a class="dis_1" href="grassDis.html?topicname='+ topicData[0].topicname +'&topicId='+ topicData[0].topicid +'">'+ topicData[0].topicname +'</a>'+
						   '<a class="dis_2" href="grassDis.html?topicname='+ topicData[1].topicname +'&topicId='+ topicData[1].topicid +'">'+ topicData[1].topicname +'</a>'+
						   '<a class="dis_3" href="grassDis.html?topicname='+ topicData[2].topicname +'&topicId='+ topicData[2].topicid +'">'+ topicData[2].topicname +'</a>'+
						   '<a class="dis_4" href="grassDis.html?topicname='+ topicData[3].topicname +'&topicId='+ topicData[3].topicid +'">'+ topicData[3].topicname +'</a>'+
						   '<a class="dis_5" href="grassDis.html?topicname='+ topicData[4].topicname +'&topicId='+ topicData[4].topicid +'">'+ topicData[4].topicname +'</a>';
			}
			$('.mainImg').append(topicStr);
		}
	})
//你问我答交互
		$.ajax({
			type: "GET",
			url: "/getQuestionsBySchool.do",
			data: {
				page:1,
				pageSize: 3,
				schoolId: $.cookie(COOKIE_NAME_schoolId)
			},
			success: function (data) {
				if (data.status === '0') {
					alert(data.message);
				}
				else {
					var talkContentStr = '';
					var talkData = data.object;
					for (var i = 0; i < talkData.length; i++) {
						talkContentStr += '<p class="question_contain_all"><span class="question_contain_word"><a href="askAnswer.html?questionId=' + talkData[i].questionid + '">' + talkData[i].title
										+ '</a></span><span class="Post_Username_1" id="Username">' + talkData[i].userid
										+ '</span><span class="Post_Username_2" id="Username">' + talkData[i].createdate
										+ '</span></p>';
					}
					$('.question_contain').html(talkContentStr);
				}
			}
		});

})


