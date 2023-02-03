import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  words = ['java', 'developer', 'cloud', 'javascript', 'design', 'python', 'azure', 'algorithm', ]; // word to be scrambled
  word = this.words[Math.floor(Math.random() * this.words.length)];
  scrambledWord = this.scrambleWord(this.word); // scrambled version of the word
  guess = '';
  message = '';
  score = 0;
  timeLeft = 60;
  interval: any;
  gameOver = false;

  ngOnInit(): void {
    this.startTimer();
  }


  //start timer
  startTimer():void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.gameOver = true;
        clearInterval(this.interval);
      }
    }, 1000)
  }


  //function to scramble a word
  scrambleWord(word: string): string {

    //split word into an array of letters
    let wordArray = word.split('');

    //scramble the array using Fisher-Yates shuffle algorithm
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    //return the scrambled word
    return wordArray.join('');

  }


  //function to check if the player's guess is correct
  checkGuess() {
    if (this.guess.toLowerCase() === this.word) {
      this.message = "Correct";
      this.nextWord();
      this.updateScore();
    } else {
      this.message = "Wrong, try again!";
    }
  }

  //function to move to the next word
  nextWord(): void {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.scrambledWord = this.scrambleWord(this.word);
    this.guess = '';
  }

  //function to update the score 
  updateScore(): void {
    this.score++;
  }

  //new game
  startNewGame():void {
    this.gameOver = false;
    this.score = 0;
    this.timeLeft = 60;
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.scrambledWord = this.scrambleWord(this.word);                                                                                                                                                                                
    this.guess = "";
    this.message = "";
    this.startTimer();
    ;
  }
}
