class GamePart2 {
  constructor() {
    this.myWeapon = '';
    this.elfWeapon = '';
    this.myPoints = 0;
    this._getTxt();
  }

  async _getTxt() {
    const res = await fetch('../txt-files/day-2.txt');
    const text = await res.text();
    const games = text.split(/\r?\n/);
    let gamesSplitted = [];

    for (let i = 0; i < games.length; i++) {
      const singleGame = games[i].split(' ');
      gamesSplitted.push(singleGame);
    }

    this._startGame(gamesSplitted);
  }

  async _startGame(games) {
    for (let i = 0; i < games.length; i++) {
      const elfChoice = games[i][0];
      const gameOutcome = games[i][1];

      // Elf weapon choice translated into rock/paper/scissors
      switch (elfChoice) {
        case 'A':
          this.elfWeapon = 'rock';
          break;
        case 'B':
          this.elfWeapon = 'paper';
          break;
        case 'C':
          this.elfWeapon = 'scissors';
          break;
      }

      if (gameOutcome === 'X') {
        if (this.elfWeapon === 'rock') {
          this.myWeapon = 'scissors';
        } else if (this.elfWeapon === 'scissors') {
          this.myWeapon = 'paper';
        } else if (this.elfWeapon === 'paper') {
          this.myWeapon = 'rock';
        }
      } else if (gameOutcome === 'Y') {
        this.myWeapon = this.elfWeapon;
      } else if (gameOutcome === 'Z') {
        if (this.elfWeapon === 'rock') {
          this.myWeapon = 'paper';
        } else if (this.elfWeapon === 'scissors') {
          this.myWeapon = 'rock';
        } else if (this.elfWeapon === 'paper') {
          this.myWeapon = 'scissors';
        }
      }

      // Assign points based on weapon
      switch (this.myWeapon) {
        case 'rock':
          this.myPoints += 1;
          break;
        case 'paper':
          this.myPoints += 2;
          break;
        case 'scissors':
          this.myPoints += 3;
          break;
      }

      // Assign points based on game outcome
      switch (gameOutcome) {
        case 'Y':
          this.myPoints += 3;
          break;
        case 'Z':
          this.myPoints += 6;
          break;
        default:
          this.myPoints = this.myPoints;
      }
    }

    console.log(`Part 2 answer: ${this.myPoints}`)
  }
}

export default GamePart2;
