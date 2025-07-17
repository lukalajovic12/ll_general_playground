import { Component } from '@angular/core';

@Component({
  selector: 'app-barkhadi-table',
  templateUrl: './barkhadi-table.component.html',
  styleUrls: ['./barkhadi-table.component.css']
})
export class BarkhadiTableComponent {
  swars: string[] = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'];

  // Nepali consonants and their vowel forms
  vyanjans = [
    { base: 'क', forms: ['क', 'का', 'कि', 'की', 'कु', 'कू', 'कृ', 'के', 'कै', 'को', 'कौ', 'कं', 'कः'] },
    { base: 'ख', forms: ['ख', 'खा', 'खि', 'खी', 'खु', 'खू', 'खृ', 'खे', 'खै', 'खो', 'खौ', 'खं', 'खः'] },
    { base: 'ग', forms: ['ग', 'गा', 'गि', 'गी', 'गु', 'गू', 'गृ', 'गे', 'गै', 'गो', 'गौ', 'गं', 'गः'] },
    { base: 'घ', forms: ['घ', 'घा', 'घि', 'घी', 'घु', 'घू', 'घृ', 'घे', 'घै', 'घो', 'घौ', 'घं', 'घः'] },
    { base: 'ङ', forms: ['ङ', 'ङा', 'ङि', 'ङी', 'ङु', 'ङू', 'ङृ', 'ङे', 'ङै', 'ङो', 'ङौ', 'ङं', 'ङः'] },
    { base: 'च', forms: ['च', 'चा', 'चि', 'ची', 'चु', 'चू', 'चृ', 'चे', 'चै', 'चो', 'चौ', 'चं', 'चः'] },
    // Add more as needed...
  ];
}
