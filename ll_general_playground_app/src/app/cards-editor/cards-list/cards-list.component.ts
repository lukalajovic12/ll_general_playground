import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Card } from '../../sheets-cards.service';
import { CardComponent } from './card/card.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})
export class CardsListComponent {
  @Input() public cards: Card[] = [];
  @Input() public editCard: (card: Card) => void;
  @Input() public deleteCard: (card: Card) => void;
  @Input() public sheetName = '';
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  protected rows = 1;

  protected showOptions = true

  protected plusRows(): void {
    if (this.rows < 5) {
      this.rows += 1;
    }
  }

  protected minusRows(): void {
    if (this.rows > 1) {
      this.rows -= 1;
    }
  }

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

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
