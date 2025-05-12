import { Component, Input } from '@angular/core';
import { Card } from '../../sheets-cards.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-environment-card-list',
  standalone: true,
  imports: [],
  templateUrl: './environment-card-list.component.html',
  styleUrl: './environment-card-list.component.css'
})
export class EnvironmentCardListComponent {

  @Input() public cards: Card[] = [];

    constructor(private sanitizer: DomSanitizer) {}  

    protected displaySafeSvg(card:Card): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(card.svg);
    }

}
