$(function() {
    _dropoffUrlParam_();
    $('body').show();

    var baseTypeSpan = $('.func-type span');
    baseTypeSpan.click(function () {
        baseTypeSpan.removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('uri')) $('#codec').addClass('active');
        else $('#codec').removeClass('active');
        if ($(this).hasClass('ades')) $('#crypt').addClass('active');
        else $('#crypt').removeClass('active');
        if ($(this).hasClass('md5') || $(this).hasClass('sha')) {
            $('#case').addClass('active');
            $('#spDedo').addClass('disable');
        } else {
            $('#case').removeClass('active');
            $('#spDedo').removeClass('disable');
        }
    });

    var checkSpChar = $('.check-sp-char');
    checkSpChar.click(function () {
        if ($(this).hasClass('active')) $(this).removeClass('active').addClass('hold');
        else $(this).addClass('active');
    });
    checkSpChar.mouseleave(function () {
        $(this).removeClass('hold');
    });

    var caseUpperLowerB = $('.case-upper-lower b');
    caseUpperLowerB.click(function () {
        caseUpperLowerB.removeClass('active');
        $(this).addClass('active');
    });

    $('.main-shell').click(function () {
        $('#crypt').children('ul').hide();
    });
    $('#mode').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).next().toggle();
    });
    $('#crypt').find('li').click(function () {
        $('#mode').text($(this).text());
    });

    var spEndo = $('#spEndo');
    spEndo.click(function () {
        var taResult = $('#taResult');
        var taSrcVal = $('#taSource').val();

        var funcType = $('.func-type .active').prop('class').split(/\s+/)[0];
        var result = '';
        if (funcType == 'uri') {
            var keepSpChar = checkSpChar.hasClass('active');
            if (keepSpChar) result = encodeURI(taSrcVal);
            else result = encodeURIComponent(taSrcVal);
        } else if (funcType == 'base64') {
            result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(taSrcVal));
        } else if (funcType == 'md5') {
            result = CryptoJS.MD5(taSrcVal).toString();
            if ($('.upper').hasClass('active')) result = result.toUpperCase();
        } else if (funcType == 'sha') {
            var sha1 = CryptoJS.SHA1(taSrcVal).toString();
            var sha224 = CryptoJS.SHA224(taSrcVal).toString();
            var sha256 = CryptoJS.SHA256(taSrcVal).toString();
            var sha384 = CryptoJS.SHA384(taSrcVal).toString();
            var sha512 = CryptoJS.SHA512(taSrcVal).toString();
            if ($('.upper').hasClass('active')) {
                sha1 = sha1.toUpperCase();
                sha224 = sha224.toUpperCase();
                sha256 = sha256.toUpperCase();
                sha384 = sha384.toUpperCase();
                sha512 = sha512.toUpperCase();
            }
            result = 'SHA1:\n' + sha1 + '\n' + 'SHA224:\n' + sha224 + '\n' + 'SHA256:\n' + sha256 + '\n' + 'SHA384:\n' + sha384 + '\n' + 'SHA512:\n' + sha512;
        } else if (funcType == 'ades') {
            var mode = $('#mode').text();
            if (mode == '选择...') return;
            var key = $('#key').val();
            switch (mode) {
                case 'AES':
                    result = CryptoJS.AES.encrypt(taSrcVal, key).toString();
                    break;
                case 'DES':
                    result = CryptoJS.DES.encrypt(taSrcVal, key).toString();
                    break;
                case 'RC4':
                    result = CryptoJS.RC4.encrypt(taSrcVal, key).toString();
                    break;
                case 'Rabbit':
                    result = CryptoJS.Rabbit.encrypt(taSrcVal, key).toString();
                    break;
                case 'TripleDES':
                    result = CryptoJS.TripleDES.encrypt(taSrcVal, key).toString();
                    break;
            }
        }

        taResult.val(result);
    });

    var spDedo = $('#spDedo');
    spDedo.click(function () {
        if ($(this).hasClass('disable')) return;

        var taResult = $('#taResult');
        var taSrcVal = $('#taSource').val();

        var funcType = $('.func-type .active').prop('class').split(/\s+/)[0];
        var result = '';
        if (funcType == 'uri') {
            var keepSpChar = checkSpChar.hasClass('active');
            if (keepSpChar) result = decodeURI(taSrcVal);
            else result = decodeURIComponent(taSrcVal);
        } else if (funcType == 'base64') {
            result = CryptoJS.enc.Base64.parse(taSrcVal).toString(CryptoJS.enc.Utf8);
        } else if (funcType == 'md5') {
            return;
        } else if (funcType == 'sha') {
            return;
        } else if (funcType == 'ades') {
            var mode = $('#mode').text();
            if (mode == '选择...') return;
            var key = $('#key').val();
            switch (mode) {
                case 'AES':
                    result = CryptoJS.AES.decrypt(taSrcVal, key).toString(CryptoJS.enc.Utf8);
                    break;
                case 'DES':
                    result = CryptoJS.DES.decrypt(taSrcVal, key).toString(CryptoJS.enc.Utf8);
                    break;
                case 'RC4':
                    result = CryptoJS.RC4.decrypt(taSrcVal, key).toString(CryptoJS.enc.Utf8);
                    break;
                case 'Rabbit':
                    result = CryptoJS.Rabbit.decrypt(taSrcVal, key).toString(CryptoJS.enc.Utf8);
                    break;
                case 'TripleDES':
                    result = CryptoJS.TripleDES.decrypt(taSrcVal, key).toString(CryptoJS.enc.Utf8);
                    break;
            }
        }

        taResult.val(result);
    });
});
