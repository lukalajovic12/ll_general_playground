import { Component, OnInit } from '@angular/core';
import { SheetsWordsService, Word } from '../sheets-words.service';
import { ActivatedRoute } from '@angular/router';
import { Category, languages, QuizObject } from '../game-util';
import { QuizComponent } from '../quiz/quiz.component';
import { Sentence, SheetsSentencesService } from '../sheets-sentences.service';

@Component({
  selector: 'app-quiz-sentences',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './quiz-sentences.component.html',
  styleUrl: './quiz-sentences.component.css'
})
export class QuizSentencesComponent implements OnInit {

  public categories: Category[] = [];
  public sourceLanguage = '';
  public targetLanguage = '';

  public quizList: { [key: string]: QuizObject[]; } = {};

  private language = '';

  constructor(private route: ActivatedRoute,
    private sheetsSentencesService: SheetsSentencesService) {
    this.route.queryParams.subscribe(params =>
      this.language = params['language']);

    this.sourceLanguage = languages[this.language][0];
    this.targetLanguage = languages[this.language][1];




  }

  async ngOnInit(): Promise<void> {
    let wordsList: Sentence[] = await this.sheetsSentencesService.fetchSheetSentences(this.language);
    this.quizList = {};
    this.categories = [];

    wordsList.forEach(w => {
      if (!this.quizList[w.category]) {
        this.quizList[w.category] = [{ question: w.sentence, anwser: w.targetLanguage }];
        this.categories.push({ category: w.category, selected: false });
      } else {
        this.quizList[w.category].push({ question: w.sentence, anwser: w.targetLanguage });
      }
    });
  }
}
