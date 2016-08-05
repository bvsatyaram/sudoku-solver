// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sudokuSolver', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('SolutionCtrl', function($scope) {
  $scope.cells = [];
  for(var i = 1; i <= 81; i++) {
    $scope.cells.push(
      {value: Math.floor((Math.random()*9)+1), userInput: ((Math.random() > 0.9) ? true : false)}
    );
  }

  $scope.cellClass = function(cell) {
    var classNames = ['cell']
    if (cell.userInput) {
      classNames.push('user');
    }

    return classNames;
  }
})
