import { Component, OnInit } from '@angular/core';
import { SheetsWordsService, Word } from '../sheets-words.service';
import { ActivatedRoute } from '@angular/router';
import { Category, languages, QuizObject } from '../game-util';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-quiz-words',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './quiz-words.component.html',
  styleUrl: './quiz-words.component.css'
})
export class QuizWordsComponent implements OnInit {

  public categories: Category[] = [];
  public sourceLanguage = '';
  public targetLanguage = '';

  public quizList: { [key: string]: QuizObject[]; } = {};

  private language = '';

  constructor(private route: ActivatedRoute,
    private sheetsWordsService: SheetsWordsService) {
    this.route.queryParams.subscribe(params =>
      this.language = params['language']);

    this.sourceLanguage = languages[this.language][0];
    this.targetLanguage = languages[this.language][1];






  }

  async ngOnInit(): Promise<void> {
    let wordsList: Word[] = await this.sheetsWordsService.fetchSheetWords(this.language);
    this.quizList = {};
    this.categories = [];

    const displayQuestion: (qo: string) => string = (tl: string) => {
      if (this.sourceLanguage === 'eng') {
        return "What does " + tl + " mean?";
      } 
      if (this.sourceLanguage === 'de') {
        return "Was bedeuted " + tl + "?";
      } 


      return "";
    };

    wordsList.forEach(w => {
      if (!this.quizList[w.category]) {
        this.quizList[w.category] = [{ question: displayQuestion(w.targetLanguage), anwser: w.sourceLanguage }];
        this.categories.push({ category: w.category, selected: false });
      } else {
        this.quizList[w.category].push({ question: displayQuestion(w.targetLanguage), anwser: w.sourceLanguage });
      }
    });
  }



}
