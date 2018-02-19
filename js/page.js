$(document).ready(function(){
    {
    "emptyIdentifier": 1,
    "map": {
        "message": "测试内容3171",
        "question": {
            "content": 1,
            "createDate": 1,
            "questionId": 1,
            "schoolName": 1,
            "title": 1,
            "userName": 1
        },
        "status": 11071
    }
}





    $.ajax({
	type: 'GET',
	url: '/GetUserInformation.do',
	data: {
		'question': $("textarea").val();
	},
	success: function(data){
		var userData;
		var str = '';
		if(data.status === '0') {
			alert(data.message);
		} else {
			userData = data.object;
			str1 = '<h2>' + userData.userName + '<a href="##">（修改资料）</a></h2>' +
	              '<p id="email">' + userData.email + '</p>' +
	              '<p id="schoolName">"'+ userData.schoolName + '</p>' +
	              '<p id="studentNumber">' + userData.studentNumber + '</p>';
	        str2='<p class="mancenter_msg_box" id="people_img">'+userData.picture+'</p>';
            str3='<div class="postTitle">'+
                    '<h3>'+userData.title+'</h3>'+
	                '<a href="##">'+userData.userNum+'</a>'+
	                '<p>'+userData.reDate+'</p>'+
 	                '<p>'+userData.reUser+'</p>'+
 	             '</div>';
		}
		$('.mancenter_msg_box1').append(str1);
		$('.mancenter_msg_box').append(str2);
        for(var i=0;i<3;i++){
 	 	$(".myPost").append(str3);
        $(".myResponse").append(str3);
        $(".myQuestion").append(str3);
        $(".myAnswer").append(str3);
        }
	}
});


    
})
 