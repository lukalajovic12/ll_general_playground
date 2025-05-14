import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-particle-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './particle-dialog.component.html',
  styleUrl: './particle-dialog.component.css'
})
export class ParticleDialogComponent {
  @ViewChild('particleEditDialog') public dialog!: ElementRef<HTMLDialogElement>;  

  @Input() public submit:(x:number,y:number,vx:number,vy:number,m:number) => void;
  @Input() public sheetName='';
  public x = 0;
  public y = 0;

  public vx = 0;
  public vy = 0;

  public m=0;


  public show():void {
    this.dialog.nativeElement.show();
  }  

  protected close():void {
    this.dialog.nativeElement.close();
  }  

  protected onSubmit():void {
    this.submit(this.x,this.y,this.vx,this.vy,this.m);
    this.dialog.nativeElement.close();
  }   
}
