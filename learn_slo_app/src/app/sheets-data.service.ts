import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

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
  sheetName = 'slo';
  private apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/'; // Base URL

  constructor() {
  }

  fetchSheetData(): Observable<Word[]> {
    const url = `${this.apiUrl}${this.sheetId}/values/${this.sheetName}!A2:C?key=${this.apiKey}`;

    return this.http.get<SheetData>(url).pipe(
      map((data) => { // Use map operator to transform data
        if (data.values && data.values.length > 0) {
          return data.values.map(d => ({ slo: d[0], eng: d[1], category: d[2] })); // Convert data to Word[]
        } else {
          throw new Error("No data found in the spreadsheet."); // Throw an error for handling
        }
      }),
      catchError(error => of([])) // Handle errors by returning an empty observable
    );
  }

}
