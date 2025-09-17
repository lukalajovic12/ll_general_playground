import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface EnviormentalCard {
  name: string;
  description: string;
  image_name:string;
  image:string;
  heat:number;
  cold:number;
  capacity:number;
  water:number;
  mountain:number;
  forest:number;
  dark:number;
}

@Injectable({
  providedIn: 'root'
})
export class SheetsEnviormentCardsService {
 error: string | null = null;
  private readonly http = inject(HttpClient);

  private urlCards = 'https://script.google.com/macros/s/AKfycbxqNuO8yRz-bz8TYkkHFRNWnF-NTDP8L4-NqJWrTSJherXJLVERSq-4eLmvyzu5Muw0/exec';
  constructor() {
  }

  public async loadCards(): Promise<EnviormentalCard[]> {
    try {
        const sheetData = await lastValueFrom(this.http.get<EnviormentalCard[]>(this.urlCards));
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




}
