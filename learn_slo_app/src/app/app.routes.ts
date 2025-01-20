import { Routes } from '@angular/router';
import { SheetsDataTableComponent } from './sheets-data-table/sheets-data-table.component';
import  { HomeComponent } from './home/home.component'
import { SloQuizComponent } from './quiz/slo-quiz/slo-quiz.component';
import { ItQuizComponent } from './quiz/it-quiz/it-quiz.component';
import { NewWordsComponent } from './new-words/new-words.component'
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { WordsGeneratorComponent } from './words-generator/words-generator.component'

export const APP_ROUTES: Routes = [
  {path:'data',component:SheetsDataTableComponent},
  {path: '', component:HomeComponent}, 
  {path: 'slo', component:SloQuizComponent}, 
  {path: 'it', component:ItQuizComponent}, 
  {path: 'new-words', component:NewWordsComponent}, 
  {path: 'menu', component:LanguageMenuComponent},
  {path:'generator',component:WordsGeneratorComponent}  
];

