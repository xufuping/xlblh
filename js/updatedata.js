$(function(){
       //查询字符串
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
        
        //提交验证
        $(".updatedata_container input").blur(function(){
            var $parent=$(this).parent();
            //验证昵称
            if($(this).is("#userName")){
                $parent.find('.errorMsg_on').remove();
                if(this.value == " " || this.value.length < 3){
                    var errorMsg="请输入至少3位的昵称";
                    $parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
                }else if(/[0-9]/.test(this.value)){
                    var numMgs="请输入不包含数字的昵称";
                    $parent.append('<span class="errorMsg_on">'+numMgs+'</span>');
                }else if(/[^a-zA-Z0-9\_\u4e00-\u9fa5]/.test(this.value)){
                    var charMgs="请不要输入非法字符！";
                    $parent.append('<span class="errorMsg_on">'+charMgs+'</span>');
                }else{
                    var okMgs="输入正确！";
                    $parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
                }
            }

            //验证密码
            if($(this).is("#passWord")){
                $parent.find('.errorMsg_on').remove();
                if(this.value == ''){
                    var errorMsg="密码不能为空哦，亲！";
                    $parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
                }else if(this.value.length < 6){
                    var wordMgs="密码的长度为6~18位哦！";
                    $parent.append('<span class="errorMsg_on">'+wordMgs+'</span>');
                }else if(this.value.length > 18){
                    var charMgs="密码的长度为6~18位哦！";
                    $parent.append('<span class="errorMsg_on">'+charMgs+'</span>');
                }
                else if(/[^a-zA-Z0-9]/.test(this.value)){
                    var charMgs="密码由数字和字母组成！";
                    $parent.append('<span class="errorMsg_on">'+charMgs+'</span>');
                }else{
                    var okMgs="输入正确！";
                    $parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
                }
            }

            //确认密码
            if ($(this).is("#agpassWord")){
                $parent.find('.errorMsg_on').remove();
                if(this.value ==""){
                    var errorMsg="不能为空";
                    $parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
                }else if(this.value != $("#passWord").val()){
                    var agMgs="两次输入的密码不一致，请重新输入！";
                    $parent.append('<span class="errorMsg_on">'+agMgs+'</span>');
                }else{
                    var okMgs="输入正确！";
                    $parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
                }
            }

            //验证邮箱
            if ($(this).is("#email")){
                $parent.find('.errorMsg_on').remove();
                if( !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())){
                    var agMgs="请输入正确的邮箱格式！";
                    $parent.append('<span class="errorMsg_on">'+agMgs+'</span>');
                }else if(this.value.length == 0){
                    var errorMsg="不能为空";
                    $parent.append('<span class="errorMsg_on">'+errorMsg+'</span>');
                }else{
                    var okMgs="输入正确！";
                    $parent.append('<span class="errorMsg_on">'+okMgs+'</span>');
                }
            }
        });


        //修改提交数据
        $(".updatedata_login").click(function(){
            $.ajax({
            'url':'/ModifyUserInfo.do',
            'data':{
                password: $('#passWord').val(),
                email: $('#email').val(),
                studentNumber: $('#studentNumber').val(),
                picture: $('#file').val(),
                userId: getSearchString('userId')
            },
            'success':function(data){
                if( data.status == 1) {
                    // 登陆跳转
                    var userdata=data.object;
                    console.log(data.object);
                        alert( "修改成功！" );
                    window.location.href="shouye.html";

                } else {
                // 修改失败
                var errorMsg = data.message;
                    alert( "修改失败" );
                }
            },
            'type':'get',
            'dataType':'json'
            });
        });

        //请求验证码
        (function(){
            $.ajax({
            type: 'GET',
            url: '/ImageCode.do',
            'success': function(){
                
                    var $img=$("<img src='/ImageCode.do' alt='请上传头像'>");
                    $(".checked_box").html($img);
            }
            });
        })(); 

        //请求刷新验证码图片
        $(".checked_box").click(function(){
            $.ajax({
            type: 'GET',
            url: '/ImageCode.do',
            'success': function(){
                
                    var $img=$("<img src='/ImageCode.do' alt='请上传头像'>");
                    $(".checked_box").html($img);
            }
            });
            $(this).attr('src','/ImageCode.do?'+Math.random());
        });
});

//上传图片并预览
window.URL = window.URL || window.webkitURL;
var fileElem = document.getElementById("file");
    fileList = document.getElementById("picture");
    function handleFiles(obj) {
        var files = obj.files;
        img = new Image();
        if(window.URL){
            //File API
            img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
            img.width = 150;
            img.height = 100;
            img.onload = function(e) {
                window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
            }
            fileList.appendChild(img);
        }else if(window.FileReader){
            //opera不支持createObjectURL/revokeObjectURL方法。我们用FileReader对象来处理
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function(e){
                alert(files[0].name + "," +e.total + " bytes");
                img.src = this.result;
                img.width = 150;
                img.height = 100;
                fileList.appendChild(img);
            }
        }else{
            //ie
            obj.select();
            obj.blur();
            var nfile = document.selection.createRange().text;
            document.selection.empty();
            img.src = nfile;
            img.width = 150;
            img.height = 100;
            img.onload=function(){
                alert(nfile+","+img.fileSize + " bytes");
            }
            fileList.appendChild(img);
        }
    }




 
 
