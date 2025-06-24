import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface Card {
  name: string;
  description: string;
  count:number;
  image_name:string;
  protein:number;
  row:number;
  image:string;  
}

export interface PostCard {
  name: string;
  description: string;
  count:number;
  protein:number;
  row:number;
  deleteRow:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsCardsService {
 error: string | null = null;
  private readonly http = inject(HttpClient);

  private urlCards = 'https://script.google.com/macros/s/AKfycbwZqxYI9pUiot1HFsyFTjGl-dTlK_fllTGIfW7fsD9ZapFTU9aK47uZe1cEwt3B8QoCwg/exec';
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


  public appendCard(name:string,description:string,count:number,protein:number,row:number,deleteRow:boolean,sheetName:string) {
      const data:PostCard = {name:name,description:description,protein:protein,count:count,row:row,deleteRow:deleteRow};
      const scriptURL = `${this.urlCards}?sheetName=${sheetName}`;
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded' });
      this.http.post<PostCard>(scriptURL, { values: data }, { headers }).subscribe({
        next: (response) => {
          console.log('Data written successfully:', response);
        },
        error: (error) => {
          console.error('Error writing data:', error);
        }
      });
  }
  
}
