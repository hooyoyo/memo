$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var baseTypeSpan = $('.radix-type span');
    baseTypeSpan.click(function () {
        baseTypeSpan.removeClass('active');
        $(this).addClass('active');
        inpData.keyup();
    });

    var inpData = $('#inpData');
    inpData.keyup(function () {
        var value = $(this).val().trim();
        if (_isEmpty_(value)) {
            $('.result-list .binary').text('');
            $('.result-list .octal').text('');
            $('.result-list .decimal').text('');
            $('.result-list .hex').text('');
            return;
        }
        var type = $('.radix-type .active').prop('class').split(/\s+/)[0];
        var t = type == 'binary' ? 2 : type == 'octal' ? 8 : type == 'hex' ? 16 : 10;
        var v = parseInt(value, t);
        var bResult = v.toString(2);
        var oResult = v.toString(8);
        var dResult = v.toString(10);
        var hResult = v.toString(16);
        $('.result-list .binary').text(bResult);
        $('.result-list .octal').text(oResult);
        $('.result-list .decimal').text(dResult);
        $('.result-list .hex').text(hResult);
    });
});