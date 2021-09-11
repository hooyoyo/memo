$(function () {
    _dropoffUrlParam_();
    $('body').show();

    var taData = $('#taData');

    var dataTypeSpan = $('.data-type span');
    dataTypeSpan.click(function () {
        dataTypeSpan.removeClass('active');
        $(this).addClass('active');

        var inpType =  $(this).prop('class').split(/\s+/)[0];
        var convType =  $(this).siblings().first().prop('class').split(/\s+/)[0];
        var buttonText = '转' + convType.toUpperCase();
        btnConvert.removeClass(inpType).addClass(convType);
        btnConvert.text(buttonText);
    });

    var btnFormat = $('#btnFormat');
    btnFormat.click(function () {
        var inpType = $('.data-type .cell-option .active').first().prop('class').split(/\s+/)[0];
        var input = taData.val().trim();
        switch (inpType) {
            case 'xml':
                if (validateXML(input)) input = formatXML(input);
                break;
            case 'json':
                if (validateJSON(input)) input = formatJSON(input);
                break;
        }
        taData.val(input);
    });

    var btnConvert = $('#btnConvert');
    btnConvert.click(function () {
        var inpType = $('.data-type .cell-option .active').first().prop('class').split(/\s+/)[0];
        var input = taData.val().trim();
        var x2js = new X2JS();
        switch (inpType) {
            case 'xml':
                if (validateXML(input)) {
                    var jsonObj = x2js.xml_str2json(input);
                    input = formatJSON(jsonObj);
                    dataTypeSpan.siblings('.json').click();
                }
                break;
            case 'json':
                if (validateJSON(input)) {
                    var xmlStr = x2js.json2xml_str(JSON.parse(input));
                    input = formatXML(xmlStr);
                    dataTypeSpan.siblings('.xml').click();
                }
                break;
        }
        taData.val(input);
    });

    var btnClear = $('#btnClear');
});

function formatJSON(json, options) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineSubObj = (options.newlineSubObj === true) ? true : false;
    options.spaceSeparator = (options.spaceSeparator === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineSubObj) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceSeparator) {
        reg = /\:/g;
        json = json.replace(reg, ': ');
    }
    json = json.split('\r\n');
    json.forEach(function (node, index) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });
    formatted = formatted.trim();
    return formatted;
}


String.prototype.removeLineEnd = function () {
    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2')
};
function getPrefix(prefixIndex) {
    var span = '    ';
    var output = [];
    for (var i = 0; i < prefixIndex; ++i) {
        output.push(span);
    }

    return output.join('');
}
function formatXML(text) {
    text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
            return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
        }).replace(/>\s*?</g, ">\n<");

    text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, function ($0, text) {
        var ret = '<!--' + escape(text) + '-->';
        return ret;
    }).replace(/\r/g, '\n');

    var rgx = /\n(<(([^\?]).*?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
    var nodeStack = [];
    var output = text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
        var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
        //alert([all,isClosed].join('='));
        var prefix = '';
        if (isBegin == '!') {
            prefix = getPrefix(nodeStack.length);
        }
        else {
            if (isBegin != '/') {
                prefix = getPrefix(nodeStack.length);
                if (!isClosed) {
                    nodeStack.push(name);
                }
            }
            else {
                nodeStack.pop();
                prefix = getPrefix(nodeStack.length);
            }

        }
        var ret = '\n' + prefix + all;
        return ret;
    });

    var prefixSpace = -1;
    var outputText = output.substring(1);

    outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
        //alert(['[',prefix,']=',prefix.length].join(''));
        if (prefix.charAt(0) == '\r')
            prefix = prefix.substring(1);
        text = unescape(text).replace(/\r/g, '\n');
        var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
        //alert(ret);
        return ret;
    });

    outputText = outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
    return outputText;
}

function validateJSON(jsonString) {
    if (typeof jsonString == 'string') {
        try {
            var obj = JSON.parse(jsonString);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            //console.log('验证json异常: ' + e);
            return false;
        }
    }
    //console.log('验证json失败: 非字符串参数');
    return false;
}

function validateXML(xmlContent) {
    // errorCode 0:ok，1:error，2:unkown
    var xmlDoc, errorMessage, errorCode = 0;
    // for IE
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlContent);

        if (xmlDoc.parseError.errorCode != 0) {
            errorMessage = "错误代码: " + xmlDoc.parseError.errorCode + "\n";
            errorMessage = errorMessage + "错误原因: " + xmlDoc.parseError.reason;
            errorMessage = errorMessage + "错误位置: " + xmlDoc.parseError.line;
            errorCode = 1;
        }
        else {
            errorMessage = "格式正确";
        }
    }
    // for Mozilla, Firefox, Opera, Chrome, Safari, etc.
    else if (document.implementation.createDocument) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlContent, "text/xml");
        var error = xmlDoc.getElementsByTagName("parsererror");
        if (error.length > 0) {
            if (xmlDoc.documentElement.nodeName == "parsererror") {
                errorCode = 1;
                errorMessage = xmlDoc.documentElement.childNodes[0].nodeValue;
            } else {
                errorCode = 1;
                errorMessage = xmlDoc.getElementsByTagName("parsererror")[0].innerHTML;
            }
        }
        else {
            errorMessage = "格式正确";
        }
    }
    else {
        errorCode = 2;
        errorMessage = "浏览器不支持 无法验证xml正确性";
    }
    return errorCode === 0;
    //return {
    //    "msg": errorMessage,
    //    "code": errorCode
    //};
}