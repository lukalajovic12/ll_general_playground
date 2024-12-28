import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { environment } from '../environments/environment';
import { lastValueFrom } from 'rxjs';
export interface SheetData {
  range: string;
  majorDimension: string;
  values: string[][];
}

export interface Word {
  slo: string;
  eng: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsDataService {


  error: string | null = null;
  private readonly http = inject(HttpClient);
  apiKey = environment.apiKey;
  sheetId = environment.sheetId;
  private apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'; // Base URL



  constructor() {
  }

  async fetchSheetData(sheetName:string): Promise<Word[]> {
    const url = `${this.apiUrl}${this.sheetId}/values/${sheetName}!A2:C?key=${this.apiKey}`;
    try {
        const sheetData = await lastValueFrom(this.http.get<SheetData>(url));
        if (sheetData && sheetData.values && sheetData.values.length > 0) {
            return sheetData.values.map(d => ({ slo: d[0], eng: d[1], category: d[2] }));
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
      words[w.category] = [[w.slo, w.eng]];
      cc.push(w.category);
    } else {
      words[w.category].push([w.slo, w.eng]);
    }
  });
  return words;
}





}
