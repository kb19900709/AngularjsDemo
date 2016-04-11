angular.module('kbApp')
    .directive('formElement', ['$log', function($log) {
        /*
            note:
                form-element attributes
                    label:欄位名稱
                    type:欄位型態
                    name:form表單欄位辨識
                    bind-to:綁定物件 
                    error-msg:是否顯示錯誤訊息

                hint-wording attributes (for type == input)
                    is-show:是否顯示提示訊息
                    content:提示訊息
                
                message-mapping attributes
                    dependency:欄位驗證依賴屬性
                    content:欄位驗證依賴訊息

                type:
                    select >> bind-to:綁定物件，list:資料來源
                    radio >>> bind-to:綁定物件，list:資料來源
                    checkbox >>> bind-to:資料來源
        */
        var printConsole = false;

        return {
            scope: true,
            require: '^form',
            restrict: 'E',
            compile: function($element, $attr) {
                var compileResult = true;
                var compileErrMsg = '';
                var validateMsgBox = {};

                var validateRuel = {
                    'required': 'required',
                    'md-maxlength': 'md-maxlength',
                    'ng-pattern': 'pattern',
                    'md-min-date': 'mindate',
                    'md-max-date': 'maxdate',
                    'md-date-filter': 'filtered'
                };

                //input基本屬性以及驗證
                var label = $attr.label;
                var type = $attr.type;
                var name = $attr.name;
                var bindTo = $attr.bindTo;

                if (!type || !bindTo) {
                    errorProcess('["type","bind-to"]', 'form-element');
                    return;
                }

                var newHtmlStr = genFormElement($element);

                if (compileResult && newHtmlStr) {
                    $element.html(newHtmlStr);
                }

                function genFormElement(element) {
                    var elementStr = '';

                    //產生DOM物件
                    elementStr += genElement(element);

                    //輸入框提示訊息
                    elementStr += genHint(element);

                    //輸入框檢核訊息
                    elementStr += genMessage(element);

                    if (printConsole) {
                        $log.log('elementStr >>> ' + elementStr);
                    }

                    return elementStr;
                }

                //未來如果有需要可再擴充
                function genElement(element) {
                    var elementStr = '';
                    switch (type) {
                        case 'input':
                            var validateMsg = element.find('message-mapping');
                            elementStr += genInput(validateMsg);
                            break;
                        case 'checkbox':
                            elementStr += genCheckbox();
                            break;
                        case 'select':
                            var dataList = element.attr('list');
                            var validateMsg = element.find('message-mapping');
                            elementStr += genSelect(dataList, validateMsg);
                            break;
                        case 'radio':
                            var dataList = element.attr('list');
                            elementStr += genRadio(dataList);
                            break;
                        case 'date':
                            var validateMsg = element.find('message-mapping');
                            elementStr += genDatePicker(validateMsg);
                            break;
                    }
                    return elementStr;
                }

                function genSelect(list, validateMsg) {
                    if (!list) {
                        return '';
                    }

                    var elementStr = '';
                    if (label) {
                        elementStr += '<label ng-show="' + bindTo + ' == null">' + label + '</label>';
                    }
                    elementStr += '<md-select ng-model="' + bindTo + '" name="' + name + '" ';
                    elementStr += genValidate(validateMsg);
                    elementStr += '>';
                    elementStr += '<md-option ng-value="item.value" ng-repeat="item in ' + list + '">';
                    elementStr += '<span ng-bind="item.label"></span>';
                    elementStr += '</md-option>';
                    elementStr += '</md-select>';
                    return elementStr;
                }

                function genDatePicker(validateMsg) {
                    var elementStr = '';
                    if (label) {
                        elementStr += '<label>' + label + '</label>';
                    }
                    elementStr += '<md-datepicker ng-model="' + bindTo + '" name="' + name + '" md-placeholder="Enter date" ';
                    elementStr += genValidate(validateMsg);
                    elementStr += '></md-datepicker>';
                    return elementStr;
                }

                function genRadio(dataList) {
                    if (!dataList) {
                        return '';
                    }
                    var elementStr = '';
                    elementStr += '<md-radio-group ng-model="' + bindTo + '" class="standard">';
                    elementStr += '<md-radio-button ng-repeat="item in ' + dataList + '" ng-value="item.value">';
                    elementStr += '{{item.label}}';
                    elementStr += '</md-radio-group>';
                    elementStr += '</md-radio-group>';
                    return elementStr;
                }

                function genCheckbox() {
                    var elementStr = '';
                    elementStr += '<span ng-repeat="item in ' + bindTo + '" class="standard">';
                    elementStr += '<md-checkbox ng-model="item.selected" ng-true-value="1" ng-false-value="0">';
                    elementStr += '{{item.label}}';
                    elementStr += '</md-checkbox>';
                    elementStr += '</span>';
                    return elementStr;
                }

                function genInput(validateMsg) {
                    var elementStr = '';
                    if (label) {
                        elementStr += '<label>' + label + '</label>';
                    }
                    elementStr += '<input ng-model="' + bindTo + '" name="' + name + '" ';
                    elementStr += genValidate(validateMsg);
                    elementStr += '>';
                    return elementStr;
                }

                function genHint(element) {
                    var hintWording = element.find('hint-wording');
                    if (hintWording.length == 0) {
                        return '';
                    }
                    hintWording = angular.element(hintWording);
                    var hintLabel = hintWording.text();
                    var isShow = hintWording.attr('is-show');
                    var elementStr = '';
                    if (hintLabel) {
                        if (isShow) {
                            elementStr += '<div class="hint" ng-show="' + isShow + '">' + hintLabel + '</div>';
                        } else {
                            elementStr += '<div class="hint">' + hintLabel + '</div>';
                        }
                    } else {
                        errorProcess('label', 'hint-wording');
                        return;
                    }

                    return elementStr;
                }

                function genValidate(validateMsg) {
                    if (!validateMsg) {
                        return '';
                    }

                    var validateWording = '';
                    var mappingElement, validate;
                    angular.forEach(validateMsg, function(validateElement) {
                        mappingElement = angular.element(validateElement);
                        validate = mappingElement.attr('dependency');
                        if (validate) {
                            validateWording += validate + ' ';
                        }
                    });

                    return validateWording;
                }

                function genMessage(element) {
                    var validateMsg = element.find('message-mapping');

                    if (validateMsg.length == 0) {
                        return '';
                    }

                    var mappingElement, validate, validateMessage;
                    angular.forEach(validateMsg, function(validateElement) {
                        mappingElement = angular.element(validateElement);
                        validate = mappingElement.attr('dependency');
                        if (validate.indexOf("=") != -1) {
                            validate = validate.substr(0, validate.indexOf("="));
                        }
                        validateMessage = mappingElement.text();
                        if (validateMessage) {
                            validateMsgBox[validateRuel[validate]] = validateMessage;
                        }
                    });

                    var showError = $element.attr('error-msg');

                    var elementStr = '';
                    if (showError) {
                        elementStr += '<div ng-show="' + showError + '">';
                    } else {
                        elementStr += '<div>'
                    }
                    elementStr += '<div ng-repeat="(key,value) in validateMsgBox" class="errorMsg" ng-message ng-show="isError(key)">';
                    elementStr += '<span ng-bind="value"></span>'
                    elementStr += '</div>';
                    elementStr += '</div>';
                    return elementStr;
                }

                function errorProcess(attr, element) {
                    var compileErrMsg = 'please check attr ' + attr + ' in ' + element;
                    $log.log('formElement error message : ' + compileErrMsg);
                    compileResult = false;
                    return;
                }

                return function($scope, $element, attrs, formCtrl) {
                    if (compileResult) {
                        $scope.validateMsgBox = validateMsgBox;
                        $scope.isError = function(key) {
                            return formCtrl[name]['$error'][key];
                        };
                    }
                };
            }
        };
    }]);