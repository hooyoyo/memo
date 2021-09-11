$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var cellOptB = $('.cell-option b');
    cellOptB.click(function () {
        if ($(this).hasClass('void')) return;
        if ($(this).hasClass('active')) $(this).removeClass('active').addClass('hold');
        else $(this).addClass('active');
    });
    cellOptB.mouseleave(function () {
        $(this).removeClass('hold');
    });

    var spClear = $('#spClear');
    spClear.click(function () {
        $('#taResult').val('');
    });
    
    var spGenerate = $('#spGenerate');
    spGenerate.click(function () {
        var chars = '';
        if (check('#upper')) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (check('#lower')) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (check('#number')) chars += '0123456789';
        if (check('#symbol')) chars += '`~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?';
        if (check('#custom')) chars += $('#meta').val().replace(/\s/g, '');
        if (check('#clear')) chars = chars.replace(/[0oO1lI2zZ]/g, '');

        var length = $('#length').val().trim();
        length = (_isEmpty_(length)) ? 8 : parseInt(length);
        var count = $('#count').val().trim();
        count = (_isEmpty_(count)) ? 1 : parseInt(count);
        var unique = check('#unique');

        var strs = [];
        for (var i = 0; i < count; i++) {
            var str = '';
            for (var j = 0; j < length; j++) {
                if (chars.length < 1) break;
                var index = Math.floor(Math.random() * chars.length);
                str += chars[index];
                if (unique) chars = chars.slice(0, index) + chars.slice(index + 1);
            }
            strs.push(str);
        }

        $('#taResult').val(strs.join("\n"));
    });
});

function check(selector) {
    if ($(selector).hasClass('active')) return true;
    return false;
}