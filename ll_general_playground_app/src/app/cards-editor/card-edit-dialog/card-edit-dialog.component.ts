import { Component,ElementRef,Input,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-card-edit-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './card-edit-dialog.component.html',
  styleUrl: './card-edit-dialog.component.css'
})
export class CardEditDialogComponent {

  @ViewChild('cardEditDialog') public dialog!: ElementRef<HTMLDialogElement>;  

  @Input() public submit:(name:string,description:string,protein:number) => void;
  @Input() public sheetName='';
  public name = '';
  public description = '';
  public protein = 0;

  constructor(private sanitizer: DomSanitizer) {}  

  protected allowSubmit():boolean {
    return this.name.length>0 && this.description.length>0;
  }

  public show():void {
    this.dialog.nativeElement.show();
  }  

  protected close():void {
    this.dialog.nativeElement.close();
  }  

  protected onSubmit():void {
    this.submit(this.name,this.description,this.protein);
    this.dialog.nativeElement.close();
  }    

}
