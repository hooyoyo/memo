$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var loadTypeSpan = $('.load-type span');
    loadTypeSpan.click(function () {
        loadTypeSpan.removeClass('active');
        $(this).addClass('active');

        $('.resource-file').hide();
        var loadType = loadTypeSpan.siblings('.active').prop('class').split(/\s+/)[0];
        if (loadType == 'local') {
            inpUrl.val('');
            $('.local-file').show();
        } else if (loadType == 'online') {
            inpFile.val('');
            inpFileName.val('');
            $('.online-file').show();
        }
    });

    var inpUrl = $('#inpUrl');
    inpUrl.change(function () {
        var imgUrl = inpUrl.val().trim();
        thumbnail.attr('src', imgUrl);

        genDataUrl(imgUrl, null, function (dataurl) {
            thumbnail.prop('src', dataurl);
        });
    });

    var extendPanel = $(".extend-panel");
    var iMarkConfig = $('#iMarkConfig');
    iMarkConfig.click(function () {
        extendPanel.filter('.ext-mark-config').toggle();
    });
    var closeMarkConfig = $('#closeMarkConfig');
    closeMarkConfig.click(function () {
        var markSize = inpMarkSize.val(inpMarkSize.attr('markSize'));
        var markPosition = inpMarkPosition.val(inpMarkPosition.attr('markPosition'));
        var markColor = inpMarkColor.val(inpMarkColor.attr('markColor'));
        extendPanel.filter('.ext-mark-config').toggle();
    });
    var inpMarkSize = $('#inpMarkSize');
    var inpMarkPosition = $('#inpMarkPosition');
    var inpMarkColor = $('#inpMarkColor');
    var confirmMarkConfig = $('#confirmMarkConfig');
    confirmMarkConfig.click(function () {
        var markSize = inpMarkSize.val().replace(/\s/g, '');
        var markPosition = inpMarkPosition.val().replace(/\s/g, '');
        var markColor = inpMarkColor.val().replace(/\s/g, '');

        var errMsg = '';
        if (!_isEmpty_(markSize) && (!_regExp_.isIntegerNumber(markSize) || markSize == '0')) errMsg += '水印参数“字体大小”错误！有效取值应为正整数，如：12。<br>';
        if (!_isEmpty_(markPosition) && !_regExp_.isCoordinate(markPosition)) errMsg += '水印参数“字体位置”错误！有效取值应为坐标对，如：15,15。<br>';
        if (!_isEmpty_(markColor) && !_regExp_.isColor(markColor)) errMsg += '水印参数“字体颜色”错误！有效取值应为颜色，如：rgba(255,255,255,0.5)。<br>';
        if (!_isEmpty_(errMsg)) {
            _tipDialog_.popForm('alert', '提示', errMsg);
            return;
        }

        if (!_isEmpty_(markSize)) inpMarkSize.attr('markSize', markSize);
        if (!_isEmpty_(markPosition)) inpMarkPosition.attr('markPosition', markPosition);
        if (!_isEmpty_(markColor)) inpMarkColor.attr('markColor', markColor);
        extendPanel.filter('.ext-mark-config').toggle();
    });

    var storeType = $('#storeType');
    var resizeType = $('#resizeType');

    $('.main-shell').click(function () {
        $('.ext-widget-list').hide();
        $('.ext-widget-button.toggle-arrow').removeClass('up-arrow').addClass('down-arrow');
    });
    $('.btn-select').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var thisList = $(this).siblings('.ext-widget-list');
        var otherList = $('.ext-widget-list').not(thisList[0]);
        var otherButton = $('.btn-select').not(this).children('.ext-widget-button');
        var thisButton = $(this).children('.ext-widget-button');
        if (otherButton.hasClass('up-arrow')) otherButton.removeClass('up-arrow').addClass('down-arrow');
        if (thisButton.hasClass('up-arrow')) {
            thisButton.removeClass('up-arrow').addClass('down-arrow');
        } else {
            thisButton.removeClass('down-arrow').addClass('up-arrow');
        }
        otherList.hide();
        thisList.toggle();
    });
    $('.ext-widget-list').find('li').click(function () {
        var thisSelect = $(this).parent().siblings('.btn-select');
        var thisButton = thisSelect.children('.ext-widget-button');
        var thisInput = thisSelect.children('input');
        if (thisButton.hasClass('up-arrow')) thisButton.removeClass('up-arrow').addClass('down-arrow');
        thisInput.val($(this).text());
        thisInput.attr('select', $(this).prop('class'));

        var selStoreType = storeType.attr('select');
        var selResizeType = resizeType.attr('select');
        if (selStoreType == 'jpeg') {
            $('li.quality').show();
        } else {
            $('li.quality').hide();
            $('li.resize-quality').hide();
            if (selResizeType == 'quality') {
                resizeType.val('');
                resizeType[0].removeAttribute('select');
            }
        }

        if ($(this).hasClass('quality')) {
            $('li.resize').hide();
            $('li.resize-quality').show();
        } else
        if ($(this).hasClass('ratio')) {
            $('li.resize').hide();
            $('li.resize-ratio').show();
        } else
        if ($(this).hasClass('pixel')) {
            $('li.resize').hide();
            $('li.resize-width').show();
            $('li.resize-height').show();
            $('li.resize-origprop').show();
        } else
        if ($(this).hasClass('unselect')) {
            thisInput.val('');
            thisInput[0].removeAttribute('select');
        }
    });

    var inpResizeQuality = $('#resizeQuality');
    var inpResizeRatio = $('#resizeRatio');

    var inpResizeWidth = $('#resizeWidth');
    inpResizeWidth.keyup(function () {
        var value = $(this).val().trim();
        if (_isEmpty_(value)) {
            inpResizeHeight.val('');
        } else {
            var fileWidth = inpFileWidth.val().trim();
            fileWidth = _regExp_.isIntegerNumber(fileWidth) ? parseInt(fileWidth) : '';
            var fileHeight = inpFileHeight.val().trim();
            fileHeight = _regExp_.isIntegerNumber(fileHeight) ? parseInt(fileHeight) : '';
            var keepPrigProp = checkPrigProp.hasClass('active');
            if (keepPrigProp && !_isEmpty_(fileWidth) && !_isEmpty_(fileHeight)) inpResizeHeight.val(value / fileWidth * fileHeight);
        }
    });
    var inpResizeHeight = $('#resizeHeight');
    inpResizeHeight.keyup(function () {
        var value = $(this).val().trim();
        if (_isEmpty_(value)) {
            inpResizeWidth.val('');
        } else {
            var fileWidth = inpFileWidth.val().trim();
            fileWidth = _regExp_.isIntegerNumber(fileWidth) ? parseInt(fileWidth) : '';
            var fileHeight = inpFileHeight.val().trim();
            fileHeight = _regExp_.isIntegerNumber(fileHeight) ? parseInt(fileHeight) : '';
            var keepPrigProp = checkPrigProp.hasClass('active');
            if (keepPrigProp && !_isEmpty_(fileWidth) && !_isEmpty_(fileHeight)) inpResizeWidth.val(value / fileHeight * fileWidth);
        }
    });

    var checkPrigProp = $('.check-prigprop');
    checkPrigProp.click(function () {
        if ($(this).hasClass('active')) $(this).removeClass('active').addClass('hold');
        else $(this).addClass('active');
    });
    checkPrigProp.mouseleave(function () {
        $(this).removeClass('hold');
    });

    var inpFile = $('#inpFile');
    var inpFileName = $('#fileName');
    var inpFileWidth = $('#fileWidth');
    var inpFileHeight = $('#fileHeight');
    inpFile.change(function () {
        var file = this.files[0];
        if (file == null) {
            inpFileName.val('');
            inpFileWidth.val('');
            inpFileHeight.val('');
            return;
        }
        var file_name = file.name;
        inpFileName.val(file_name);
        if (!file.type.match(/image.*/)) {
            inpFileWidth.val('');
            inpFileHeight.val('');
            _tipDialog_.popForm('alert', '提示', '不支持的图片类型: ' + file.type);
            return;
        }

        var reader = new FileReader();
        var inner = $('#extCanvas')[0];
        var outer = $('.extend-view')[0];
        reader.onload = function (e) {
            var src = e.target.result;
            drawPicture(src, inner, outer);
        };
        reader.readAsDataURL(file);
    });

    var thumbnail = $('#thumbnail');
    thumbnail.click(function () {
        var data_url = $(this).prop('src');
        if (_isEmpty_(data_url)) return;
        $(".extend-view").toggle();
    });
    var extend_view = $(".extend-view");
    extend_view.click(function () {
        $(".extend-view").toggle();
    });

    var btnReset = $('#btnReset');
    btnReset.click(function () {
        inpFile.val('');
        inpFileName.val('');
        inpFileWidth.val('');
        inpFileHeight.val('');
        inpUrl.val('');
        thumbnail.removeAttr('src');

        inpDataUrl.val('');
        $('#extCanvas').empty();

        $('#inpMark').val('');
        $('#inpMarkSize').val('');
        $('#inpMarkPosition').val('');
        $('#inpMarkColor').val('');

        storeType.val('');
        resizeType.val('');
        inpResizeQuality.val('');
        inpResizeRatio.val('');
        inpResizeWidth.val('');
        inpResizeHeight.val('');
        checkPrigProp.removeClass('active');
    });

    var inpDataUrl = $('#inpDataUrl');
    var btnDataurl = $('.btn-dataurl');
    btnDataurl.click(function () {
        inpDataUrl.val(thumbnail.prop('src'));
        extendPanel.filter('.ext-data-url').toggle();
    });
    var closeDataUrl = $('#closeDataUrl');
    closeDataUrl.click(function () {
        inpDataUrl.val('');
        extendPanel.filter('.ext-data-url').toggle();
    });
    
    var btnDownload = $('.btn-download');
    btnDownload.click(function () {
        var imgSrc = thumbnail.prop('src');
        var download = $('.zone-download').find('a');
        var loadType = loadTypeSpan.siblings('.active').prop('class').split(/\s+/)[0];
        var tgType = $('#storeType').attr('select');
        var srcName, srcType, fileName;
        if (loadType == 'local') {
            var srcFile = inpFileName.val();
            var srcFileArray = srcFile.split('.');
            srcName = srcFileArray[0];
            srcType = srcFileArray[1];
        } else if (loadType == 'online') {
            var srcUrl = inpUrl.val().trim();
            var srcUrlArray = srcUrl.split(/[.\/]/);
            srcName = srcUrlArray[srcUrlArray.length - 2];
            srcType = srcUrlArray[srcUrlArray.length - 1];
        }

        tgType = (_isEmpty_(tgType)) ? srcType : tgType;
        fileName = srcName + (new Date()).getTime() + '.' + tgType;

        download.prop('href', imgSrc);
        download.prop('download', fileName);
    });
    
    var btnHandle = $('#btnHandle');
    btnHandle.click(function () {
        var loadType = loadTypeSpan.siblings('.active').prop('class').split(/\s+/)[0];
        var inner = $('#extCanvas')[0];
        var outer = $(".extend-view")[0];

        var selStoreType = storeType.attr('select');
        var selResizeType = resizeType.attr('select');
        var resizeQuality = parseFloat(inpResizeQuality.val());
        var resizeRatio = parseFloat(inpResizeRatio.val());
        var resizeWidth = parseInt(inpResizeWidth.val());
        var resizeHeight = parseInt(inpResizeHeight.val());

        var errMsg = '';
        if (selResizeType == 'quality' && !_isEmpty_(resizeQuality) && (!_regExp_.isFloatNumber(resizeQuality) || resizeQuality > 1 || resizeQuality < 0)) errMsg += '参数“质量”错误！有效取值范围：[0-1]。<br>';
        if (selResizeType == 'ratio' && !_isEmpty_(resizeRatio) && (!_regExp_.isFloatNumber(resizeRatio) || resizeRatio > 1000 || resizeRatio < 0)) errMsg += '参数“比例”错误！有效取值范围：[0-1000]。<br>';
        if (selResizeType == 'pixel' && !_isEmpty_(resizeWidth) && (!_regExp_.isIntegerNumber(resizeWidth) || resizeWidth > 9999 || resizeWidth < 0)) errMsg += '参数“宽”错误！有效取值范围：[0-9999]。<br>';
        if (selResizeType == 'pixel' && !_isEmpty_(resizeHeight) && (!_regExp_.isIntegerNumber(resizeHeight) || resizeHeight > 9999 || resizeHeight < 0)) errMsg += '参数“高”错误！有效取值范围：[0-9999]。<br>';
        if (!_isEmpty_(errMsg)) {
            _tipDialog_.popForm('alert', '提示', errMsg);
            return;
        }

        var markSize = inpMarkSize.attr('markSize');
        var markPosition = inpMarkPosition.attr('markPosition');
        var markColor = inpMarkColor.attr('markColor');
        var markText = $('#inpMark').val().trim();

        var option = {};
        if (!_isEmpty_(selStoreType)) option.storeType = selStoreType;
        if (!_isEmpty_(selResizeType)) option.resizeType = selResizeType;
        if (selResizeType == 'quality' && !_isEmpty_(resizeQuality)) option.resizeQuality = resizeQuality;
        if (selResizeType == 'ratio' && !_isEmpty_(resizeRatio)) option.resizeRatio = resizeRatio;
        if (selResizeType == 'pixel' && !_isEmpty_(resizeWidth)) option.resizeWidth = resizeWidth;
        if (selResizeType == 'pixel' && !_isEmpty_(resizeHeight)) option.resizeHeight = resizeHeight;
        if (!_isEmpty_(markSize)) option.markSize = markSize;
        if (!_isEmpty_(markPosition)) option.markPosition = markPosition;
        if (!_isEmpty_(markColor)) option.markColor = markColor;
        if (!_isEmpty_(markText)) option.markText = markText;

        if (loadType == 'local') {
            var file = inpFile[0].files[0];
            if (file == null) {
                _tipDialog_.popForm('alert', '提示', '请先选择文件');
                return;
            }
            if (!file.type.match(/image.*/)) {
                _tipDialog_.popForm('alert', '提示', '不支持的图片类型: ' + file.type);
                return;
            }

            _loadingStart_();
            var reader = new FileReader();
            reader.onload = function (e) {
                var src = e.target.result;
                drawPicture(src, inner, outer, option);
            };
            reader.readAsDataURL(file);
            setTimeout('_loadingEnd_()', 255);
        } else if (loadType == 'online') {
            var imgUrl = inpUrl.val().trim();
            if (_isEmpty_(imgUrl)) {
                _tipDialog_.popForm('alert', '提示', '请先录入网络图片链接地址');
                return;
            }

            _loadingStart_();
            var srcDataUrl = thumbnail.prop('src');
            drawPicture(srcDataUrl, inner, outer, option);
            setTimeout('_loadingEnd_()', 255);
        }
    });
});

