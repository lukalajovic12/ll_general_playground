import { Component ,Input, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Category, QuizObject, QuizAnwser } from '../game-util';
import { AreaBase } from '../area-base';
import { QuizMenuComponent } from './quiz-menu/quiz-menu.component' 
import { QuizButtonComponent } from './quiz-button/quiz-button.component' 
import { QuizEndComponent } from './quiz-end/quiz-end.component' 
import { CommonModule } from '@angular/common';
export type QuizState = 'settings' | 'game' | 'end';

@Component({
  standalone:true,
  imports: [CommonModule, QuizMenuComponent, QuizButtonComponent,QuizEndComponent],
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent extends AreaBase implements OnDestroy  {

  protected questions:QuizObject[] = [];
  protected question:QuizObject;

  @Input()
  public title:string;
  @Input()
  public chooseCategories?:string;

  @Input()
  public quizList:{ [key: string]: string[][]; }={};

  @Input() displayQuestion: (QuizObject) => string;

  private unsubscribe$: Subject<void> = new Subject<void>();


  @Input()
  public categories: Category[]= [];

  protected quizData:QuizObject[] = [];

  protected gameState:QuizState='settings';

  public numberOfQuestions = 3;


  protected anwsers:QuizAnwser[]=[];

  protected correct:QuizObject[] = [];

  protected wrongAnwser:QuizObject = null;  
  protected correctAnwser:QuizObject = null;  

  public time = 30;
  protected timeLeft = this.time;

  constructor() {
    super();
  }

  protected displayQuestionText():string {
    if(this.question) {
      return this.displayQuestion(this.question);
    } else {
      return "";
    }
  }

  private createQuestions() {
    if(this.correct.length === this.quizData.length) {
      this.gameState = 'end';
      this.timeLeft = 0;
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
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

  startCountdown() {
    interval(1000)
      .pipe(
        takeUntil(this.unsubscribe$),
        take(this.time + 1)
      )
      .subscribe(() => {
        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
          this.gameState = 'end';
          this.timeLeft = this.time;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public startGame = () => {
    this.gameState='game'; 
    this.timeLeft = this.time;
    this.correct = [];
    this.anwsers = [];
    this.getQuizData();
    this.createQuestions();
    this.startCountdown();
  }

  public playAgain = () => { 
    this.gameState='settings'; 
  }


  checkAnswer(cc: QuizObject) {
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

  protected getQuizData():void {
    this.quizData=[];
    const noneSelected = this.categories.filter(c => c.selected).length === 0;
    for(let con of this.categories) {
      if(noneSelected || con.selected){
        for(let c of this.quizList[con.category]) {
          let q:QuizObject ={categoy:con.category, anwser:c[0],question:c[1]};
          this.quizData.push(q);
        }
      }
    }
  }



}
