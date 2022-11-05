export class Board {
  iswin: boolean = false;
  board!: any[][];
  stateboard!: any[][];
  realboard!: any[][];
  gameover: boolean = false;
  rowCount: number;
  colCount: number;
  foundcount: number = 0;
  mineCount: number = 0;
  score: number = 0;

  constructor(row: number, col: number, mineCount: number) {
    this.rowCount = row;
    this.colCount = col;
    this.mineCount = mineCount;
    this.board = Array(this.rowCount)
      .fill([])
      .map(() => Array(this.colCount).fill('-'));
    this.stateboard = Array(this.rowCount)
      .fill([])
      .map(() => Array(this.colCount).fill('H'));
    this.realboard = Array(this.rowCount)
      .fill([])
      .map(() => Array(this.colCount).fill('-'));
    for (let i = 0; i < mineCount; i++) {
      let appx = Math.floor(Math.random() * row);
      let appy = Math.floor(Math.random() * col);
      if (this.realboard[appx][appy] === '*') {
        i--;
      } else {
        this.realboard[appx][appy] = '*';
      }
    }
  }
  countMines(x: number, y: number): number {
    let count = 0;
    if (x + 1 < this.rowCount && this.realboard[x + 1][y] == '*') {
      count++;
    }
    if (x - 1 >= 0 && this.realboard[x - 1][y] == '*') {
      count++;
    }
    if (
      x + 1 < this.rowCount &&
      y - 1 >= 0 &&
      this.realboard[x + 1][y - 1] == '*'
    ) {
      count++;
    }
    if (x < this.rowCount && y - 1 >= 0 && this.realboard[x][y - 1] == '*') {
      count++;
    }
    if (x - 1 >= 0 && y - 1 >= 0 && this.realboard[x - 1][y - 1] == '*') {
      count++;
    }
    if (
      x + 1 < this.rowCount &&
      y + 1 < this.colCount &&
      this.realboard[x + 1][y + 1] == '*'
    ) {
      console.log(x + ' ' + y);
      count++;
    }
    if (
      x < this.rowCount &&
      y + 1 < this.colCount &&
      this.realboard[x][y + 1] == '*'
    ) {
      count++;
    }
    if (
      x - 1 >= 0 &&
      y + 1 < this.colCount &&
      this.realboard[x - 1][y + 1] == '*'
    ) {
      count++;
    }
    return count;
  }

  revealmap(x: number, y: number, value: number) {
    this.scoreadd(value);
    if (x + 1 < this.rowCount && this.board[x + 1][y] === '-') {
      this.board[x + 1][y] = this.countMines(x + 1, y);
      this.stateboard[x + 1][y] = 'O';
      this.foundcount++;

      if (this.countMines(x + 1, y) == 0) {
        this.revealmap(x + 1, y, value);
      }
    }
    if (x - 1 >= 0 && this.board[x - 1][y] === '-') {
      this.board[x - 1][y] = this.countMines(x - 1, y);
      this.stateboard[x - 1][y] = 'O';
      this.foundcount++;
      if (this.countMines(x - 1, y) == 0) {
        this.revealmap(x - 1, y, value);
      }
    }
    if (
      x + 1 < this.rowCount &&
      y - 1 >= 0 &&
      this.board[x + 1][y - 1] == '-'
    ) {
      this.board[x + 1][y - 1] = this.countMines(x + 1, y - 1);
      this.stateboard[x + 1][y - 1] = 'O';
      this.foundcount++;
      if (this.countMines(x + 1, y - 1) == 0) {
        this.revealmap(x + 1, y - 1, value);
      }
    }
    if (x < this.rowCount && y - 1 >= 0 && this.board[x][y - 1] == '-') {
      this.board[x][y - 1] = this.countMines(x, y - 1);
      this.stateboard[x][y - 1] = 'O';
      this.foundcount++;
      if (this.countMines(x, y - 1) == 0) {
        this.revealmap(x, y - 1, value);
      }
    }
    if (x - 1 >= 0 && y - 1 >= 0 && this.board[x - 1][y - 1] == '-') {
      this.board[x - 1][y - 1] = this.countMines(x - 1, y - 1);
      this.stateboard[x - 1][y - 1] = 'O';
      this.foundcount++;
      if (this.countMines(x - 1, y - 1) == 0) {
        this.revealmap(x - 1, y - 1, value);
      }
    }
    if (
      x + 1 < this.rowCount &&
      y + 1 < this.colCount &&
      this.board[x + 1][y + 1] == '-'
    ) {
      this.board[x + 1][y + 1] = this.countMines(x + 1, y + 1);
      this.stateboard[x + 1][y + 1] = 'O';
      this.foundcount++;
      if (this.countMines(x + 1, y + 1) == 0) {
        this.revealmap(x + 1, y + 1, value);
      }
    }
    if (
      x < this.rowCount &&
      y + 1 < this.colCount &&
      this.board[x][y + 1] == '-'
    ) {
      this.stateboard[x][y + 1] = 'O';
      this.board[x][y + 1] = this.countMines(x, y + 1);
      this.foundcount++;
      if (this.countMines(x, y + 1) == 0) {
        this.revealmap(x, y + 1, value);
      }
    }
    if (
      x - 1 >= 0 &&
      y + 1 < this.colCount &&
      this.board[x - 1][y + 1] == '-'
    ) {
      this.stateboard[x - 1][y + 1] = 'O';
      this.board[x - 1][y + 1] = this.countMines(x - 1, y + 1);
      this.foundcount++;
      if (this.countMines(x - 1, y + 1) == 0) {
        this.revealmap(x - 1, y + 1, value);
      }
    }
  }

  scoreadd(value: number) {
    this.score += value;
  }
  makemove(x: number, y: number, timer: any, value: number): void {
    if (this.stateboard[x][y] == 'F') return;
    if (this.board[x][y] != '-') {
      return;
    } else {
      if (this.realboard[x][y] == '*') {
        this.gameover = true;
        if (timer) {
          clearInterval(timer);
        }
        return;
      } else {
        this.board[x][y] = this.countMines(x, y);
        this.stateboard[x][y] = 'O';
        this.foundcount++;
        if (this.countMines(x, y) == 0) {
          console.log(x + ' ' + y);
          this.revealmap(x, y, value);
        }
        if (
          this.foundcount ===
          this.rowCount * this.colCount - this.mineCount
        ) {
          this.gameover = true;
          this.iswin = true;
          if (timer) {
            clearInterval(timer);
          }
        }
      }
    }
  }
}
