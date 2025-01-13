import { Component,OnInit } from '@angular/core';
import {Category, QuizObject } from '../../game-util';
import { QuizComponent } from '../quiz.component'
import { SheetsDataService,Word } from '../../sheets-data.service';

@Component({
  selector: 'app-slo-quiz',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './slo-quiz.component.html',
  styleUrl: './slo-quiz.component.css'
})
export class SloQuizComponent implements OnInit {

  public words:{ [key: string]: Word[]; }={};
  public title="Učimo se slovensko";
  public chooseCategories="Izberi kategorije";

  public categories: Category[]= [];

  public displayQuestion: (QuizObject) => string = (question) => "Kaj pomeni "+question.question+" ?";
  
  constructor(private sheetsDataService: SheetsDataService) {}

  async ngOnInit(): Promise<void> {
      this.words = await this.sheetsDataService.loadData('slo');
      this.categories = [];
      Object.keys(this.words).forEach(key=>{
        this.categories.push({category:key,selected:false});
      });
  }
    
}