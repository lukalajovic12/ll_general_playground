import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface Card {
  name: string;
  description: string;
  protein:number;
  row:number;
  count:number;
  image_name:string;
  image:string;  
}

export interface PostCard {
  name: string;
  description: string;
  protein:number;
  row:number;
  count:number;
  deleteRow:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsCardsService {
 error: string | null = null;
  private readonly http = inject(HttpClient);

  private urlCards = 'https://script.google.com/macros/s/AKfycbw2VYKV-if1FaOxj2hbviQ3GtRPvhDAH3vlnlqtFe1PGRNGmNb78JYBMbH4uxtw3OaJew/exec';
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


  public appendCard(name:string,description:string,protein:number,count:number,row:number,deleteRow:boolean,sheetName:string) {
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
