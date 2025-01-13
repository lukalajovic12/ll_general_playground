import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface Word {
  sourceLanguage: string;
  targetLanguage: string;
  category: string;
  row:number;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsDataService {

  error: string | null = null;
  private readonly http = inject(HttpClient);

  private url = 'https://script.google.com/macros/s/AKfycbxTIkrHazw84Nz659FSwJNYaTDTvPQboHkdzQhUmZ5PPTxFEYoQxdZs_oS8dcAVd1qr/exec';


  constructor() {
  }

  async fetchSheetData(sheetName:string): Promise<Word[]> {

  const scriptURL = `${this.url}?sheetName=${sheetName}`;
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



public async loadData(sheetName:string): Promise<{ [key: string]: Word[]; }> {
  let wordsList = await this.fetchSheetData(sheetName);
  let words:{ [key: string]: Word[]; }={};
  let cc:string[] = [];
  wordsList.forEach((w,index)=>{
    if (!words[w.category]) {
      words[w.category] = [ w];
      cc.push(w.category);
    } else {
      words[w.category].push(w);
    }
  });
  return words;
}


  public appendWord(textToTranslate:string,translatedText:string,category:string,row:number,sheetName:string) {
      const data:Word = {sourceLanguage:textToTranslate,targetLanguage:translatedText,category:category,row:row};
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
