import { Component, ViewChild } from '@angular/core';
import { AreaBase } from '../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardEditDialogComponent } from './card-edit-dialog/card-edit-dialog.component';
import { Card, SheetsCardsService } from '../sheets-cards.service';
import { CardsTabeleComponent } from './cards-tabele/cards-tabele.component';
import { CardsListComponent } from './cards-list/cards-list.component';

@Component({
  selector: 'app-cards-editor',
  standalone: true,
  imports: [CommonModule, FormsModule,CardEditDialogComponent,CardsTabeleComponent,CardsListComponent],
  templateUrl: './cards-editor.component.html',
  styleUrl: './cards-editor.component.css'
})
export class CardsEditorComponent extends AreaBase {

  protected loading = true;

  protected row = -1;

  protected index = -1;

  protected displayTabele=false;

  public cards: { [key: string]: Card[]; } = {};


  protected sheetName='genes';

  @ViewChild('cardEditDialogComponent') public cardEditDialogComponent!: CardEditDialogComponent;

  constructor(
  private sheetsCardsService: SheetsCardsService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    this.cards[this.sheetName] = await this.sheetsCardsService.loadCards(this.sheetName);
    this.loading=false;
  }

  public addCard() {
    this.cardEditDialogComponent.name='';
    this.cardEditDialogComponent.description='';
    this.cardEditDialogComponent.count=1;

    this.cardEditDialogComponent.image=null;
    this.cardEditDialogComponent.image_name='';
    this.cardEditDialogComponent.show();

    this.row=-1;
  }

  public editCard = (card:Card) => {
    this.cardEditDialogComponent.name=card.name;
    this.cardEditDialogComponent.description=card.description;
    this.cardEditDialogComponent.count=card.count;
    this.cardEditDialogComponent.image=card.image;
    this.cardEditDialogComponent.image_name=card.image_name;
    this.row=card.row;
    this.index= this.cards[this.sheetName].indexOf(card)
    this.cardEditDialogComponent.show();
  }

  public deleteCard = (card:Card) => {
    let index= this.cards[this.sheetName].indexOf(card);
    this.cards[this.sheetName].splice(index,1);
    this.sheetsCardsService.appendCard(card.name, card.description,card.count,card.row,true,this.sheetName);

  }

  protected onSubmitCard = (name:string,description:string,count:number) => {
      this.sheetsCardsService.appendCard(name, description,count,this.row,false,this.sheetName);
      if(this.row === -1) {
        let totalLength = 0;
        this.cards[this.sheetName].push({name:name,
          description:description,row:totalLength+2,count:count,image_name:name.replace(' ','_')+'.jpg',image:''});
      } else {
        this.cards[this.sheetName][this.index].name=name;
        this.cards[this.sheetName][this.index].description=description;
        this.cards[this.sheetName][this.index].count=count;
      }
  }

  protected changeView():void {
    this.displayTabele=!this.displayTabele;
  }

  protected async changeSheet(sheetName:string):Promise<void> {
    this.sheetName=sheetName;
    this.loading=true;

    if(!Object.keys(this.cards).includes(sheetName)) {
      this.cards[this.sheetName] = await this.sheetsCardsService.loadCards(this.sheetName);
    } 
    this.loading=false;
  }

}
