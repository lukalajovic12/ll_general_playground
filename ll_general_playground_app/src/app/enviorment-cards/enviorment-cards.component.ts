import { Component } from '@angular/core';

@Component({
  selector: 'app-enviorment-cards',
  standalone: true,
  imports: [],
  templateUrl: './enviorment-cards.component.html',
  styleUrl: './enviorment-cards.component.css'
})
export class EnviormentCardsComponent {
    // Replace with your actual web app URL
  fileName = 'arctic_ocean';
  imageUrl = `https://script.google.com/macros/s/AKfycbzILvTSi0jsMZWymCVj1D9IeMSkpB_M4_xcrX1dp3n1rE-2jCur5rDg8DC87ZVK7jAs/exec?name=${encodeURIComponent(this.fileName)}`;}
