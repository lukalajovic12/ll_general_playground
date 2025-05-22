import { Routes } from '@angular/router';
import  { HomeComponent } from './home/home.component'
import { NewWordsComponent } from './new-words/new-words.component'
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { ImageSvgGeneratorComponent } from './image-svg-generator/image-svg-generator.component';
import { ImageBasicGenerationComponent } from './image-basic-generation/image-basic-generation.component';
import { NewSentencesComponent } from './new-sentences/new-sentences.component';
import { QuizWordsComponent } from './quiz-words/quiz-words.component';
import { QuizSentencesComponent } from './quiz-sentences/quiz-sentences.component';
import { NimComponent } from './nim/nim.component';
import { CardsEditorComponent } from './cards-editor/cards-editor.component';
import { PhysicsSimulationComponent } from './physics-simulation/physics-simulation.component';
import { CircleFractalComponent } from './circle-fractal/circle-fractal.component';
import { Model3dComponent } from './model3d/model3d.component';

export const APP_ROUTES: Routes = [
  { path: '', component:HomeComponent}, 
  { path: 'quiz-words', component:QuizWordsComponent}, 
  { path: 'new-words', component:NewWordsComponent}, 
  { path: 'quiz-sentences', component:QuizSentencesComponent}, 
  {path:'new-sentences',component:NewSentencesComponent},
  { path: 'menu', component:LanguageMenuComponent},
  { path: 'image-svg-generator', component:ImageSvgGeneratorComponent},
  { path: 'image-basic-generator', component:ImageBasicGenerationComponent},
  { path: 'nim', component:NimComponent},
  { path: 'cards', component:CardsEditorComponent},
  {path:'physics',component:PhysicsSimulationComponent},
  {path:'fractal',component:CircleFractalComponent},
  {path:'model3d',component:Model3dComponent},

  
];





