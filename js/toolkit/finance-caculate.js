$(function() {
    /*if (!_isWeChat_()) {
        _toErrorPage_('请在微信内置浏览器中访问', '/memo/error'); // 静态'./template/memo/error.html'
        return;
    }*/
    _dropoffUrlParam_();
    $('body').show();

    var certidTypeSpan = $('.certid-type span');
    certidTypeSpan.click(function () {
        certidTypeSpan.removeClass('active');
        $(this).addClass('active');
    });

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
    });

    var btnClear = $('#btnClear');
    btnClear.click(function () {
    });

    var btnCaculate = $('#btnCaculate');
    btnCaculate.click(function () {
        var principal = Number($('#principal').val().trim());
        var stageDeposit = Number($('#stageDeposit').val().trim());
        var stageDepositType = $('#stageDepositType').attr('select');
        stageDepositType = stageDepositType ? stageDepositType : 'year';
        var interestRate = Number($('#interestRate').val().trim()) / 100;
        var interestRateType = $('#interestRateType').attr('select');
        interestRateType = interestRateType ? interestRateType : 'year';
        var maturity = Number($('#maturity').val().trim());
        var maturityType = $('#maturityType').attr('select');
        maturityType = maturityType ? maturityType : 'year';

        var stageDepositMultiplicator;
        if (stageDepositType == maturityType) {
            stageDepositMultiplicator = maturity;
        } else if (stageDepositType == 'day' && maturityType == 'week') {
            stageDepositMultiplicator = maturity * 7;
        } else if (stageDepositType == 'day' && maturityType == 'month') {
            stageDepositMultiplicator = maturity * 30.5;
        } else if (stageDepositType == 'day' && maturityType == 'quarter') {
            stageDepositMultiplicator = maturity * 30.5 * 3;
        } else if (stageDepositType == 'day' && maturityType == 'year') {
            stageDepositMultiplicator = maturity * 365;
        } else if (stageDepositType == 'week' && maturityType == 'day') {
            stageDepositMultiplicator = maturity / 7;
        } else if (stageDepositType == 'week' && maturityType == 'month') {
            stageDepositMultiplicator = maturity * 4.33;
        } else if (stageDepositType == 'week' && maturityType == 'quarter') {
            stageDepositMultiplicator = maturity * 4.33 * 3;
        } else if (stageDepositType == 'week' && maturityType == 'year') {
            stageDepositMultiplicator = maturity * 52;
        } else if (stageDepositType == 'month' && maturityType == 'day') {
            stageDepositMultiplicator = maturity / 30.5;
        } else if (stageDepositType == 'month' && maturityType == 'week') {
            stageDepositMultiplicator = maturity / 4.33;
        } else if (stageDepositType == 'month' && maturityType == 'quarter') {
            stageDepositMultiplicator = maturity * 3;
        } else if (stageDepositType == 'month' && maturityType == 'year') {
            stageDepositMultiplicator = maturity * 12;
        } else if (stageDepositType == 'quarter' && maturityType == 'day') {
            stageDepositMultiplicator = maturity / 30.5 / 3;
        } else if (stageDepositType == 'quarter' && maturityType == 'week') {
            stageDepositMultiplicator = maturity / 4.33 / 3;
        } else if (stageDepositType == 'quarter' && maturityType == 'month') {
            stageDepositMultiplicator = maturity / 3;
        } else if (stageDepositType == 'quarter' && maturityType == 'year') {
            stageDepositMultiplicator = maturity * 4;
        } else if (stageDepositType == 'year' && maturityType == 'day') {
            stageDepositMultiplicator = maturity / 365;
        } else if (stageDepositType == 'year' && maturityType == 'week') {
            stageDepositMultiplicator = maturity / 52;
        } else if (stageDepositType == 'year' && maturityType == 'month') {
            stageDepositMultiplicator = maturity / 12;
        } else if (stageDepositType == 'year' && maturityType == 'quarter') {
            stageDepositMultiplicator = maturity / 4;
        }
        var stageDepositMultiplicatorInt = parseInt(stageDepositMultiplicator), stageDepositMultiplicatorDec = stageDepositMultiplicator - stageDepositMultiplicatorInt;

        var interestRatePower;
        if (interestRateType == maturityType) {
            interestRatePower = maturity;
        } else if (interestRateType == 'day' && maturityType == 'week') {
            interestRatePower = maturity * 7;
        } else if (interestRateType == 'day' && maturityType == 'month') {
            interestRatePower = maturity * 30.5;
        } else if (interestRateType == 'day' && maturityType == 'quarter') {
            interestRatePower = maturity * 30.5 * 3;
        } else if (interestRateType == 'day' && maturityType == 'year') {
            interestRatePower = maturity * 365;
        } else if (interestRateType == 'week' && maturityType == 'day') {
            interestRatePower = maturity / 7;
        } else if (interestRateType == 'week' && maturityType == 'month') {
            interestRatePower = maturity * 4.33;
        } else if (interestRateType == 'week' && maturityType == 'quarter') {
            interestRatePower = maturity * 4.33 * 3;
        } else if (interestRateType == 'week' && maturityType == 'year') {
            interestRatePower = maturity * 52;
        } else if (interestRateType == 'month' && maturityType == 'day') {
            interestRatePower = maturity / 30.5;
        } else if (interestRateType == 'month' && maturityType == 'week') {
            interestRatePower = maturity / 4.33;
        } else if (interestRateType == 'month' && maturityType == 'quarter') {
            interestRatePower = maturity * 3;
        } else if (interestRateType == 'month' && maturityType == 'year') {
            interestRatePower = maturity * 12;
        } else if (interestRateType == 'quarter' && maturityType == 'day') {
            interestRatePower = maturity / 30.5 / 3;
        } else if (interestRateType == 'quarter' && maturityType == 'week') {
            interestRatePower = maturity / 4.33 / 3;
        } else if (interestRateType == 'quarter' && maturityType == 'month') {
            interestRatePower = maturity / 3;
        } else if (interestRateType == 'quarter' && maturityType == 'year') {
            interestRatePower = maturity * 4;
        } else if (interestRateType == 'year' && maturityType == 'day') {
            interestRatePower = maturity / 365;
        } else if (interestRateType == 'year' && maturityType == 'week') {
            interestRatePower = maturity / 52;
        } else if (interestRateType == 'year' && maturityType == 'month') {
            interestRatePower = maturity / 12;
        } else if (interestRateType == 'year' && maturityType == 'quarter') {
            interestRatePower = maturity / 4;
        }
        var interestRatePowerInt = parseInt(interestRatePower), interestRatePowerDec = interestRatePower - interestRatePowerInt;

        var interestStage;
        if (stageDepositType == interestRateType) {
            interestStage = 1;
        } else if (stageDepositType == 'day' && interestRateType == 'week') {
            interestStage = 7;
        } else if (stageDepositType == 'day' && interestRateType == 'month') {
            interestStage = 30.5;
        } else if (stageDepositType == 'day' && interestRateType == 'quarter') {
            interestStage = 30.5 * 3;
        } else if (stageDepositType == 'day' && interestRateType == 'year') {
            interestStage = 365;
        } else if (stageDepositType == 'week' && interestRateType == 'day') {
            interestStage = 1 / 7;
        } else if (stageDepositType == 'week' && interestRateType == 'month') {
            interestStage = 4.33;
        } else if (stageDepositType == 'week' && interestRateType == 'quarter') {
            interestStage = 4.33 * 3;
        } else if (stageDepositType == 'week' && interestRateType == 'year') {
            interestStage = 52;
        } else if (stageDepositType == 'month' && interestRateType == 'day') {
            interestStage = 1 / 30.5;
        } else if (stageDepositType == 'month' && interestRateType == 'week') {
            interestStage = 1 / 4.33;
        } else if (stageDepositType == 'month' && interestRateType == 'quarter') {
            interestStage = 3;
        } else if (stageDepositType == 'month' && interestRateType == 'year') {
            interestStage = 12;
        } else if (stageDepositType == 'quarter' && interestRateType == 'day') {
            interestStage = 1 / 30.5 / 3;
        } else if (stageDepositType == 'quarter' && interestRateType == 'week') {
            interestStage = 1 / 4.33 / 3;
        } else if (stageDepositType == 'quarter' && interestRateType == 'month') {
            interestStage = 1 / 3;
        } else if (stageDepositType == 'quarter' && interestRateType == 'year') {
            interestStage = 4;
        } else if (stageDepositType == 'year' && interestRateType == 'day') {
            interestStage = 1 / 365;
        } else if (stageDepositType == 'year' && interestRateType == 'week') {
            interestStage = 1 / 52;
        } else if (stageDepositType == 'year' && interestRateType == 'month') {
            interestStage = 1 / 12;
        } else if (stageDepositType == 'year' && interestRateType == 'quarter') {
            interestStage = 1 / 4;
        }

        var totalPrincipal = 0, totalInterest = 0, totalSum = 0, totalYieldRate = 0;
        //totalSum = principal * Math.pow((1 + x), n);
        totalPrincipal = principal + stageDeposit * ((stageDepositMultiplicator > 1) ? (stageDepositMultiplicator - 1) : 0);

        if (interestStage >= 1) {
            for (var i = 0; i < interestRatePowerInt; i++) {
                i == 0 ? totalSum = principal : totalSum += stageDeposit * interestStage;
                totalSum *= (1 + interestRate);
            }
            totalSum += stageDeposit * interestStage * interestRatePowerDec;
            totalSum *= (1 + interestRate * interestRatePowerDec);
        } else if (interestStage < 1) {
            for (var i = 0; i < stageDepositMultiplicatorInt; i++) {
                i == 0 ? totalSum = principal * Math.pow((1 + interestRate), interestStage) : totalSum *= Math.pow((1 + interestRate), interestStage);
                totalSum += stageDeposit;
            }
            totalSum *= Math.pow((1 + interestRate), interestStage * stageDepositMultiplicatorDec);
            totalSum += stageDeposit * interestStage * stageDepositMultiplicatorDec;
        }

        totalInterest = totalSum - totalPrincipal;

        totalYieldRate = totalInterest / totalPrincipal;

        $('#totalPrincipal').text(totalPrincipal);
        $('#totalInterest').text(totalInterest);
        $('#totalSum').text(totalSum);
        $('#totalYieldRate').text(totalYieldRate);
    });
});