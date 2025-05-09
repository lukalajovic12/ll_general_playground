import { Component,Input } from '@angular/core';
import { Card } from '../../sheets-cards.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-cards-tabele',
  standalone: true,
  imports: [],
  templateUrl: './cards-tabele.component.html',
  styleUrl: './cards-tabele.component.css'
})
export class CardsTabeleComponent {

    @Input() public cards:Card[]=[];
    @Input() public editCard:(card:Card) => void;
    @Input() public deleteCard:(card:Card) => void;
    @Input() public sheetName='';

    constructor(private sanitizer: DomSanitizer) {}  

    protected displaySafeSvg(card:Card): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(card.svg);
    }

}
