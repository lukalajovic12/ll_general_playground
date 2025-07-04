import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Card } from '../../sheets-cards.service';
import { CardComponent } from './card/card.component';
import html2canvas from 'html2canvas';
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

  public widthCard: number = 150;  
  public heightCard: number = 230;

  public roundCorners = false;

  protected showAll = true;
  protected columns = 3;

  protected rows = 3;

  protected showCount = false;

  protected showOptions = true;

  protected page = 0;

  protected plus1(){
    if (this.page * this.columns * this.rows < this.count()-1) {
        this.page++;
    } else {
      this.page = 0; // Reset to the first page if it exceeds the count
    }
  }

  protected minus1(){
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = Math.floor(this.count() / (this.columns * this.rows)); // Set to the last page if already at the first page
    }
  }

  private count():number {
    let count = 0;
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      count+= this.showCount ? card.count : 1;
    }
    return count;
  }

  protected displayList():Card[] {
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

 
  protected async exportAsPNG() {
    this.showOptions = false;
    this.showAll = false;
    await this.delay(1000);
    const element = document.getElementById('png-content');
    if (!element) return;

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'exported-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    await this.delay(1000);
    this.showAll = true;
  }


  protected cardCount(card:Card):number[] {
    let num:number[]  =[];
    const count =this.showCount ? card.count:1;
    for(let i=0;i<count;i++) {
      num.push(i);
    }
    return num;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
