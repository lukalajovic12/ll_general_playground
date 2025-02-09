import { Routes } from '@angular/router';
import { SheetsDataTableComponent } from './sheets-data-table/sheets-data-table.component';
import  { HomeComponent } from './home/home.component'
import { QuizComponent } from './quiz/quiz.component';
import { NewWordsComponent } from './new-words/new-words.component'
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { ImageGeneratorComponent } from './image-generator/image-generator.component';

export const APP_ROUTES: Routes = [
  { path: 'data',component:SheetsDataTableComponent},
  { path: '', component:HomeComponent}, 
  { path: 'quiz', component:QuizComponent}, 
  { path: 'new-words', component:NewWordsComponent}, 
  { path: 'menu', component:LanguageMenuComponent},
  { path: 'image-generator', component:ImageGeneratorComponent},
];

