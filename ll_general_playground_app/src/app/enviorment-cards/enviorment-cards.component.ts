import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { EnviormentalCard, SheetsEnviormentCardsService } from '../sheets-enviorment-cards.service';

@Component({
  selector: 'app-enviorment-cards',
  standalone: true,
  imports: [],
  templateUrl: './enviorment-cards.component.html',
  styleUrl: './enviorment-cards.component.css'
})
export class EnviormentCardsComponent extends AreaBase{
   protected loading = true;
 
   public cards:EnviormentalCard[]=[];

 
   constructor(
   private sheetsEnviormentCardsService: SheetsEnviormentCardsService) {
   super();
   }
 
   override async ngOnInit(): Promise<void> {
     super.ngOnInit();
     this.loading=true;
     this.cards = await this.sheetsEnviormentCardsService.loadCards();
     this.loading=false;
   }

   }