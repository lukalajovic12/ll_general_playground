import { Routes } from '@angular/router';
import { SheetsDataTableComponent } from './sheets-data-table/sheets-data-table.component';
import { SloQuizComponent } from './quiz/slo-quiz/slo-quiz.component';
import { ItQuizComponent } from './quiz/it-quiz/it-quiz.component';
export const APP_ROUTES: Routes = [
  {path:'data',component:SheetsDataTableComponent},
  {path: '', component:SloQuizComponent}, 
  {path: 'it', component:ItQuizComponent}, 
];

