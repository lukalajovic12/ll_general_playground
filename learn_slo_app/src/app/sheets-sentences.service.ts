import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface PostSentence {
  sourceLanguage: string;
  targetLanguage: string;
  sentence:string
  category: string;
  row:number;
  deleteRow:boolean;
}

export interface Sentence {
  sourceLanguage: string;
  targetLanguage: string;
  //sentence is in target language
  sentence:string;
  category: string;
  row:number;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsSentencesService {
  error: string | null = null;
  private readonly http = inject(HttpClient);

   private urlSentence = 'https://script.google.com/macros/s/AKfycbz2_53zf3PHk4zycrMbqPYljo4mf_Ng5jsrA8FOwJDJgIOCpl4bCWalUp1apzJ7LWqXWw/exec';


  constructor() {
  }


async fetchSheetSentences(sheetName:string): Promise<Sentence[]> {

  const scriptURL = `${this.urlSentence}?sheetName=${sheetName}`;
    try {
        const sheetData = await lastValueFrom(this.http.get<Sentence[]>(scriptURL));
        if (sheetData) {

          for(let i=0;i<sheetData.length;i++){
            sheetData[i].row=i+2;
          }

            return sheetData;
        } else {
            console.warn('No data received or empty values array.');
            return []; // Return an empty array to avoid errors
        }
    } catch (error) {
        console.error('Error fetching words:', error);
        return []; // Important: Return an empty array in case of error
    }
}

public async loadSentences(sheetName:string): Promise<{ [key: string]: Sentence[]; }> {
  let sentencesList = await this.fetchSheetSentences(sheetName);
  let sentences:{ [key: string]: Sentence[]; }={};
  let cc:string[] = [];
  sentencesList.forEach(s=>{
    if (!sentences[s.category]) {
      sentences[s.category] = [s];
      cc.push(s.category);
    } else {
      sentences[s.category].push(s);
    }
  });
  return sentences;
}

  public appendSentence(textToTranslate:string,translatedText:string,sentence:string,category:string,row:number,sheetName:string,deleteRow:boolean) {
    const data:PostSentence = {sourceLanguage:textToTranslate,targetLanguage:translatedText,sentence:sentence,category:category,row:row,deleteRow:deleteRow};
    const scriptURL = `${this.urlSentence}?sheetName=${sheetName}`;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/x-www-form-urlencoded' });
    this.http.post<PostSentence>(scriptURL, { values: data }, { headers }).subscribe({
      next: (response) => {
        console.log('Data written successfully:', response);
      },
      error: (error) => {
        console.error('Error writing data:', error);
      }
    });
}
}
