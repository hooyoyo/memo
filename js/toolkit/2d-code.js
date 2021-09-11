$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var codeTypeSpan = $('.code-type span');
    codeTypeSpan.click(function () {
        codeTypeSpan.removeClass('active');
        $(this).addClass('active');

        $('.code-panel').addClass('hidden');
        var type =  $(this).prop('class').split(/\s+/)[0];
        var activeID = '#' + type;
        $(activeID).removeClass('hidden');
    });

    var cellOptB = $('.cell-option b');
    cellOptB.click(function () {
        if ($(this).hasClass('active')) $(this).removeClass('active').addClass('hold');
        else $(this).addClass('active');
    });
    cellOptB.mouseleave(function () {
        $(this).removeClass('hold');
    });

    var qrDefaultOptions = {
        text: 'null',
        width: 128,
        height: 128,
        colorDark : '#000',
        colorLight : '#fff',
        correctLevel : QRCode.CorrectLevel.H
    };
    var qrOptions = qrDefaultOptions;

    var barDefaultOptions = {
        format: "code128",
        width: 2,
        height: 100,
        background: "#fff",
        lineColor: "#000",
        //textPosition: "bottom",
        //textAlign: "center",
        //font: "monospace",
        //fontSize: 12,
        displayValue: true
    };
    var barOptions = barDefaultOptions;

    var thumbnail = $('.thumbnail');
    thumbnail.click(function () {
        var src = $(this).children('img').prop('src');
        if (_isEmpty_(src)) return;

        var inner = $('#extCanvas')[0];
        var outer = $('.extend-view')[0];
        drawPicture(src, inner, outer);

        $('.extend-view').toggle();
    });
    var extend_view = $('.extend-view');
    extend_view.click(function () {
        $('.extend-view').toggle();
    });

    var qr = $('#qr');
    var qrcode = $('#qrcode');
    var bar = $('#bar');
    var barcode = $('#barcode');

    var spGenerate = $('#spGenerate');
    spGenerate.click(function () {
        spReset.click();
        var errMsg = '';
        var codeType = $('.code-panel:not(".hidden")').prop('id');
        switch (codeType) {
            case 'qr':
                var qrText = $('#taSource').val().trim();
                var qrSize = $('#qrSize').val().trim();
                var qrCLevel = $('#qrCLevel').val().toUpperCase().trim();
                var qrFgColor = $('#qrFgColor').val().toUpperCase().trim();
                var qrBgColor = $('#qrBgColor').val().toUpperCase().trim();

                //errMsg += _isEmpty_(qrText) ? '内容不可为空\n' : '';
                errMsg += (!_isEmpty_(qrSize) && !_regExp_.isIntegerNumber(qrSize) || parseInt(qrSize) < 64 || parseInt(qrSize) > 1024) ? '参数“大小”错误！有效取值范围：[64-1024]。<br>' : '';
                errMsg += (!_isEmpty_(qrCLevel) && ['L','M','Q','H'].indexOf(qrCLevel) < 0) ? '参数“容错”错误！有效取值范围：[L,M,Q,H]，不区分大小写。<br>' : '';
                errMsg += (!_isEmpty_(qrFgColor) && !_regExp_.isColor(qrFgColor)) ? '参数“前景色”错误！有效取值范围：[#000000-#FFFFFF]；格式：3位或6位，由数字及字母A到F组成，不区分大小写。<br>' : '';
                errMsg += (!_isEmpty_(qrBgColor) && !_regExp_.isColor(qrBgColor)) ? '参数“背景色”错误！有效取值范围：[#000000-#FFFFFF]；格式：3位或6位，由数字及字母A到F组成，不区分大小写。<br>' : '';
                if (!_isEmpty_(errMsg)) {
                    _tipDialog_.popForm('alert', '提示', errMsg);
                    return;
                }

                qrOptions.text = _isEmpty_(qrText) ? qrDefaultOptions.text : qrText;
                qrOptions.width = _isEmpty_(qrSize) ? qrDefaultOptions.width : parseInt(qrSize);
                qrOptions.height = _isEmpty_(qrSize) ? qrDefaultOptions.height : parseInt(qrSize);
                qrOptions.correctLevel = qrCLevel == 'L' ? QRCode.CorrectLevel.L : qrCLevel == 'M' ? QRCode.CorrectLevel.M : qrCLevel == 'Q' ? QRCode.CorrectLevel.Q : qrCLevel == 'H' ? QRCode.CorrectLevel.H : qrDefaultOptions.correctLevel;
                qrOptions.colorDark = _isEmpty_(qrFgColor) ? qrDefaultOptions.colorDark : qrFgColor;
                qrOptions.colorLight = _isEmpty_(qrBgColor) ? qrDefaultOptions.colorLight : qrBgColor;

                new QRCode('qrcode', qrOptions);
                break;
            case 'bar':
                var barText = $('#taSource').val().trim();
                var barMode = $('#barMode').val().toLowerCase().trim();
                var barWidth = $('#barWidth').val().trim();
                var barHeight = $('#barHeight').val().trim();
                var barFgColor = $('#barFgColor').val().toUpperCase().trim();
                var barBgColor = $('#barBgColor').val().toUpperCase().trim();
                var barShowValue = $('.show-value').hasClass('active');

                //errMsg += _isEmpty_(barText) ? '内容不可为空\n' : '';
                errMsg += (!_isEmpty_(barMode) && ['code128','code39','ean13','ean8','ean5','ean2','upc','itf14','itf','msi','msi10','msi11','msi1010','msi1110','pharmacode','codabar'].indexOf(barMode) < 0) ? '参数“码制”错误！有效取值范围：[CODE128,CODE39,EAN13,EAN8,EAN5,EAN2,UPC,ITF14,ITF,MSI,MSI10,MSI11,MSI1010,MSI1110,PharmaCode,CodaBar]，不区分大小写；注意：输入的内容要符合对应的码制才可成功编码。<br>' : '';
                errMsg += (!_isEmpty_(barWidth) && !_regExp_.isIntegerNumber(barWidth) || parseInt(barWidth) < 1 || parseInt(barWidth) > 5) ? '参数“细处宽”错误！有效取值范围：[1-5]。<br>' : '';
                errMsg += (!_isEmpty_(barHeight) && !_regExp_.isIntegerNumber(barHeight) || parseInt(barHeight) < 20 || parseInt(barHeight) > 800) ? '参数“条形高”错误！有效取值范围：[200-800]。<br>' : '';
                errMsg += (!_isEmpty_(barFgColor) && !_regExp_.isColor(barFgColor)) ? '参数“前景色”错误！有效取值范围：[#000000-#FFFFFF]；格式：3位或6位，由数字及字母A到F组成，不区分大小写。<br>' : '';
                errMsg += (!_isEmpty_(barBgColor) && !_regExp_.isColor(barBgColor)) ? '参数“背景色”错误！有效取值范围：[#000000-#FFFFFF]；格式：3位或6位，由数字及字母A到F组成，不区分大小写。<br>' : '';
                if (!_isEmpty_(errMsg)) {
                    _tipDialog_.popForm('alert', '提示', errMsg);
                    return;
                }

                if (_isEmpty_(barText)) barText = 'null';
                barOptions.format = _isEmpty_(barMode) ? barDefaultOptions.format : barMode;
                barOptions.width = _isEmpty_(barWidth) ? barDefaultOptions.width : parseInt(barWidth);
                barOptions.height = _isEmpty_(barHeight) ? barDefaultOptions.height : parseInt(barHeight);
                barOptions.lineColor = _isEmpty_(barFgColor) ? barDefaultOptions.lineColor : barFgColor;
                barOptions.background = _isEmpty_(barBgColor) ? barDefaultOptions.background : barBgColor;
                barOptions.displayValue = barShowValue;

                var barImg = 'barImg';
                barcode.html('<img id="' + barImg + '"/>');
                JsBarcode('#' + barImg, barText, barOptions);
                break;
            default:
                break;
        }
    });

    var spReset = $('#spReset');
    spReset.click(function () {
        var codeType = $('.code-panel:not(".hidden")').prop('id');
        var download;
        switch (codeType) {
            case 'qr':
                qrcode.empty();
                download = qr.find('a');
                break;
            case 'bar':
                barcode.empty();
                download = bar.find('a');
                break;
            default:
                break;
        }
        download.prop('href', '');
        download.prop('download', '');
    });

    var btnDownload = $('.btn-download');
    btnDownload.click(function () {
        var codeType = $('.code-panel:not(".hidden")').prop('id');
        var imgSrc, download;
        switch (codeType) {
            case 'qr':
                imgSrc = qrcode.find('img').prop('src');
                download = qr.find('a');
                break;
            case 'bar':
                imgSrc = barcode.find('img').prop('src');
                download = bar.find('a');
                break;
            default:
                break;
        }

        var fileName = codeType + (new Date()).getTime() + '.' + 'png';

        download.prop('href', imgSrc);
        download.prop('download', fileName);
    });
});

function drawPicture(src, innerCanvas, outerDiv) {
    var image = new Image();
    image.onload = function () {
        var cvs = innerCanvas;
        var div = outerDiv;
        var ctx = cvs.getContext('2d');
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        cvs.width = image.width;
        cvs.height = image.height;
        var divWStr = (cvs.width > window.innerWidth) ? cvs.width : window.innerWidth;
        var divHStr = (cvs.height > window.innerHeight) ? cvs.height : window.innerHeight;
        div.style.width = divWStr + 'px';
        div.style.height = divHStr + 'px';
        if ($(div).height() > cvs.height) {
            var cvsMgTop = ($(div).height() - cvs.height) / 2;
            $(cvs).css('margin-top', cvsMgTop + 'px');
        } else {
            $(cvs).css('margin-top', 0);
        }
        ctx.drawImage(image, 0, 0, image.width, image.height);
    };
    image.src = src;
}