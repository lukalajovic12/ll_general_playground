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
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})
export class CardsListComponent {
  @Input() public cards: Card[] = [];
  @Input() public editCard: (card: Card) => void;
  @Input() public deleteCard: (card: Card) => void;
  @Input() public hideCard: (card: Card) => void;
  @Input() public sheetName = '';
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  public widthCard: number = 200;
  public heightCard: number = 235;

  public roundCorners = false;

  protected showAll = true;
  protected columns = 3;

  protected rows = 3;

  protected showCount = true;

  protected showOptions = false;

  protected page = 0;


  protected  showPages():boolean {
    return Math.floor(this.count() / (this.columns * this.rows)) >=1;
  } 

  protected plus1() {
    if (this.page+1 <= Math.floor(this.count() / (this.columns * this.rows))) {
      this.page++;
    } else {
      this.page = 0; // Reset to the first page if it exceeds the count
    }
  }

  protected minus1() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = Math.floor(this.count() / (this.columns * this.rows)); // Set to the last page if already at the first page
    }
  }

  private count(): number {
    let count = 0;
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      count += this.showCount ? card.count : 1;
    }
    return count;
  }

  protected displayList(): Card[] {
    let displayCards: Card[] = [];
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      if (this.showCount) {
        for (let j = 0; j < card.count; j++) {
          displayCards.push(card);
        }
      } else {
        displayCards.push(card);
      }
    }
    return displayCards.slice(this.page * this.columns * this.rows, (this.page + 1) * this.columns * this.rows);
  }


  public async exportAsPDF() {
    this.showOptions = false;
    this.page = 0;
    await this.delay(1000);
    const imgWidth = 208;
    let pdf = new jsPDF('p', 'mm', 'a4');
    const element = document.getElementById('pdf-content');
    await this.delay(1000);

    const totalPages = Math.ceil(this.count() / (this.columns * this.rows));
    for (let i = 0; i < totalPages; i++) {
      this.page = i;
      // Wait for Angular to update the view
      await this.delay(500);
      const canvas = await html2canvas(element!, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#fff'
      });
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      if (i < totalPages - 1) {
        pdf.addPage();
      }
    }
    await this.delay(500);
    pdf.save(this.sheetName+'.pdf');
  }

  protected cardCount(card: Card): number[] {
    let num: number[] = [];
    const count = this.showCount ? card.count : 1;
    for (let i = 0; i < count; i++) {
      num.push(i);
    }
    return num;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
