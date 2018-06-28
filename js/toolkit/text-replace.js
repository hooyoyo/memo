$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var operateTypeSpan = $('.operate-type span');
    operateTypeSpan.click(function () {
        operateTypeSpan.removeClass('active');
        $(this).addClass('active');

        var operateType = operateTypeSpan.siblings('.active').prop('class').split(/\s+/)[0];
        inpFind.val('');
        inpRelace.val('');
        if (operateType == 'replace') {
            inpFind.prop('placeholder', '查找...');
            inpRelace.prop('placeholder', '替换...');
            inpFind.removeProp('disabled');
            inpRelace.removeProp('disabled');
        } else if (operateType == 'split') {
            inpFind.prop('placeholder', '分割字符串...');
            inpRelace.prop('placeholder', '...');
            inpFind.removeProp('disabled');
            inpRelace.prop('disabled', true);
        }else if (operateType == 'merge') {
            inpFind.prop('placeholder', '...');
            inpRelace.prop('placeholder', '并接字符串...');
            inpFind.prop('disabled', true);
            inpRelace.removeProp('disabled');
        } else if (operateType == 'wipe') {
            inpFind.prop('placeholder', '...');
            inpRelace.prop('placeholder', '...');
            inpFind.prop('disabled', true);
            inpRelace.prop('disabled', true);
        }
        extendOption.find('.ignore-case').addClass('active');
        extendOption.find('.delete-blank-line').removeClass('active');
        extendOption.find('.trim-for-row').removeClass('active');
    });

    var cellOptB = $('.cell-option b');
    cellOptB.click(function () {
        if ($(this).hasClass('active')) $(this).removeClass('active').addClass('hold');
        else $(this).addClass('active');
    });
    cellOptB.mouseleave(function () {
        $(this).removeClass('hold');
    });

    var inpFind = $('#inpFind');
    var inpRelace = $('#inpRelace');
    var taTextContent = $('#taTextContent');
    var extendOption = $('.extend-option');

    var btnClear = $('#btnClear');

    var btnHandle = $('#btnHandle');
    btnHandle.click(function () {
        var operateType = operateTypeSpan.siblings('.active').prop('class').split(/\s+/)[0];
        var strFind = inpFind.val();
        var strReplace = inpRelace.val();
        var strTextContent = taTextContent.val();
        var ignoreCase = extendOption.find('.ignore-case').hasClass('active');
        var deleteBlankLine = extendOption.find('.delete-blank-line').hasClass('active');
        var trimForRow = extendOption.find('.trim-for-row').hasClass('active');
        var modifier, strRegExp;
        if (operateType == 'split') {
            if (_isEmpty_(strFind)) return;
            modifier = ignoreCase ? 'ig' : 'g';
            strRegExp = new RegExp(strFind, modifier);
            strTextContent = strTextContent.replace(strRegExp, '\n');
            if (deleteBlankLine) strTextContent = strTextContent.replace(/(\n\s*\n)/g, '\n').replace(/(^\s*\n|\n\s*$)/g, '');
            if (trimForRow) strTextContent = strTextContent.replace(/(\n\s*|\s*\n)/g, '\n').replace(/(^\s*|\s*$)/g, '');
            taTextContent.val(strTextContent);
        } else if (operateType == 'replace') {
            if (_isEmpty_(strFind)) return;
            modifier = ignoreCase ? 'ig' : 'g';
            strRegExp = new RegExp(strFind, modifier);
            strTextContent = strTextContent.replace(strRegExp, strReplace);
            taTextContent.val(strTextContent);
        } else if (operateType == 'merge') {
            if (_isEmpty_(strReplace)) return;
            modifier = ignoreCase ? 'ig' : 'g';
            strRegExp = new RegExp('\n', modifier);
            if (deleteBlankLine) strTextContent = strTextContent.replace(/(\n\s*\n)/g, '\n').replace(/(^\s*\n|\n\s*$)/g, '');
            if (trimForRow) strTextContent = strTextContent.replace(/(\n\s*|\s*\n)/g, '\n').replace(/(^\s*|\s*$)/g, '');
            strTextContent = strTextContent.replace(strRegExp, strReplace);
            taTextContent.val(strTextContent);
        } else if (operateType == 'wipe') {
            if (deleteBlankLine) strTextContent = strTextContent.replace(/(\n\s*\n)/g, '\n').replace(/(^\s*\n|\n\s*$)/g, '');
            if (trimForRow) strTextContent = strTextContent.replace(/(\n\s*|\s*\n)/g, '\n').replace(/(^\s*|\s*$)/g, '');
            taTextContent.val(strTextContent);
        }
    });
});