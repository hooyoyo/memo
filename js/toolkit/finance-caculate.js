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
        if (maturity == 0) {
            $('#totalPrincipal').text('');
            $('#totalInterest').text('');
            $('#totalSum').text('');
            $('#totalYieldRate').text('');
            return;
        }
        var maturityType = $('#maturityType').attr('select');
        maturityType = maturityType ? maturityType : 'year';

        var stageDepositMultiplicator, depositTimes;
        if (stageDepositType == maturityType) {
            depositTimes = 1;
        } else if (stageDepositType == 'day' && maturityType == 'week') {
            depositTimes = 7;
        } else if (stageDepositType == 'day' && maturityType == 'month') {
            depositTimes = 30.5;
        } else if (stageDepositType == 'day' && maturityType == 'quarter') {
            depositTimes = 91.25;
        } else if (stageDepositType == 'day' && maturityType == 'year') {
            depositTimes = 365;
        } else if (stageDepositType == 'week' && maturityType == 'day') {
            depositTimes = 1 / 7;
        } else if (stageDepositType == 'week' && maturityType == 'month') {
            depositTimes = 4.33;
        } else if (stageDepositType == 'week' && maturityType == 'quarter') {
            depositTimes = 13;
        } else if (stageDepositType == 'week' && maturityType == 'year') {
            depositTimes = 52;
        } else if (stageDepositType == 'month' && maturityType == 'day') {
            depositTimes = 1 / 30.5;
        } else if (stageDepositType == 'month' && maturityType == 'week') {
            depositTimes = 1 / 4.33;
        } else if (stageDepositType == 'month' && maturityType == 'quarter') {
            depositTimes = 3;
        } else if (stageDepositType == 'month' && maturityType == 'year') {
            depositTimes = 12;
        } else if (stageDepositType == 'quarter' && maturityType == 'day') {
            depositTimes = 1 / 91.25;
        } else if (stageDepositType == 'quarter' && maturityType == 'week') {
            depositTimes = 1 / 13;
        } else if (stageDepositType == 'quarter' && maturityType == 'month') {
            depositTimes = 1 / 3;
        } else if (stageDepositType == 'quarter' && maturityType == 'year') {
            depositTimes = 4;
        } else if (stageDepositType == 'year' && maturityType == 'day') {
            depositTimes = 1 / 365;
        } else if (stageDepositType == 'year' && maturityType == 'week') {
            depositTimes = 1 / 52;
        } else if (stageDepositType == 'year' && maturityType == 'month') {
            depositTimes = 1 / 12;
        } else if (stageDepositType == 'year' && maturityType == 'quarter') {
            depositTimes = 1 / 4;
        }
        stageDepositMultiplicator = maturity * depositTimes;
        var stageDepositMultiplicatorInt = parseInt(stageDepositMultiplicator), stageDepositMultiplicatorDec = stageDepositMultiplicator - stageDepositMultiplicatorInt;
        if (stageDepositMultiplicatorDec > 0.99) { stageDepositMultiplicatorInt += 1; stageDepositMultiplicatorDec = 0; }

        var interestRatePower, interestPowers;
        if (interestRateType == maturityType) {
            interestPowers = 1;
        } else if (interestRateType == 'day' && maturityType == 'week') {
            interestPowers = 7;
        } else if (interestRateType == 'day' && maturityType == 'month') {
            interestPowers = 30.5;
        } else if (interestRateType == 'day' && maturityType == 'quarter') {
            interestPowers = 91.25;
        } else if (interestRateType == 'day' && maturityType == 'year') {
            interestPowers = 365;
        } else if (interestRateType == 'week' && maturityType == 'day') {
            interestPowers = 1 / 7;
        } else if (interestRateType == 'week' && maturityType == 'month') {
            interestPowers = 4.33;
        } else if (interestRateType == 'week' && maturityType == 'quarter') {
            interestPowers = 13;
        } else if (interestRateType == 'week' && maturityType == 'year') {
            interestPowers = 52;
        } else if (interestRateType == 'month' && maturityType == 'day') {
            interestPowers = 1 / 30.5;
        } else if (interestRateType == 'month' && maturityType == 'week') {
            interestPowers = 1 / 4.33;
        } else if (interestRateType == 'month' && maturityType == 'quarter') {
            interestPowers = 3;
        } else if (interestRateType == 'month' && maturityType == 'year') {
            interestPowers = 12;
        } else if (interestRateType == 'quarter' && maturityType == 'day') {
            interestPowers = 1 / 91.25;
        } else if (interestRateType == 'quarter' && maturityType == 'week') {
            interestPowers = 1 / 13;
        } else if (interestRateType == 'quarter' && maturityType == 'month') {
            interestPowers = 1 / 3;
        } else if (interestRateType == 'quarter' && maturityType == 'year') {
            interestPowers = 4;
        } else if (interestRateType == 'year' && maturityType == 'day') {
            interestPowers = 1 / 365;
        } else if (interestRateType == 'year' && maturityType == 'week') {
            interestPowers = 1 / 52;
        } else if (interestRateType == 'year' && maturityType == 'month') {
            interestPowers = 1 / 12;
        } else if (interestRateType == 'year' && maturityType == 'quarter') {
            interestPowers = 1 / 4;
        }
        interestRatePower = maturity * interestPowers;
        var interestRatePowerInt = parseInt(interestRatePower), interestRatePowerDec = interestRatePower - interestRatePowerInt;

        var rateStage;
        if (stageDepositType == interestRateType) {
            rateStage = 1;
        } else if (interestRateType == 'week' && stageDepositType == 'day') {
            rateStage = 7;
        } else if (interestRateType == 'month' && stageDepositType == 'day') {
            rateStage = 30.5;
        } else if (interestRateType == 'quarter' && stageDepositType == 'day') {
            rateStage = 91.25;
        } else if (interestRateType == 'year' && stageDepositType == 'day') {
            rateStage = 365;
        } else if (interestRateType == 'day' && stageDepositType == 'week') {
            rateStage = 1 / 7;
        } else if (interestRateType == 'month' && stageDepositType == 'week') {
            rateStage = 4.33;
        } else if (interestRateType == 'quarter' && stageDepositType == 'week') {
            rateStage = 13;
        } else if (interestRateType == 'year' && stageDepositType == 'week') {
            rateStage = 52;
        } else if (interestRateType == 'day' && stageDepositType == 'month') {
            rateStage = 1 / 30.5;
        } else if (interestRateType == 'week' && stageDepositType == 'month') {
            rateStage = 1 / 4.33;
        } else if (interestRateType == 'quarter' && stageDepositType == 'month') {
            rateStage = 3;
        } else if (interestRateType == 'year' && stageDepositType == 'month') {
            rateStage = 12;
        } else if (interestRateType == 'day' && stageDepositType == 'quarter') {
            rateStage = 1 / 91.25;
        } else if (interestRateType == 'week' && stageDepositType == 'quarter') {
            rateStage = 1 / 13;
        } else if (interestRateType == 'month' && stageDepositType == 'quarter') {
            rateStage = 1 / 3;
        } else if (interestRateType == 'year' && stageDepositType == 'quarter') {
            rateStage = 4;
        } else if (interestRateType == 'day' && stageDepositType == 'year') {
            rateStage = 1 / 365;
        } else if (interestRateType == 'week' && stageDepositType == 'year') {
            rateStage = 1 / 52;
        } else if (interestRateType == 'month' && stageDepositType == 'year') {
            rateStage = 1 / 12;
        } else if (interestRateType == 'quarter' && stageDepositType == 'year') {
            rateStage = 1 / 4;
        }

        var totalPrincipal = 0, totalInterest = 0, totalSum = 0, totalYieldRate = 0;
        //totalSum = principal * Math.pow((1 + x), n);
        totalPrincipal = principal + stageDeposit * ((stageDepositMultiplicatorInt > 1) ? (stageDepositMultiplicatorInt - 1) : 0);

        if (interestRatePower < 1) {
            $('#totalPrincipal').text(totalPrincipal);
            $('#totalInterest').text('0');
            $('#totalSum').text(totalPrincipal);
            $('#totalYieldRate').text(0);
            return;
        }

        if (rateStage == 1) {
            for (var i = 0; i < interestRatePowerInt; i++) {
                if (i == 0) {
                    totalSum = principal;
                } else {
                    totalSum += stageDeposit;
                }
                totalSum *= (1 + interestRate);
            }
        } else if (rateStage > 1) {
            for (var i = 0; i < interestRatePowerInt; i++) {
                if (i == 0) {
                    totalSum += principal + stageDeposit * ((rateStage > 1) ? (rateStage - 1) : 0);
                } else {
                    totalSum += stageDeposit * rateStage;
                }
                totalSum *= (1 + interestRate);
            }
            var times = interestRatePowerDec / interestPowers * depositTimes;
            totalSum += stageDeposit * times;
        } else if (rateStage < 1) {
            if (stageDepositMultiplicatorInt == 0) {
                totalSum += principal * Math.pow((1 + interestRate), interestRatePowerInt);
            } else {
                var powers;
                if (interestPowers >= 1) {
                    powers = (depositTimes < 1) ? interestPowers * Math.round(1 / depositTimes) : interestPowers / depositTimes;
                } else {
                    powers = Math.round(1 / rateStage);
                }
                for (var i = 0; i < stageDepositMultiplicatorInt; i++) {
                    if (i == 0) {
                        totalSum = principal * Math.pow((1 + interestRate), powers);
                    } else {
                        totalSum += stageDeposit;
                        totalSum *= Math.pow((1 + interestRate), powers);
                    }
                }
            }
        }

        totalInterest = totalSum - totalPrincipal;

        totalYieldRate = ((totalInterest / totalPrincipal) * 100);

        $('#totalPrincipal').text(totalPrincipal.toFixed(2));
        $('#totalInterest').text(totalInterest.toFixed(2));
        $('#totalSum').text(totalSum.toFixed(2));
        $('#totalYieldRate').text(totalYieldRate.toFixed(2) + '%');
    });
});