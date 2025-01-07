import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface Word {
  sourceLanguage: string;
  targetLanguage: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsDataService {

  error: string | null = null;
  private readonly http = inject(HttpClient);

  private url = 'https://script.google.com/macros/s/AKfycbySKwt4fZsVEzzK8O4yeaczeaKDPBgO8roJGJE2VM9Dk3jMTAHk0dkCkRVbgWqCpu0/exec';


  constructor() {
  }

  async fetchSheetData(sheetName:string): Promise<Word[]> {

  const scriptURL = `${this.url}?sheetName=${sheetName}`;
    try {
        const sheetData = await lastValueFrom(this.http.get<Word[]>(scriptURL));
        if (sheetData) {
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



public async loadData(sheetName:string): Promise<{ [key: string]: string[][]; }> {
  let wordsList = await this.fetchSheetData(sheetName);
  let words:{ [key: string]: string[][]; }={};
  let cc:string[] = [];
  wordsList.forEach(w=>{
    if (!words[w.category]) {
      words[w.category] = [ [w.sourceLanguage, w.targetLanguage ]];
      cc.push(w.category);
    } else {
      words[w.category].push([w.sourceLanguage, w.targetLanguage]);
    }
  });
  return words;
}


  public appendWord(textToTranslate:string,translatedText:string,category:string,sheetName:string) {
      const data:Word = {sourceLanguage:textToTranslate,targetLanguage:translatedText,category:category};
      const scriptURL = `${this.url}?sheetName=${sheetName}`;
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded' });
      this.http.post<Word>(scriptURL, { values: data }, { headers }).subscribe({
        next: (response) => {
          console.log('Data written successfully:', response);
        },
        error: (error) => {
          console.error('Error writing data:', error);
        }
      });
  }


}
