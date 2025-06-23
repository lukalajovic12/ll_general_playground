import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Card } from '../../sheets-cards.service';
import { CardComponent } from './card/card.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardComponent,CommonModule, FormsModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})
export class CardsListComponent {
  @Input() public cards: Card[] = [];
  @Input() public editCard: (card: Card) => void;
  @Input() public deleteCard: (card: Card) => void;
  @Input() public sheetName = '';
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  protected rows = 3;

  protected showOptions = true

  protected async exportPdf(): Promise<void> {
    this.showOptions = false;
    await this.delay(1000)
    const DATA = await this.pdfContent.nativeElement;
    html2canvas(DATA).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 10;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('exported-content.pdf');
    });
    this.showOptions = true;
  }


  protected cardCount(card:Card):number[] {
    let num:number[]  =[];
    for(let i=0;i<card.count;i++) {
      num.push(i);
    }
    return num;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
