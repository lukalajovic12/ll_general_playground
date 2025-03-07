import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface Word {
  sourceLanguage: string;
  targetLanguage: string;
  category: string;
  row:number;
}

export interface PostWord {
  sourceLanguage: string;
  targetLanguage: string;
  category: string;
  row:number;
  deleteRow:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsWordsService {

  error: string | null = null;
  private readonly http = inject(HttpClient);

  private urlWord = 'https://script.google.com/macros/s/AKfycbyuLr-LjnEPEcqqapiVEBE9lZJ3b7xmYrtO29FplPWFPlBev21zwDLNLxBuiSZ_E-b6/exec';

  constructor() {
  }

  async fetchSheetWords(sheetName:string): Promise<Word[]> {

  const scriptURL = `${this.urlWord}?sheetName=${sheetName}`;
    try {
        const sheetData = await lastValueFrom(this.http.get<Word[]>(scriptURL));
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


public async loadWords(sheetName:string): Promise<{ [key: string]: Word[]; }> {
  let wordsList = await this.fetchSheetWords(sheetName);
  let words:{ [key: string]: Word[]; }={};
  let cc:string[] = [];
  wordsList.forEach(w=>{
    if (!words[w.category]) {
      words[w.category] = [w];
      cc.push(w.category);
    } else {
      words[w.category].push(w);
    }
  });
  return words;
}

//for testing purpuses
public async loadData2(sheetName:string): Promise<{ [key: string]: Word[]; }> {
  let wordsList = [
    {sourceLanguage: 'a',targetLanguage: 'A',category: 'a',row:1},
    {sourceLanguage: 'b',targetLanguage: 'B',category: 'a',row:2},
    {sourceLanguage: 'c',targetLanguage: 'C',category: 'a',row:3},
    {sourceLanguage: 'd',targetLanguage: 'D',category: 'a',row:4},
    {sourceLanguage: 'e',targetLanguage: 'E',category: 'a',row:5},
    {sourceLanguage: 'f',targetLanguage: 'F',category: 'a',row:6},
    {sourceLanguage: 'g',targetLanguage: 'G',category: 'a',row:7},
    {sourceLanguage: 'h',targetLanguage: 'H',category: 'a',row:8},
    {sourceLanguage: 'i',targetLanguage: 'I',category: 'a',row:9},
    {sourceLanguage: 'j',targetLanguage: 'J',category: 'a',row:10},
    {sourceLanguage: 'k',targetLanguage: 'K',category: 'a',row:11},
  ];
  let words:{ [key: string]: Word[]; }={};
  let cc:string[] = [];
  wordsList.forEach((w)=>{
    if (!words[w.category]) {
      words[w.category] = [w];
      cc.push(w.category);
    } else {
      words[w.category].push(w);
    }
  });
  return words;
}


  public appendWord(textToTranslate:string,translatedText:string,category:string,row:number,sheetName:string,deleteRow:boolean) {
      const data:PostWord = {sourceLanguage:textToTranslate,targetLanguage:translatedText,category:category,row:row,deleteRow:deleteRow};
      const scriptURL = `${this.urlWord}?sheetName=${sheetName}`;
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded' });
      this.http.post<PostWord>(scriptURL, { values: data }, { headers }).subscribe({
        next: (response) => {
          console.log('Data written successfully:', response);
        },
        error: (error) => {
          console.error('Error writing data:', error);
        }
      });
  }

}
