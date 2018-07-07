// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

//   * An array of `new` Letter objects representing the letters of the underlying word

//   * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

//   * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)

const letter = require("./Letter");

let word = function(targetWord) {
    this.targetWord = targetWord;
    this.letters = [];
    this.wordGuessed = false;
    this.letterGeneration = function() {
        for (let i = 0; i < targetWord.length; i++) {
            let newLetter = new letter(this.targetWord[i]);
            this.letters.push(newLetter);
        };
    };
    this.letterGuess = function(guessedLetter) {
        let guessCheckerCount = 0;
        for (let i = 0; i < this.letters.length; i++) {
            if (this.letters[i].character === guessedLetter) {
                this.letters[i].guessed = true;
                guessCheckerCount++;
            };
        };
        return guessCheckerCount;
    };
    this.winCheck = function() {
        this.wordGuessed = this.letters.every(function(currentLetter) {
            return currentLetter.guessed;
        });
        return this.wordGuessed;
    };
    this.renderWord = function() {
        let renderedWord = [];

        for (let i in this.letters) {
            if (this.letters[i].guessed){
                renderedWord += this.letters[i].character;
            } else {
                renderedWord += "_ ";
            };
        };
        return renderedWord;
    };
};
//
module.exports = word;