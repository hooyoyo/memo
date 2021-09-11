$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var editTypeSpan = $('.edit-type span');
    editTypeSpan.click(function () {
        editTypeSpan.removeClass('active');
        $(this).addClass('active');

        $('.edit-panel').addClass('hidden');
        var type =  $(this).prop('class').split(/\s+/)[0];
        var activeID = '#' + type;
        $(activeID).removeClass('hidden');
    });
});