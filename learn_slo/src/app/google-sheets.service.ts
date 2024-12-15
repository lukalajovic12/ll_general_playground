import { Injectable } from '@angular/core';

export var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private API_KEY = '<YOUR_API_KEY>'; // Replace with your Google API Key
  private CLIENT_ID = '<YOUR_CLIENT_ID>'; // Replace with your Client ID
  private DISCOVERY_DOC = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
  private SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  constructor() {}

  initClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOC,
            scope: this.SCOPES,
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  signIn(): Promise<void> {
    return gapi.auth2.getAuthInstance().signIn();
  }

  signOut(): void {
    gapi.auth2.getAuthInstance().signOut();
  }

  getSpreadsheetData(spreadsheetId: string, range: string): Promise<any> {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
  }
}