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
  function init() {
    $scope.cellIndices = [];
    for(var i = 0; i < 81; i++) {
      $scope.cellIndices.push(i);
    }

    $scope.cells = {};
    for(var cellIndex in $scope.cellIndices) {
      $scope.cells[cellIndex] = {value: null, userInput: false};
    }

    $scope.editingCellIndex = null;
  };

  $scope.fetchCell = function(cellIndex) {
    return $scope.cells[cellIndex];
  }

  $scope.cellValToDisplay = function(cellIndex) {
    var cell = $scope.fetchCell(cellIndex);
    if (cell.value) {
      return cell.value;
    } else {
      return '&nbsp;'
    }
  }

  $scope.cellClass = function(cellIndex) {
    var cell = $scope.fetchCell(cellIndex)
    var classNames = ['cell']
    if (cell.userInput) {
      classNames.push('user');
    }

    return classNames;
  }

  $scope.isEditModalHidden = function() {
    return $scope.editingCellIndex == null;
  }

  $scope.editCell = function(cellIndex) {
    $scope.editingCellIndex = cellIndex;
  }

  $scope.updateCell = function(val) {
    var cell = $scope.fetchCell($scope.editingCellIndex);
    cell.value = val;
    cell.userInput = !!val;
    $scope.editingCellIndex = null;
  }

  $scope.solve = function() {
    console.log('Solving');
    var cells = [];
    for(var i = 0; i < 81; i++) {
      cells[i] = $scope.cells[i].value;
    }
    solution = SudokuSolver.solve(cells);
    console.log(solution);
    if (solution.solution) {
      cells = solution.solution;
      for (var i = 0; i < 81; i++) {
        $scope.cells[i].value = cells[i];
      }
    }
  }

  init();
})