function genDataUrl(url, format, callback) {
    var img = new Image(),
        fmt = 'image/png',
        dataurl = '';
    if (format) fmt = format;
    img.setAttribute('crossOrigin', 'Anonymous');
    img.onload = function(){
        var cvs = document.createElement('canvas'),
            width = img.width,
            height = img.height;
        cvs.width = width;
        cvs.height = height;
        cvs.getContext('2d').drawImage(img, 0, 0, width, height);
        dataurl = cvs.toDataURL(format);

        $('#fileWidth').val(width);
        $('#fileHeight').val(height);

        callback ? callback(dataurl) : null;
    };
    /*
    img.onerror = function(){
        var timeStamp = (new Date()).getTime();
        genDataUrl(url + '?' + timeStamp);
    };
    */
    img.src = url;
}

function drawPicture(src, innerCanvas, outerDiv, option) {
    var MAX_HEIGHT = null;
    var MAX_WIDTH = null;
    var image = new Image();
    var srcType = src.split(/[:\/;]/)[2];

    image.onload = function () {
        $('#fileWidth').val(image.width);
        $('#fileHeight').val(image.height);

        var cvs = innerCanvas;
        var div = outerDiv;

        var storeType, resizeType;
        var resizeQuality, resizeRatio, resizeWidth, resizeHeight;
        var markSize, markPosition, markColor, markText;
        if (option) {
            storeType = option.storeType;
            resizeType = option.resizeType;
            resizeQuality = option.resizeQuality;
            resizeRatio = option.resizeRatio;
            resizeWidth = option.resizeWidth;
            resizeHeight = option.resizeHeight;
            markSize = option.markSize;
            markPosition = option.markPosition;
            markColor = option.markColor;
            markText = option.markText;

            if (resizeType == 'ratio' && !_isEmpty_(resizeRatio)) {
                image.width *= resizeRatio;
                image.height *= resizeRatio;
            }

            if (resizeType == 'pixel') {
                if (!_isEmpty_(resizeWidth)) image.width = resizeWidth;
                if (!_isEmpty_(resizeHeight)) image.height = resizeHeight;
            }
        }

        var ctx = cvs.getContext('2d');
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        cvs.width = image.width;
        cvs.height = image.height;
        var divWStr = (cvs.width > window.innerWidth) ? cvs.width : window.innerWidth;
        var divHStr = (cvs.height > window.innerHeight) ? cvs.height : window.innerHeight;
        div.style.width = divWStr + "px";
        div.style.height = divHStr + "px";
        if ($(div).height() > cvs.height) {
            var cvsMgTop = ($(div).height() - cvs.height) / 2;
            $(cvs).css('margin-top', cvsMgTop + 'px');
        } else {
            $(cvs).css('margin-top', 0);
        }

        ctx.drawImage(image, 0, 0, image.width, image.height);

        if (!_isEmpty_(markText)) {
            markSize = _isEmpty_(markSize) ? '12' : markSize;
            markPosition = _isEmpty_(markPosition) ? '15,15' : markPosition;
            markColor = _isEmpty_(markColor) ? 'rgba(255,255,255,0.5)' : markColor;
            var markPositionX = parseInt(markPosition.split(',')[0]);
            var markPositionY = parseInt(markPosition.split(',')[1]);
            ctx.font = markSize + 'px microsoft yahei';
            ctx.fillStyle = markColor;
            ctx.fillText(markText, markPositionX, markPositionY);
        }

        var thumbnail = $('#thumbnail');
        if (_isEmpty_(storeType)) {
            thumbnail.attr('src', cvs.toDataURL('image/' + srcType));
        } else {
            if (resizeType == 'quality' && !_isEmpty_(resizeQuality)) thumbnail.attr('src', cvs.toDataURL('image/' + storeType, resizeQuality));
            else thumbnail.attr('src', cvs.toDataURL('image/' + storeType, 1));
        }

        //thumbnail.attr('src', image.src);
        //var thumbnailCvs = thumbnail[0];
        //var thumbnailCtx = thumbnailCvs.getContext("2d");
        //thumbnailCtx.clearRect(0, 0, thumbnailCvs.width, thumbnailCvs.height);
        //thumbnailCtx.drawImage(image, 0, 0, thumbnailCvs.width, thumbnailCvs.height);
    };
    image.src = src;
}