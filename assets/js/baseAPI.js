//ajax预处理函数
$.ajaxPrefilter(function(options) {
    //统一设置url地址,根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        //请求头,如果请求url地址是有权限的接口,设置请求头
        //url中包含了my说明就是有权限的接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 给options配置项,增加一个complete配置
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //强制删除本地存储token
            localStorage.removeItem('token')
                //强制页面跳转登陆页
            location.href = '/login.html'
        }
    }

})