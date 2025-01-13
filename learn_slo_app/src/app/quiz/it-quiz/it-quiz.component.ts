import { Component, OnInit } from '@angular/core';
import {Category, QuizObject } from '../../game-util';
import { QuizComponent } from '../quiz.component'
import { SheetsDataService, Word } from '../../sheets-data.service';

@Component({
  selector: 'app-it-quiz',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './it-quiz.component.html',
  styleUrl: './it-quiz.component.css'
})
export class ItQuizComponent implements OnInit {
 public words:{ [key: string]: Word[]; }={};
  public title="Učimo se italjansko";
  public chooseCategories="izberi kategorije";

  public categories: Category[]= [];

  public displayQuestion: (QuizObject) => string = (question) => "Kaj pomeni "+question.question+" ?";
  
  constructor(public sheetsDataService: SheetsDataService) {}

  async ngOnInit(): Promise<void> {
      this.words = await this.sheetsDataService.loadData('it');
      this.categories = [];
      Object.keys(this.words).forEach(key=>{
        this.categories.push({category:key,selected:false});
      });
  }
}
