import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface EnviormentalCard {
  name: string;
  description: string;
  protein:number;
  row:number;
}



@Injectable({
  providedIn: 'root'
})
export class SheetsEnviormentCardsService {
 error: string | null = null;
  private readonly http = inject(HttpClient);

  private urlCards = '';
  constructor() {
  }

  public async loadCards(sheetName:string): Promise<Card[]> {
    const scriptURL = `${this.urlCards}?sheetName=${sheetName}`;
    try {
        const sheetData = await lastValueFrom(this.http.get<Card[]>(scriptURL));
        if (sheetData) {
          for(let i=0;i<sheetData.length;i++) {
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



}
