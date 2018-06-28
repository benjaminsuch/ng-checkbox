(() => {

  'use strict';

  const app = angular.module('ngCheckbox', []);

  app.directive('ngCheckbox', [() => {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        currentVal: '=ngModel',
        ngCheckboxOptions: '=',
        checked: '=',
        unchecked: '=',
        disabled: '='
      },
      template: '<button class="ng-checkbox" ng-class="{checked: currentVal === checkedVal, unchecked: currentVal !== checkedVal}" type="button" ng-click="toggle();" ng-disabled="disabled">' +
                '  <span class="{{currentVal === checkedVal ? options.checkedClass : options.uncheckedClass}}"></span>' +
                '</button>',
      link: (scope, element, attrs, ngModelController) => {
        const defaultOptions = {
          checkedClass: 'glyphicon glyphicon-ok',
          uncheckedClass: 'glyphicon'
        };
    
        scope.options = {};
    
        scope.toggle = () => {
          scope.currentVal = scope.currentVal === scope.checkedVal ? scope.uncheckedVal : scope.checkedVal;
        };
    
        scope.$watch('checked', val => {
          scope.checkedVal = val ? val : true;
          ngModelController.$validate();
        });
    
        scope.$watch('unchecked', val => {
          scope.uncheckedVal = val ? val : false;
          ngModelController.$validate();
        });
    
        scope.$watchCollection('ngCheckboxOptions', (val = {}) => {
          angular.extend(scope.options, defaultOptions, val);
        });

        if (angular.isUndefined(scope.currentVal)) {
          scope.currentVal = false;
        }

        ngModelController.$validators.invalid = (modelValue, viewValue) => {
          let val = modelValue || viewValue;
          return val === scope.checkedVal || val === scope.uncheckedVal;
        };
      }
    };
  }]);

})();