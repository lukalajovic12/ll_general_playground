import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word, SheetsDataService } from '../sheets-data.service';


@Component({
  selector: 'app-sheets-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sheets-data-table.component.html',
  styleUrl: './sheets-data-table.component.css'
})
export class SheetsDataTableComponent {

  tableData: Word[] = [];

  constructor(sheetsDataService:SheetsDataService) {
    //this.tableData=sheetsDataService.fetchSheetData();
  }


}
