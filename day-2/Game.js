class Game {
    constructor() {
      this.myWeapon = '';
      this.elfWeapon = '';
      this.myPoints = 0;
      this.getTxt();
    }
  
    async getTxt() {
      const res = await fetch('../txt-files/day-2.txt');
      const text = await res.text();
      const games = text.split(/\r?\n/);
      let gamesSplitted = [];
  
      for (let i = 0; i < games.length; i++) {
        const singleGame = games[i].split(' ');
        gamesSplitted.push(singleGame);
      }
  
      this.startGame(gamesSplitted);
    }
  
    async startGame(games) {
      for (let i = 0; i < games.length; i++) {
          const elfChoice = games[i][0];
          const myChoice = games[i][1];
      
          // Elf weapon choice
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

          // X means I lose
          // Y means a tie
          // Z means I win
      
          // My weapon choice
          switch (myChoice) {
            case 'X':
              this.myWeapon = 'rock';
              this.myPoints += 1;
              break;
            case 'Y':
              this.myWeapon = 'paper';
              this.myPoints += 2;
              break;
            case 'Z':
              this.myWeapon = 'scissors';
              this.myPoints += 3;
              break;
          }
      
          if (this.myWeapon === this.elfWeapon) {
            this.myPoints += 3;
          } else if (this.myWeapon === 'rock') {
            if (this.elfWeapon === 'scissors') {
              this.myPoints += 6;
            }
          } else if (this.myWeapon === 'paper') {
            if (this.elfWeapon === 'rock') {
              this.myPoints += 6;
            }
          } else if (this.myWeapon === 'scissors') {
            if (this.elfWeapon === 'paper') {
              this.myPoints += 6;
            }
          }
        }
        console.log(`Part 1 answer: ${this.myPoints}`)
      }
    }
  
export default Game;