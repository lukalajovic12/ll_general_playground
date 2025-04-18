import { Routes } from '@angular/router';
import  { HomeComponent } from './home/home.component'
import { NewWordsComponent } from './new-words/new-words.component'
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { ImageSvgGeneratorComponent } from './image-svg-generator/image-svg-generator.component';
import { ImageBasicGenerationComponent } from './image-basic-generation/image-basic-generation.component';
import { NewSentencesComponent } from './new-sentences/new-sentences.component';
import { QuizWordsComponent } from './quiz-words/quiz-words.component';
import { QuizSentencesComponent } from './quiz-sentences/quiz-sentences.component';

export const APP_ROUTES: Routes = [
  { path: '', component:HomeComponent}, 
  { path: 'quiz-words', component:QuizWordsComponent}, 
  { path: 'new-words', component:NewWordsComponent}, 
  { path: 'quiz-sentences', component:QuizSentencesComponent}, 
  {path:'new-sentences',component:NewSentencesComponent},
  { path: 'menu', component:LanguageMenuComponent},
  { path: 'image-svg-generator', component:ImageSvgGeneratorComponent},
  { path: 'image-basic-generator', component:ImageBasicGenerationComponent},
];





