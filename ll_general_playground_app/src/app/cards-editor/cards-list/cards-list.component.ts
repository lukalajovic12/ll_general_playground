import { Component,Input } from '@angular/core';
import { Card } from '../../sheets-cards.service';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})
export class CardsListComponent {
    @Input() public cards:Card[]=[];
    @Input() public addCard:() => void;
    @Input() public editCard:(card:Card) => void;
    @Input() public deleteCard:(card:Card) => void;

}
