import { Component, ViewChild } from '@angular/core';
import { AreaBase } from '../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
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

  public cards:Card[]=[];

  @ViewChild('cardEditDialogComponent') public cardEditDialogComponent!: CardEditDialogComponent;

  constructor(
    private location: Location,
  private sheetsCardsService: SheetsCardsService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    this.cards = await this.sheetsCardsService.loadCards('genes');
    this.loading=false;
  }

  public addCard() {
    this.cardEditDialogComponent.name='';
    this.cardEditDialogComponent.description='';
    this.cardEditDialogComponent.protein=0;
    this.cardEditDialogComponent.svg='';
    this.cardEditDialogComponent.show();
    this.row=-1;
  }

  public editCard(card:Card) {
    this.cardEditDialogComponent.name=card.name;
    this.cardEditDialogComponent.description=card.description;
    this.cardEditDialogComponent.protein=card.protein;
    this.cardEditDialogComponent.svg=card.svg;
    this.row=card.row;
    this.index= this.cards.indexOf(card)
    this.cardEditDialogComponent.show();
  }

  public deleteCard(card:Card) {
    let index= this.cards.indexOf(card);
    this.cards.splice(index,1);
    this.sheetsCardsService.appendCard(card.name, card.description,card.protein,card.svg,card.row,true,'genes');

  }

  protected onSubmitCard = (name:string,description:string,protein:number,svg:string) => {
      this.sheetsCardsService.appendCard(name, description,protein,svg,this.row,false,'genes');
      if(this.row === -1) {
        let totalLength = 0;
        this.cards.push({name:name,
          description:description,protein:protein,svg:svg,row:totalLength+2});
      } else {
        this.cards[this.index].name=name;
        this.cards[this.index].description=description;
      }
  }

  protected toHome():void {
    this.location.back();
  }  
}
