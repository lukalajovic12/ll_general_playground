import { Routes } from '@angular/router';
import  { HomeComponent } from './home/home.component'
import { QuizComponent } from './quiz/quiz.component';
import { NewWordsComponent } from './new-words/new-words.component'
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { ImageSvgGeneratorComponent } from './image-svg-generator/image-svg-generator.component';
import { ImageBasicGenerationComponent } from './image-basic-generation/image-basic-generation.component';
import { NewSentencesComponent } from './new-sentences/new-sentences.component';

export const APP_ROUTES: Routes = [
  { path: '', component:HomeComponent}, 
  { path: 'quiz', component:QuizComponent}, 
  { path: 'new-words', component:NewWordsComponent}, 
  {path:'new-sentences',component:NewSentencesComponent},
  { path: 'menu', component:LanguageMenuComponent},
  { path: 'image-svg-generator', component:ImageSvgGeneratorComponent},
  { path: 'image-basic-generator', component:ImageBasicGenerationComponent},
];



