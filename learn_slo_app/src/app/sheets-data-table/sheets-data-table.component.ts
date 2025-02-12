import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word, SheetsDataService } from '../sheets-data.service';


@Component({
  selector: 'app-sheets-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sheets-data-table.component.html',
  styleUrl: './sheets-data-table.component.css'
})
export class SheetsDataTableComponent implements OnInit {

  tableData: Word[] = [];

  constructor(protected sheetsDataService:SheetsDataService) {
  }

  async ngOnInit(): Promise<void> {
     this.tableData = await this.sheetsDataService.fetchSheetData('eng_it');
  }
}
