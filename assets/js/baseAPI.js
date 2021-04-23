//ajax预处理函数
$.ajaxPrefilter(function(options) {
    //统一设置url地址,根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})