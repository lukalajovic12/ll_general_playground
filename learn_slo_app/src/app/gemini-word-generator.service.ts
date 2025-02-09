import { Injectable, inject } from '@angular/core';
import { GoogleGenerativeAI  } from '@google/generative-ai';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

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

  public async generateWords(generatorPrompt:string,generatorEnd:string,prompt:string,sourceLanguage:string,targetLanguage:string):Promise<GeneratedWord[]> {
    await this.fetchSheetKey();
    const genAI = new GoogleGenerativeAI(this.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(generatorPrompt+' '+prompt+' '+generatorEnd);
    const generatedText = result.response.text();
    const words:string[] = generatedText.split(',').filter(word => word.trim() !== '');
    let generatedWords:GeneratedWord[] = [];

    for(let s of words) {
      let t = await this.translate(sourceLanguage,targetLanguage,s);
      let w:GeneratedWord ={sourceLanguage:s, targetLanguage:t};
      generatedWords.push(w);
    }
    return generatedWords;
  }




  private async translate(sourceLanguage:string,targetLanguage:string,textToTranslate:string):Promise<string> {
      let translatedText='';
      const url = 'https://translate.googleapis.com/translate_a/single';
      const params = new HttpParams()
        .set('client', 'gtx') // Required parameter
        .set('sl', sourceLanguage)
        .set('tl', targetLanguage)
        .set('dt', 't') // Data type: text
        .set('q', textToTranslate); // The text to translate

      let response = await lastValueFrom(this.http.get(url, { params, responseType: 'text' }));

      const parsedResponse = JSON.parse(response);
      if (parsedResponse && parsedResponse[0] && parsedResponse[0][0] && parsedResponse[0][0][0]) {
        translatedText = parsedResponse[0][0][0];
      } else {
        console.error('Unexpected translation response format:', parsedResponse);
      }
      return translatedText;
  } 

  public async generateSVG(prompt:string):Promise<string> {
    await this.fetchSheetKey();

    const genAI = new GoogleGenerativeAI(this.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent('generate an SVG containing '+prompt+'. your response should only contain an SVG');
    const generatedSVG = result.response.text();
    console.log('ALFA');
    console.log(generatedSVG);
    return generatedSVG;
  }

}
