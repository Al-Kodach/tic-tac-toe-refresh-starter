const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
   constructor() {
      this.playerTurn = "O";

      this.grid = [
         [" ", " ", " "],
         [" ", " ", " "],
         [" ", " ", " "],
      ];

      this.cursor = new Cursor(3, 3);

      // Initialize a 3x3 tic-tac-toe grid
      Screen.initialize(3, 3);
      Screen.setGridlines(true);

      // keys and commands
      const { up, down, right, left } = this.cursor;

      Screen.addCommand("up", "up arrow", up);
      Screen.addCommand("down", "down arrow", down);
      Screen.addCommand("right", "right arrow", right);
      Screen.addCommand("left", "left arrow", left);
      Screen.addCommand("space", "place move", TTT.placeMove.bind(this));

      Screen.render();
   }

  static placeMove() {
      let row = this.cursor.row;
      let col = this.cursor.col;

      if (this.grid[row][col] == " ") {
         this.grid[row][col] = this.playerTurn;
         Screen.setGrid(row, col, this.playerTurn);
			Screen.render();
      }

     let gameState = TTT.checkWin( this.grid );

	  if (gameState) {
		TTT.endGame( gameState );
	  }
   }

   static checkWin(grid) {
			let width = grid.length - 1;

			// recognizes diagonal wins
			let tlbr = [] // top-left-to-bottom-right (diagonal)
			let trbl = [] // top-right-to-bottom-left (diagonal)
			let d; // diagonal element
			let flatGrid = [];

			for (let r = 0; r < grid.length; r++) {
				let row = grid[r];
				let column = [];

				// top-left-to-bottom-right diagonal
				d = grid[r][r]
				tlbr.push(d)

				// top-right=to-bottom-left diagonal
				d = grid[r][width];
				trbl.push(d);
				width--;

				// recognizes horizontal wins
				if (row.every(el => el == 'O')) {return 'O'}
				if (row.every(el => el == 'X')) {return 'X'}

				//  recognizes vertical wins
				for (let c = 0; c < row.length; c++) {
					let col = grid[c][r];
					column.push(col);

					// push element into flatArray
					flatGrid.push( grid[r][c] );
				}

				if (column.every(el => el == 'O')) {return 'O'}
				if (column.every(el => el == 'X')) {return 'X'}
			}

			// recognizes diagonal wins
			if (tlbr.every(el => el == 'O')) {return 'O'}
			if (tlbr.every(el => el == 'X')) {return 'X'}
			if (trbl.every(el => el == 'O')) {return 'O'}
			if (trbl.every(el => el == 'X')) {return 'X'}

			// recognizes ties
			if (!flatGrid.includes(' ')) {return 'T'}

			// return false if no tie or win
			return false;
   }

   static endGame(winner) {
      if (winner === "O" || winner === "X") {
         Screen.setMessage(`Player ${winner} wins!`);
      } else if (winner === "T") {
         Screen.setMessage(`Tie game!`);
      } else {
         Screen.setMessage(`Game Over`);
      }
      Screen.render();
      Screen.quit();
   }
}

module.exports = TTT;
