import { Component, Input ,OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Category, QuizObject, QuizAnwser, languagesTitle } from '../game-util';
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

  @Input() quizData:QuizObject[] = [];
  @Input() sourceLanguage='';
  @Input() targetLanguage='';
  @Input() categories: Category[]= [];

  @Input() public quizList:{ [key: string]: QuizObject[]; }={};
  public time = 100;
  public title="";

  public loading = true;

  public numberOfQuestions = 3;

  protected anwsers:QuizAnwser[]=[];
  protected correct:QuizObject[] = [];
  protected wrongAnwser:QuizObject = null;  
  protected correctAnwser:QuizObject = null;  
  protected timeLeft = this.time;

  protected gameState:QuizState='settings';
  protected questions:QuizObject[] = [];
  protected question:QuizObject;

  private direction = true;

  private unsubscribe$: Subject<void> = new Subject<void>();

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    this.title=languagesTitle[this.targetLanguage];
    this.categories = [];
    Object.keys(this.quizList).forEach(key=>{
      this.categories.push({category:key,selected:false});
    });
    this.loading=false;
  }


  isLoading(): boolean {
    return this.loading || Object.keys(this.quizList).length === 0
  }



  public displaySourceLanguage:() => string = () => {

    if(this.direction) {
      return this.sourceLanguage;
    } else {
      return this.targetLanguage;
    }
  };


  public displayTargetLanguage:() => string = () => {
    if(this.direction) {
      return this.targetLanguage;
    } else {
      return this.sourceLanguage;
    }
  };


  protected displayQuestionText():string {
    if(this.question) {
      return this.question.question;
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

  private startCountdown() {
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

 public languageDirection = () => {
    this.direction=!this.direction;
  } 


  public playAgain = () => { 
    this.gameState='settings'; 
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

  private getQuizData():void {
    this.quizData=[];
    const noneSelected = this.categories.filter(c => c.selected).length === 0;
    for(let con of this.categories) {
      if(noneSelected || con.selected){
        for(let c of this.quizList[con.category]) {
          this.quizData.push(c);
        }
      }
    }
  }



}
