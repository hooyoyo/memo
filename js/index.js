$(function() {
    /*if (!_isWeChat_()) {
        _toErrorPage_('请在微信内置浏览器中访问', '/memo/error'); // 静态'./template/memo/error.html'
        return;
    }*/
    _dropoffUrlParam_();
    $('body').show();

    /*var app_port_i = $('.app-port i');
    app_port_i.click(function () {
        var url = $(this).attr('url');
        window.location.href = url;
    });*/

    /*var svc_zone_img = $('.svc-zone img');
    svc_zone_img.click(function () {
        var url = $(this).attr('url');
        window.location.href = url;
    });*/
});