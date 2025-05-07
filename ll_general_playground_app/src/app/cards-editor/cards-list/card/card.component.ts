import { Component,Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private _svg: string = '';
  safeSvg!: SafeHtml;
  @Input() name!: string;
  @Input() description!: string;
  @Input() protein!: number;

  constructor(private sanitizer: DomSanitizer) {}
  
  @Input() set svg(value: string) {
    this._svg = value;
    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
