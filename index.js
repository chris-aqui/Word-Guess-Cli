// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses
const word = require("./Word");
const inquirer = require("Inquirer");
//
let game = {
  wordBank: ["charmander", "bulbasaur ", "squirtle", "pikachu"],
  guessesRemaining: 10,
  currentWord: null,
  startGame: function (wordz) {
    this.guessesRemaining = 10;
    this.currentWord = new word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
    this.currentWord.letterGeneration();
    this.userGuess();
  },
  userGuess: function () {
    let thisThing = this;
    inquirer.prompt([{
      name: 'guessedLetter',
      type: 'input',
      message: 'What letter would you like to guess?'
    }]).then(function (response) {
      // console.log("the current wordfor testing ", );
      console.log(response.guessedLetter);
      let guessCheckerProcess = thisThing.currentWord.letterGuess(response.guessedLetter);
      if (guessCheckerProcess === 0) {
        thisThing.guessesRemaining--;
        console.log("Guesses Remaining: " + thisThing.guessesRemaining);
      } else {
        console.log("Good Guess!");
        if (thisThing.currentWord.winCheck()) {
          console.log("You win!");
        };
      };
      if (thisThing.guessesRemaining > 0 && thisThing.currentWord.wordGuessed === false) {
        thisThing.userGuess();
      };
      if (thisThing.guessesRemaining === 0) {
        console.log("Game over. The word was: " + thisThing.currentWord.targetWord);
        return;
      } else {
        console.log(thisThing.currentWord.renderWord());
      };
    });
  }
};
//
game.startGame();