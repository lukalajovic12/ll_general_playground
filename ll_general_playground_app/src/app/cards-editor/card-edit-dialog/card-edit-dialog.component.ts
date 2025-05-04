import { Component,ElementRef,Input,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-edit-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './card-edit-dialog.component.html',
  styleUrl: './card-edit-dialog.component.css'
})
export class CardEditDialogComponent {

  @ViewChild('cardEditDialog') public dialog!: ElementRef<HTMLDialogElement>;  

  @Input() public submit:(name:string,description:string,protein:number,svg:string) => void;

  public name = '';
  public description = '';
  public svg='';
  public protein = 0;

  constructor(private http: HttpClient) {}  

  protected allowSubmit():boolean {
    return this.name.length>0 && this.description.length>0;
  }

  protected plusProtein():void {
    this.protein+=1;
  }


  protected minusProtein():void {
    if(this.protein>0){
      this.protein-=1;
    }

  }

  public show():void {
    this.dialog.nativeElement.show();
  }  

  protected close():void {
    this.dialog.nativeElement.close();
  }  

  protected onSubmit():void {
    this.submit(this.name,this.description,this.protein,this.svg);
    this.dialog.nativeElement.close();
  }    

}
