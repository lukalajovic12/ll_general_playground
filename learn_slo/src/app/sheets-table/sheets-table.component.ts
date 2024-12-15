import { Component, OnInit } from '@angular/core';
import { GoogleSheetsService, gapi } from '../google-sheets.service';

@Component({
  selector: 'app-sheets-table',
  standalone:true,
  imports:[],
  templateUrl: './sheets-table.component.html',
  styleUrls: ['./sheets-table.component.css']
})
export class SheetsTableComponent implements OnInit {
  data: string[][] = [];
  isAuthenticated = false;

  constructor(private googleSheetsService: GoogleSheetsService) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.googleSheetsService.initClient();
      this.isAuthenticated = gapi.auth2.getAuthInstance().isSignedIn.get();
    } catch (error) {
      console.error('Error initializing Google API client', error);
    }
  }

  async signIn(): Promise<void> {
    try {
      await this.googleSheetsService.signIn();
      this.isAuthenticated = true;
      await this.fetchData();
    } catch (error) {
      console.error('Error signing in', error);
    }
  }

  async signOut(): Promise<void> {
    this.googleSheetsService.signOut();
    this.isAuthenticated = false;
    this.data = [];
  }

  async fetchData(): Promise<void> {
    const spreadsheetId = '<YOUR_SPREADSHEET_ID>'; // Replace with your Spreadsheet ID
    const range = 'Sheet1!A1:C'; // Replace with your desired range

    try {
      const response = await this.googleSheetsService.getSpreadsheetData(spreadsheetId, range);
      this.data = response.result.values;
    } catch (error) {
      console.error('Error fetching spreadsheet data', error);
    }
  }
}