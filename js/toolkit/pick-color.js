$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var colorTypeSpan = $('.color-type span');
    colorTypeSpan.click(function () {
        colorTypeSpan.removeClass('active');
        $(this).addClass('active');
    });

    var inpFG = $('#inpFG');
    var inpBG = $('#inpBG');

    var aConvert = $('#aConvert');
    aConvert.click(function () {
        var select = $('.cell-option .active').prop('class').split(/\s/)[0];

        switch (select) {
            case 'hex2rgb':
                hex2rgb(inpFG);
                hex2rgb(inpBG);
                break;
            case 'rgb2hex':
                rgb2hex(inpFG);
                rgb2hex(inpBG);
                break;
        }
    });

    var aReset = $('#aReset');
    aReset.click(function () {
        inpFG.val('#fa2409');
        inpFG.css('background-color', '#fa2409');
        inpFG.css('color', '#d3d3d3');
        inpBG.val('rgb(32, 112, 233)');
        inpBG.css('background-color', 'rgb(32, 112, 233)');
        inpBG.css('color', 'rgb(221, 221, 221)');
    });
});

function hex2rgb(inp) {
    var val = inp.val().trim();
    var regHex = /(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/;
    if (regHex.test(val)) {
        var r = parseInt(val.substring(1, 3), 16);
        var g = parseInt(val.substring(3, 5), 16);
        var b = parseInt(val.substring(5, 7), 16);
        var rgb = 'rgb(' + r + ', '+ g + ', '+ b + ')';
        inp.val(rgb);
    }
}

function rgb2hex(inp) {
    var val = inp.val().trim();
    var regRGB = /(^[rR][gG][bB]\([0-9]{1,3}, *[0-9]{1,3}, *[0-9]{1,3}\)$)|(^[rR][gG][bB][aA]\([0-9]{1,3}, *[0-9]{1,3}, *[0-9]{1,3},(1|0.[0-9]{1,2})\)$)/;
    if (regRGB.test(val)) {
        val = val.replace(/\s+/g, '').split(/[\(\)]/)[1].split(',');
        var r = parseInt(val[0], 10).toString(16);//.toUpperCase();
        if (r.length < 2) r = '0' + r;
        var g = parseInt(val[1], 10).toString(16);//.toUpperCase();
        if (g.length < 2) g = '0' + g;
        var b = parseInt(val[2], 10).toString(16);//.toUpperCase();
        if (b.length < 2) b = '0' + b;
        var hex = '#' + r + g + b;
        inp.val(hex);
    }
}