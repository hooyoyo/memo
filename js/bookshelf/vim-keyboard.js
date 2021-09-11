$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var img = $('.zone-form img');
    img.click(function () {
        var src = $(this).prop('src');
        var inner = $('#extCanvas')[0];
        var outer = $('.extend-view')[0];
        drawPicture(src, inner, outer);

        $('.extend-view').toggle();
    });
    var extend_view = $('.extend-view');
    extend_view.click(function () {
        $('.extend-view').toggle();
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