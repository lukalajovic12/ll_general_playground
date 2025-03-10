import { Component, Input } from '@angular/core';
import { QuizAnwser, QuizObject } from '../../game-util';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  imports:[ CommonModule, FormsModule ],
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.css']
})
export class QuizEndComponent {

  @Input() anwsers: QuizAnwser[] =[];

  @Input() action: () => void;

  constructor(private location: Location) {
  }

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }  

  protected toHome():void {
    this.location.back();
  }  

}
