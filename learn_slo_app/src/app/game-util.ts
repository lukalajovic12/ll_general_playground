


  export type GameDisplayState = 'game' | 'menu' | 'data' | 'empty' | 'end';

 
  export interface QuizObject {
    question: string,
    anwser: string,
    categoy: string
  }
  
  export interface Category {
    category: string,
    selected:boolean
  }

  export interface QuizAnwser {
    correct: QuizObject,
    anwsered:QuizObject
  }