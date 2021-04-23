//1入口函数
// $(function() {
//     // //2单机去注册
//     // $('#link_reg ').on('click', function() {
//     //         //注册表单显示
//     //         $('.reg-box').show()
//     //             //登陆表单隐藏
//     //         $('.login-box').hide()
//     //     })
//     //     //单机去登陆
//     // $('#link_login').on('click', function() {
//     //     //注册表单隐藏
//     //     $('.reg-box').hide()
//     //         //登录表单显示
//     //     $('.login-box').show()
//     // })
//     //2单机去注册
//     $('#link_reg,#link_login').on('click', function() {
//             //注册表单,切换元素显示与隐藏
//             $('.reg-box,.login-box').toggle()
//         })
//         //自定义校验证
//     layui.form.verify({
//             //密码必须是6-12位非空字符
//             pwd: [
//                 /^[\s]{6,12}$/,
//                 '密码必须6-12位'
//             ],
//             repwd: function(value, item) {
//                 console.log(value);
//                 //value 那个表单项使用了这个规则,value是表单项的值
//                 //value就是确认密码框的值
//                 //获取密码框的值
//                 var pwd = $('.reg-box [name=password]').val().trim()
//                 if (pwd !== value) {
//                     return '两次密码必须一致'
//                 }
//             }
//         })
//         //3实现注册功能
//     $('#form_reg').on('submit', function(e) {
//         //3.1阻止默认提交行为
//         e.preventDefault()
//             //3.2收集表单数据
//         var data = {
//                 username: $('.reg-box [name=username]').val().trim(),
//                 password: $('.reg-box [name=password]').val().trim(),

//             }
//             //3.3发送请求
//         $.ajax({
//             method: 'post',
//             url: 'http://api-breakingnews-web.itheima.net/api/reguser',
//             data: data,
//             //3.4判断是否成功
//             success: function(res) {
//                 if (res.status !== 0) {
//                     return alert('注册失败')
//                 }
//                 $('#link_login').click()
//             }
//         })
//     })
// })






// 入口函数
$(function() {

    // // 给去注册绑定点击事件
    // $('#link_reg').on('click', function() {
    //     // 将登录隐藏
    //     $('.login-box').hide();
    //     // 将注册显示
    //     $('.reg-box').show();
    // });
    // // 给去登录绑定点击事件
    // $('#link_login').on('click', function() {
    //     // 将登录显示
    //     $('.login-box').show();
    //     // 将注册显示
    //     $('.reg-box').hide();
    // });
    // 使用类
    // $('#link_reg,#link_login').on('click', function() {
    //     $('.login-box').toggleClass('active').siblings('.reg-box').toggleClass('active');
    // });
    // 直接使用toggle和并集选择器
    $('#link_reg,#link_login').on('click', function() {
        $('.login-box,.reg-box').toggle();
    });

    // 自定义校验规则
    var form = layui.form;
    form.verify({
        // 密码校验规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function(value, item) {
            // console.log(value, item);
            // item是调用该规则的元素结构

            // value是调用该规则的表单的值
            // 在这里就是确认密码值
            // 获取密码的值
            var pwdipt = $('.reg-box [name=password]').val();
            // 判断两次输入的密码是否一致
            if (pwdipt !== value) {
                return '两次输入密码不一致';
            }
        }
    });


    // 注册功能
    $('#form_reg').submit(function(e) {
        // 阻止默认事件
        e.preventDefault(e);
        // 获取表单数据
        var data = {
            username: $('.reg-box [name=username]').val().trim(),
            password: $('.reg-box [name=password]').val().trim(),
        }

        // console.log(data);
        // 发送ajax请求
        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: data,
            success: function(res) {
                console.log(res);
                // 判断请求是否成功
                if (res.status !== 0) {
                    // return alert('注册失败')
                    return layui.layer.msg(es.message, { icon: 5 })
                }
                layui.layer.msg('注册成功', { icon: 6 }, function() {
                    // 调用去登录的点击事件
                    $('#link_login').click();
                })

            }
        });
    });
    //4登录功能
    //4.1添加事件
    $('#form_login').on('submit', function(e) {
        //4.2阻止默认行为
        e.preventDefault()
            //4.3收集表单数据
        var data = $(this).serialize()
            //4.4发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function(res) {
                // console.log(res);
                //判断是否成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    //把token保存到本地存储
                    localStorage.setItem('token', res.token)
                        //登录成功跳转页面
                    location.href = '/index.html'
                })
            },
        })
    })




})