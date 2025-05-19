import { Component,Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {;
  @Input() name!: string;
  @Input() description!: string;
  @Input() protein!: number;
  @Input() public sheetName='';
  constructor(private sanitizer: DomSanitizer) {}
  

}
