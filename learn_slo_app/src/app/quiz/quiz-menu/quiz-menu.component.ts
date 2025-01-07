import { Component,EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from '../../game-util';
import { FormsModule } from '@angular/forms';
@Component({
  standalone:true,
  imports: [FormsModule],
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.css']
})
export class QuizMenuComponent {

  @Input()
  public title:string;

  @Input()
  public chooseCategories?:string;

  @Input()
  public categories: Category[]=[];
  @Output() categoriesChange = new EventEmitter<Category[]>();

  @Input() startGame:() => void;

  @Input()
  public numberOfQuestions =3;
  @Output() protected numberOfQuestionsChange = new EventEmitter<number>();

  @Input()
  public time =100;
  @Output() protected timeChange = new EventEmitter<number>();

  constructor(private location: Location) {
  }

  protected toHome():void {
    this.location.back();
  }  

  protected disableStart():boolean{
    return this.categories.length > 1 && this.categories.filter(c =>c.selected).length===0;
  }

  protected continentsValueChange():void{
    this.categoriesChange.emit(this.categories);
  }

  protected plusNumberOfQuestions(){
    if(this.numberOfQuestions<5){
      this.numberOfQuestions+=1;
      this.numberOfQuestionsChange.emit(this.numberOfQuestions);
    }
  }

  protected minusNumberOfQuestions(){
    if(this.numberOfQuestions>2){
      this.numberOfQuestions-=1;
      this.numberOfQuestionsChange.emit(this.numberOfQuestions);
    }
  }

  protected plusTime(){
      this.time+=10;
      this.timeChange.emit(this.time);
  }

  protected minusTime(){
    if(this.time>10){
      this.time-=10;
      this.timeChange.emit(this.time);
    }
  }


}
