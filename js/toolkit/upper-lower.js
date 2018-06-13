$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var textTypeSpan = $('.text-type span');
    textTypeSpan.click(function () {
        textTypeSpan.removeClass('active');
        $(this).addClass('active');
    });

    var shiftTypeB = $('.shift-type b');
    shiftTypeB.click(function () {
        shiftTypeB.removeClass('active');
        $(this).addClass('active');
    });

    var btnShift = $('#btnShift');
    btnShift.click(function () {
        var textType = textTypeSpan.siblings('.active').prop('class').split(/\s+/)[0];
        var shiftType = shiftTypeB.siblings('.active').prop('class').split(/\s+/)[0];
        var taSource = $('#taSource');
        var taResult = $('#taResult');
        var taSrcVal = $('#taSource').val();
        var taRstVal;

        if (textType == 'char') {
            taRstVal = (shiftType == 'upper') ? taSrcVal.toUpperCase() : taSrcVal.toLowerCase();
        } else
        if (textType == 'sql') {

        } else
        if (textType == 'num') {

        }

        taResult.val(taRstVal);
    });
});