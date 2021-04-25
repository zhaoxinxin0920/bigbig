//入口函数
$(function() {
    // alert('ok')
    //1获取用户基本信息
    getUserInfo()
        //封装一个获取服务器地址的函数
    function getUserInfo() {
        $.ajax({
            mehod: 'get',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },

            success: function(res) {
                // console.log(res);
                //判断是否成功
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            },
            // complete: function(res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //         //强制删除本地存储token
            //         localStorage.removeItem('token')
            //             //强制页面跳转登陆页
            //         location.href = '/login.html'
            //     }
            // }
        })
    }

    function renderAvatar(user) {
        //获取用户名称
        var name = user.nickname || user.username
            //渲染欢迎语
        $('#welcome').html('欢迎' + name)
            //渲染头像
        if (user.user_pic !== null) {
            //渲染图片头像隐藏文字头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 渲染文字头像,隐藏图片头像
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        }

    }
    //退出按钮-
    //给退出按钮绑定点击事件
    $('#logout').on('click', function() {
        //弹出提示框,在luiui网址,弹层confirm里面找复制
        layer.confirm('你确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //删除本地存储token
            localStorage.removeItem('token')
                //页面跳转登陆页
            location.href = '/login.html'
            layer.close(index);
        })
    })
})