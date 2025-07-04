import { Component, HostBinding, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import { AreaBase } from '../area-base';
import { EnviormentalCard, SheetsEnviormentCardsService } from '../sheets-enviorment-cards.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-enviorment-cards',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './enviorment-cards.component.html',
  styleUrl: './enviorment-cards.component.css'
})
export class EnviormentCardsComponent extends AreaBase implements OnDestroy {

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

   protected loading = true;
 
   protected cardUrls:string[]=[];

    @HostBinding('style.--enviorment-width.px')
    protected widthEnviorment: number = 700;  

    @HostBinding('style.--enviorment-height.px')
    protected heightEnviorment: number = 700;

   constructor(
   private sheetsEnviormentCardsService: SheetsEnviormentCardsService) {
   super();
   }
 
   override async ngOnInit(): Promise<void> {
     super.ngOnInit();
     this.loading = true;
     this.cardUrls = [];
     const cards:EnviormentalCard[] = await this.sheetsEnviormentCardsService.loadCards();
     cards.forEach(card => {
      this.cardUrls.push(this.cardUrl(card));
     });


     this.loading=false;
   }

   ngOnDestroy() {
    this.cardUrls.forEach(imageUrl => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
     });

  }  

    private cardUrl(card:EnviormentalCard):string{
      const byteCharacters = atob(card.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'JPG' });
      return URL.createObjectURL(blob);
    }

    protected async exportPdf(): Promise<void> {
      const DATA = await this.pdfContent.nativeElement;
      html2canvas(DATA).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        let position = 10;
  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('exported-content.pdf');
      });
    }



   }