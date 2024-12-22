import { Routes } from '@angular/router';
import { SheetsDataTableComponent } from './sheets-data-table/sheets-data-table.component';
import { GeoQuizComponent } from './quiz/geo-quiz/geo-quiz.component';
import { SloQuizComponent } from './quiz/slo-quiz/slo-quiz.component';
export const APP_ROUTES: Routes = [
  {path:'data',component:SheetsDataTableComponent},
  {path: 'geo-quiz', component:GeoQuizComponent}, 
  {path: '', component:SloQuizComponent}, 
];

