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
        ngCheckboxChecked: '=',
        ngCheckboxUnchecked: '=',
        disabled: '='
      },
      template: '<button class="ng-checkbox" type="button" ng-click="toggle();" ng-disabled="disabled">' +
                '  <span class="{{currentVal === checkedVal ? options.checkedClass : options.uncheckedClass}}"></span>' +
                '</button>',
      link: (scope, element, attrs, ngModelController) => {
        ngModelController.$validators.invalid = (modelValue, viewValue) => {
          let val = modelValue || viewValue;
          return val === scope.checkedVal || val === scope.uncheckedVal;
        };
      },
      controller: ngCheckboxController
    };
  }]);

  ngCheckboxController.$inject = ['$scope'];
  function ngCheckboxController($scope) {
    const defaultOptions = {
      checkedClass: 'glyphicon glyphicon-ok',
      uncheckedClass: ''
    };

    $scope.options = {};

    $scope.toggle = () => {
      $scope.currentVal = $scope.currentVal === $scope.checkedVal ? $scope.uncheckedVal : $scope.checkedVal;
    };

    $scope.$watch('ngCheckboxChecked', val => {
      $scope.checkedVal = val ? val : true;
    });

    $scope.$watch('ngCheckboxUnchecked', val => {
      $scope.uncheckedVal = val ? val : false;
    });

    $scope.$watchCollection('ngCheckboxOptions', (val = {}) => {
      angular.extend($scope.options, defaultOptions, val);
    });
  }

})();