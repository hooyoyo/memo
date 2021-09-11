$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var selOptIn = $('.select-option.time-second .cell-option.in');
    var selOptOut = $('.select-option.time-second .cell-option.out');

    var selOptB = $('.select-option b');
    selOptB.click(function () {
        $(this).siblings('b').removeClass('active');
        $(this).addClass('active');
        var selType = $(this).prop('class').split(/\s+/)[0];
        var thisTimeType = $(this).parents('.select-option').children('.time-type');
        if (selType == 'time') thisTimeType.show();
        else thisTimeType.hide();
    });

    var selOpt = {
        '①' : 'yyyy-MM-dd HH:mm:ss',
        '②' : 'yyyy-MM-dd HH:mm:ss.SSS',
        '③' : 'yyyy/MM/dd HH:mm:ss',
        '④' : 'yyyy/MM/dd HH:mm:ss.SSS',
        '⑤' : 'yyyyMMddHHmmssSSS',
        '⑥' : 'yyyy年MM月dd日 HH时mm分ss秒'
    };

    $('.main-shell').click(function () {
        $('.ext-widget-list').hide();
        $('.ext-widget-button.toggle-arrow').removeClass('up-arrow').addClass('down-arrow');
    });
    var btnSelectList = $('.btn-select-list');
    var btnSelect = $('.btn-select');
    var extWidgetList = $('.ext-widget-list');
    btnSelect.click(function (e) {
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
    extWidgetList.find('li').click(function () {
        var thisSelect = $(this).parent().siblings('.btn-select');
        var thisButton = thisSelect.children('.ext-widget-button');
        var thisInput = thisSelect.children('input');
        if (thisButton.hasClass('up-arrow')) thisButton.removeClass('up-arrow').addClass('down-arrow');
        thisInput.val($(this).prop('class'));
        thisInput.attr('select', $(this).prop('class'));
    });

    var taSource = $('#taSource');
    var taResult = $('#taResult');

    var btnClear = $('#btnClear');
    btnClear.click(function () {
        taSource.val('');
        taResult.val('');
    });

    var btnExchange = $('#btnExchange');
    btnExchange.click(function () {
        var selOptInType = selOptIn.children('.active').prop('class').split(/\s+/)[0];
        var selOptOutType = selOptOut.children('.active').prop('class').split(/\s+/)[0];
        var formatIn = selOpt[$('#timeFormatIn').val()];
        var formatOut = selOpt[$('#timeFormatOut').val()];
        var taSrcVal = taSource.val();
        var taRstVal;

        if (selOptInType == 'second') {
            taSrcVal = parseInt(taSrcVal);
        } else if (selOptInType == 'time') {
            if (formatIn == 'yyyy-MM-dd HH:mm:ss' || 'yyyy-MM-dd HH:mm:ss.SSS' || 'yyyy/MM/dd HH:mm:ss' || 'yyyy/MM/dd HH:mm:ss.SSS') {
                taSrcVal = new Date(taSrcVal).getTime();
            } else if (formatIn == 'yyyyMMddHHmmssSSS') {
                var stryyyy = taSrcVal.slice(0,4);
                var strMM = taSrcVal.slice(4,6);
                var strdd = taSrcVal.slice(6,8);
                var strHH = taSrcVal.slice(8,10);
                var strmm = taSrcVal.slice(10,12);
                var strss = taSrcVal.slice(12,14);
                var strSSS = taSrcVal.slice(14,17);
                var standardFormart = stryyyy + '-' + strMM + '-' + strdd + ' ' + strHH + ':' + strmm + ':' + strss + '.' + strSSS;
                taSrcVal = new Date(standardFormart).getTime();
            } else if (formatIn == 'yyyy年MM月dd日 HH时mm分ss秒') {
                var stryyyy = taSrcVal.slice(0,4);
                var strMM = taSrcVal.slice(5,7);
                var strdd = taSrcVal.slice(8,10);
                var strHH = taSrcVal.slice(12,14);
                var strmm = taSrcVal.slice(15,17);
                var strss = taSrcVal.slice(18,20);
                var standardFormart = stryyyy + '-' + strMM + '-' + strdd + ' ' + strHH + ':' + strmm + ':' + strss;
                taSrcVal = new Date(standardFormart).getTime();
            } else {
                taSrcVal = new Date(taSrcVal).getTime();
            }
        }

        if (selOptOutType == 'second') {
            taRstVal = taSrcVal;
        } else if (selOptOutType == 'time') {
            if (_isEmpty_(formatOut)) formatOut = 'yyyy-MM-dd HH:mm:ss';
            taRstVal = new Date(taSrcVal).pattern(formatOut);
        }

        taResult.val(taRstVal);
    });
});