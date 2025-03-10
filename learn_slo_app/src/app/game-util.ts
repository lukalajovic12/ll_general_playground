
import {  HttpParams,HttpClient } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

  export type GameDisplayState = 'game' | 'menu' | 'data' | 'empty' | 'end';

 
  export interface QuizObject {
    question: string,
    anwser: string
 //   category: string
  }
  
  export interface Category {
    category: string,
    selected:boolean
  }

  export interface QuizAnwser {
    correct: QuizObject,
    anwsered:QuizObject
  }

  export const languages = {'eng_slo':['eng','sl'],'eng_it':['eng','it'],'eng_de':['eng','de'],'eng_srb':['eng','sr'],};
  export const languagesTitle = {'sl':'Learning slovenian',
     'de':'learning german',
     'it':'learning italian','sr':'learning serbian'};





  export async function translate(sourceLanguage:string,targetLanguage:string,textToTranslate:string,http:HttpClient):Promise<string> {
   
    let translatedText='';
      const url = 'https://translate.googleapis.com/translate_a/single';
      const params = new HttpParams()
        .set('client', 'gtx') // Required parameter
        .set('sl', sourceLanguage)
        .set('tl', targetLanguage)
        .set('dt', 't') // Data type: text
        .set('q', textToTranslate); // The text to translate

      let response = await lastValueFrom(http.get(url, { params, responseType: 'text' }));
      const parsedResponse = JSON.parse(response as string);
      if (parsedResponse && parsedResponse[0] && parsedResponse[0][0] && parsedResponse[0][0][0]) {
        translatedText = parsedResponse[0][0][0];
      } 
      return translatedText;
  } 