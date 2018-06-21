$(function() {
    /*if (!_isWeChat_()) {
        _toErrorPage_('请在微信内置浏览器中访问', '/memo/error'); // 静态'./template/memo/error.html'
        return;
    }*/
    _dropoffUrlParam_();
    $('body').show();

    var certidTypeSpan = $('.certid-type span');
    certidTypeSpan.click(function () {
        certidTypeSpan.removeClass('active');
        $(this).addClass('active');
    });
});