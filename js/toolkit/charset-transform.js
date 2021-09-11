$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var cellOptB = $('.cell-option b');
    cellOptB.click(function () {
        $(this).siblings('b').removeClass('active');
        $(this).addClass('active');
    });

    var spClear = $('#spClear');
    spClear.click(function () {
        $('#taTarget').val('');
        $('#taSource').val('');
    });
    
    var spTrans = $('#spTrans');
    spTrans.click(function () {
        var taTarget = $('#taTarget');
        var taSrcVal = $('#taSource').val();

        var inType = $('.in-type .active').prop('class').split(/\s+/)[2];
        var input = '';
        if (inType == 'native') {
            for (var i = 0; i < taSrcVal.length; i++) {
                var codeVal = parseInt(taSrcVal[i].charCodeAt(0), 10).toString(16);
                while (codeVal.length < 4) codeVal = '0' + codeVal;
                input += '\\u' + codeVal.toUpperCase();
            }
        } else if (inType == 'gbk') {
            var reg = /^(\&\#x[0-9a-f]{2}[0-9a-f]{2}\;|\?)+$/;
            if (reg.test(taSrcVal)) {
                input = $GBK.toUnicode(taSrcVal);
            } else {
                taTarget.val('');
                return;
            }
        } else if  (inType == 'unicode') {
            var reg = /^(\\u[0-9a-fA-F]{2}[0-9a-fA-F]{2}|\?)+$/;
            if (reg.test(taSrcVal)) {
                input = taSrcVal;
            } else {
                taTarget.val('');
                return;
            }
        } else {

        }

        var outType = $('.out-type .active').prop('class').split(/\s+/)[2];
        var output = '';
        if (outType == 'native') {
            var codes = input.split('\\u');
            codes.shift();
            for(var i = 0; i < codes.length; i++) {
                output += String.fromCharCode(parseInt(codes[i], 16).toString(10));
            }
        } else if (outType == 'gbk') {
            output = $GBK.toGBK(input);
        } else if  (outType == 'unicode') {
            output = input;
        } else {

        }

        taTarget.val(output);
    });
});