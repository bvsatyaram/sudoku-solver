var SudokuSolver = {
  // Takes in an array of 81 elements as an argument.
  // The elements are ordered row wise from left to right and then top to bottom
  // Element is a number, if the cell has a number.
  // Element is `null`, if the cell has no number
  //
  // Returns an array of 81 numbers
  solve: function(cells) {
    this.init(cells);
    this.currentEmptyCellCounter = 0;
    return this.fill();
  },
  init: function(cells) {
    this.cells = cells;
    this.emptyIndices = [];
    for(var i = 0; i < cells.length; i++) {
      if (cells[i] == null) {
        this.emptyIndices.push(i);
      }
    }
    this.emptyCellsCount = this.emptyIndices.length;
  },
  fill: function(num) {
    num = typeof num !== 'undefined' ? num : 1;
    if (this.currentEmptyCellCounter >= this.emptyCellsCount) {
      return this.solution();
    } else if (this.currentEmptyCellCounter < 0) {
      return this.noSolution();
    } else if (num > 9) {
      return this.backTrack();
    } else {
      if (this.checkFit(num)) {
        this.cells[this.emptyIndices[this.currentEmptyCellCounter]] = num;
        this.currentEmptyCellCounter++;
        return this.fill();
      } else {
        return this.fill(num + 1);
      }
    }
  },
  checkFit: function(num) {
    return this.checkRow(num) && this.checkCol(num) && this.checkSqr(num);
  },
  checkRow: function(num) {
    var cellNo = this.emptyIndices[this.currentEmptyCellCounter];
    var firstInRow = cellNo - (cellNo % 9);
    for (var i = firstInRow; i < firstInRow + 9; i++) {
      if (this.cells[i] == num) {
        return false;
      }
    }
    return true;
  },
  checkCol: function(num) {
    var cellNo = this.emptyIndices[this.currentEmptyCellCounter];
    var firstInCol = cellNo % 9;
    for(var i = 0; i< 9; i++) {
      var currentCellNo = firstInCol + (9 * i);
      if (this.cells[currentCellNo] == num) {
        return false;
      }
    }

    return true;
  },
  checkSqr: function(num) {
    var cellNo = this.emptyIndices[this.currentEmptyCellCounter];
    var rowNo = parseInt(cellNo / 9);
    var rowCountInSqr = rowNo % 3;
    var firstInSquare = cellNo - (cellNo % 3) - (9 * rowCountInSqr);
    for(var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(this.cells[firstInSquare + i + (9 * j)] == num) {
          return false;
        }
      }
    }

    return true;
  },
  backTrack: function() {
    this.cells[this.emptyIndices[this.currentEmptyCellCounter]] = null;
    this.currentEmptyCellCounter--;
    return this.fill(this.cells[this.emptyIndices[this.currentEmptyCellCounter]] + 1);
  },
  noSolution: function() {
    return {
      error: 'No solution found'
    };
  },
  solution: function() {
    return {
      solution: this.cells
    };
  }
};
