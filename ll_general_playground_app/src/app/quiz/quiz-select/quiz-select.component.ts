import { Component, Input } from '@angular/core';
import { QuizButtonComponent } from '../quiz-button/quiz-button.component';
import { QuizAnwser, QuizObject } from '../../game-util';

@Component({
  selector: 'app-quiz-select',
  standalone: true,
  imports: [QuizButtonComponent],
  templateUrl: './quiz-select.component.html',
  styleUrl: './quiz-select.component.css'
})
export class QuizSelectComponent {

    @Input() public questions:QuizObject[] = [];

    @Input() public quizData:QuizObject[] = [];

    @Input() public numberOfQuestions;
    @Input() public displayQuestion: (QuizObject) => string;

    @Input() public question:QuizObject;

  protected anwsers:QuizAnwser[]=[];
  protected correct:QuizObject[] = [];
  protected wrongAnwser:QuizObject = null;  
  protected correctAnwser:QuizObject = null;  

   protected createQuestions = () => {
     if(this.correct.length === this.quizData.length) {
  //     this.gameState = 'end';
  //     this.timeLeft = 0;
  //     this.unsubscribe$.next();
  //     this.unsubscribe$.complete();
     } else {
       this.correctAnwser=null;
       this.wrongAnwser=null;
       let sq = [];
       for(let i=0;i<(this.quizData.length);i++){
         sq.push(i);
       }
       this.questions = [];
       let shuffledNumbers = sq.sort((a, b) => 0.5 - Math.random());
       for(let i=0;i<this.numberOfQuestions;i++){
         let gg =this.quizData[shuffledNumbers[i]];
         this.questions.push(gg);
       }
       this.question=this.questions[0];
       this.question=this.questions[Math.floor(Math.random()*this.numberOfQuestions)];
 
       if(this.correct.includes(this.question)) {
         this.createQuestions();
       }
   }
   }   

    public checkAnswer(cc: QuizObject) {
      if(this.question === cc) {
        this.correctAnwser = cc;
        this.correct.push(cc);
      } else {
        this.correctAnwser = this.question;
        this.wrongAnwser = cc;
      }
      let anw:QuizAnwser = {correct:this.question,anwsered:cc};
      this.anwsers.push(anw);
        setTimeout(() => {
          this.createQuestions();
        }, 1000);
    }   

    protected displayQuestionText():string {
      if(this.question) {
        return this.displayQuestion(this.question);
      } else {
        return "";
      }
    }
}
