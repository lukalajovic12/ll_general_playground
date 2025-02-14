import { Injectable, inject } from '@angular/core';
import { GoogleGenerativeAI  } from '@google/generative-ai';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';
import { translate } from './game-util';

export interface GeneratedWord {
  sourceLanguage: string;
  targetLanguage: string;
}

interface GeminiKey {
  geminiApi: string;
}


@Injectable({
  providedIn: 'root'
})
export class GeminiWordGeneratorService {


 private url = 'https://script.google.com/macros/s/AKfycbyvNbZMdaZLe_1QgTwlCIp9nAOo_eZVX1OCYfFOKr2yJIivSDQxNupLEEuLEMa_oczgDg/exec';



  private geminiApiKey = '';

  private readonly http = inject(HttpClient);

  constructor() { }


  public async fetchSheetKey(): Promise<void> {

  const scriptURL = `${this.url}`;
    try {
        const geminiKey = await lastValueFrom(this.http.get<GeminiKey>(scriptURL));
        if (geminiKey) {
          this.geminiApiKey=geminiKey.geminiApi;
        } else {
            console.warn('No data received or empty values array.');
            this.geminiApiKey='';
        }
    } catch (error) {
        console.error('Error fetching words:', error);
        this.geminiApiKey='';
    }
}

  public async generateWords(prefixPrompt:string,prompt:string,sourceLanguage:string,targetLanguage:string):Promise<GeneratedWord[]> {
    await this.fetchSheetKey();
    const genAI = new GoogleGenerativeAI(this.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prefixPrompt+' '+prompt+' seperated by commas without spaces in between.');
    const generatedText = result.response.text();

    const words:string[] = generatedText.split(',').filter(word => word.trim() !== '');
    let generatedWords:GeneratedWord[] = [];

    for(let s of words) {
      let t = await translate(sourceLanguage,targetLanguage,s,this.http);
      let w:GeneratedWord ={sourceLanguage:s, targetLanguage:t};
      generatedWords.push(w);
    }
    return generatedWords;
  }



  public async generateSVG(prompt:string):Promise<string> {
    await this.fetchSheetKey();
    const genAI = new GoogleGenerativeAI(this.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent('generate an SVG containing '+prompt+'. your response must only contain an SVG');
    const generatedSVG = result.response.text();
    return generatedSVG;
  }

}
