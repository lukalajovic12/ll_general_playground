import { Component, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Category, QuizObject, QuizAnwser } from '../game-util';
import { AreaBase } from '../area-base';
import { QuizMenuComponent } from './quiz-menu/quiz-menu.component' 
import { QuizButtonComponent } from './quiz-button/quiz-button.component' 
import { QuizEndComponent } from './quiz-end/quiz-end.component' 
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SheetsDataService, Word } from '../sheets-data.service';


export type QuizState = 'settings' | 'game' | 'end';

@Component({
  standalone:true,
  imports: [CommonModule, QuizMenuComponent, QuizButtonComponent,QuizEndComponent],
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent extends AreaBase implements OnDestroy  {



  public time = 100;
  public title="";
  public chooseCategories="";
  public loading = true;
  public quizList:{ [key: string]: Word[]; }={};
  public displayQuestion: (QuizObject) => string;
  public categories: Category[]= [];
  public numberOfQuestions = 3;

  protected anwsers:QuizAnwser[]=[];
  protected correct:QuizObject[] = [];
  protected wrongAnwser:QuizObject = null;  
  protected correctAnwser:QuizObject = null;  
  protected timeLeft = this.time;
  protected quizData:QuizObject[] = [];
  protected gameState:QuizState='settings';
  protected questions:QuizObject[] = [];
  protected question:QuizObject;
  protected sourceLanguage='';
  protected targetLanguage='';

  private direction = true;
  private  language = '';
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
  private sheetsDataService: SheetsDataService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    this.route.queryParams.subscribe(params => 
    this.language = params['language']);
    if(this.language==='eng_slo'){
      this.sourceLanguage='en';
      this.targetLanguage='slo';   
       this.title="Learning slovenian";
        this.chooseCategories="Choose categories";
        this.displayQuestion = (question) => {
          if(this.direction) {
            return  "what does "+question.question+" mean?";
          } else {
            return "Kaj pomeni "+question.question+"?";
          }        
          };           
    } else if(this.language==='eng_it') {
      this.sourceLanguage='en';
      this.targetLanguage='it';    
      this.title="Learning Italian";
      this.chooseCategories="Choose categories";
      this.displayQuestion = (question) => {
        if(this.direction) {
          return "what does "+question.question+" mean?";
        } else {
          return "Cosa significa "+question.question+"?";
        }        
        };
    }

    this.quizList = await this.sheetsDataService.loadData(this.language);
    this.categories = [];
    Object.keys(this.quizList).forEach(key=>{
      this.categories.push({category:key,selected:false});
    });
    this.loading=false;
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
          let q:QuizObject;
          if(this.direction) {
            q={categoy:con.category, anwser:c.sourceLanguage,question:c.targetLanguage};
          } else {
            q={categoy:con.category, anwser:c.targetLanguage,question:c.sourceLanguage};
          }
          this.quizData.push(q);
        }
      }
    }
  }



}
