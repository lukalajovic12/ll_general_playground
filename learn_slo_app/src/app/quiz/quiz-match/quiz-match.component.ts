import { Component, Input } from '@angular/core';
import { QuizAnwser, QuizObject } from '../../game-util';


@Component({
  selector: 'app-quiz-match',
  standalone: true,
  imports: [],
  templateUrl: './quiz-match.component.html',
  styleUrl: './quiz-match.component.css'
})
export class QuizMatchComponent {

    @Input() public quizData:QuizObject[] = [];

    @Input() public numberOfQuestions;

    protected questions:string[][] = [];

    protected selectedSource = '';
    protected selectedTarget = '';



    protected createQuestions():void {
      let sq = [];
      for(let i=0;i<(this.quizData.length);i++){
        sq.push(i);
      }
      this.questions = [];
      let shuffledNumbers = sq.sort((a, b) => 0.5 - Math.random());
      for(let i=0;i<this.numberOfQuestions;i++){
        let gg =this.questions[shuffledNumbers[i]];
        this.questions.push(gg);
      }
    }


    public checkSource(source: string) {
      this.selectedSource=source;
      if(this.selectedTarget.length > 0) {

      }
    }   

    public checkTarget(target: string) {
      this.selectedTarget=target;
      if(this.selectedSource.length > 0) {

      }
    }       

}
