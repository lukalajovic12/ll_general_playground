import { Component } from '@angular/core';
import { countriesList, QuizObject } from '../../game-util';
import {QuizComponent} from '../quiz.component'
@Component({
  standalone:true,
  imports: [QuizComponent],
  selector: 'app-geo-quiz',
  templateUrl: './geo-quiz.component.html',
  styleUrl: './geo-quiz.component.css'
})
export class GeoQuizComponent {

  public countries:{ [key: string]: string[][]; }={};


  public displayQuestion: (QuizObject) => string = (question) => question.question+" is the capital of?";

  constructor() {
    this.countries=countriesList;
  }

}
