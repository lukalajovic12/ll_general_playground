import { Component,ElementRef,Input,ViewChild,OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-edit-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './card-edit-dialog.component.html',
  styleUrl: './card-edit-dialog.component.css'
})
export class CardEditDialogComponent implements OnDestroy {

  @ViewChild('cardEditDialog') public dialog!: ElementRef<HTMLDialogElement>;  

  @Input() public submit:(name:string,description:string,count:number,protein:number) => void;
  @Input() public sheetName='';
  public image='';
  public image_name='';
  protected imageUrl ='';
  public name = '';
  public description = '';
  public protein = 0;
  public count = 0;

  constructor() {}  

  ngOnDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

    private cardUrl():string{
      const byteCharacters = atob(this.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'JPG' });
      return URL.createObjectURL(blob);
    }


  protected allowSubmit():boolean {
    return this.name.length>0 && this.description.length>0;
  }

  public show():void {
    this.dialog.nativeElement.show();
      if (this.image) {
      this.imageUrl = this.cardUrl();
    }
  }  

  protected close():void {
    this.dialog.nativeElement.close();
  }  

  protected onSubmit():void {
    this.submit(this.name,this.description,this.count,this.protein);
    this.dialog.nativeElement.close();
  }    

}
