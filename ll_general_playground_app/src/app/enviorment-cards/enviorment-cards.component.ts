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

    protected rows = 3;

  protected page = 0;

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

  protected displayList():string[] {
       return this.cardUrls.slice(this.page * this.rows, (this.page + 1) * this.rows);
     }
   


   protected plus1(){
    if (this.page *  this.rows < this.cardUrls.length-1) {
        this.page++;
    } else {
      this.page = 0; // Reset to the first page if it exceeds the count
    }
  }

  protected minus1(){
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = Math.floor(this.cardUrls.length /  this.rows); // Set to the last page if already at the first page
    }
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

  protected async exportPDF() {
    this.page = 0;
    await this.delay(1000);
    const imgWidth = 208;
    let pdf = new jsPDF('p', 'mm', 'a4');
    const element = document.getElementById('pdf-content');
    await this.delay(1000);

    const totalPages = Math.ceil(this.cardUrls.length / this.rows);
    for (let i = 0; i < totalPages; i++) {
      this.page = i;
      // Wait for Angular to update the view
      await this.delay(500);
      const canvas = await html2canvas(element!, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#fff'
      });
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      if (i < totalPages - 1) {
        pdf.addPage();
      }
    }
    await this.delay(500);
    pdf.save('exported-content.pdf');
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


   }