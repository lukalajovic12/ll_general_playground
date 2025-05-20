import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NimStatus } from './../nim-logic';
import { MenuButtonComponent } from '../../home/menu-button/menu-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nim-menu',
  standalone: true,
  imports:[MenuButtonComponent,CommonModule, FormsModule],
  templateUrl: './nim-menu.component.html',
  styleUrl: './nim-menu.component.css'
})
export class NimMenuComponent {

  @Input() action: () => void;
  @Input() status:NimStatus;
  @Input()
  public numberOfRows = 3;
  @Output() protected numberOfRowsChange = new EventEmitter<number>();
  @Input()
  public maxLinesInRow = 3;
  @Output() protected maxLinesInRowChange = new EventEmitter<number>();
  @Input()
  public custumize = false;
  @Output() protected custumizeChange = new EventEmitter<boolean>(); 
  @Input()
  public custumeRows:number[] = [];  
  @Output() protected custumeRowsChange = new EventEmitter<number[]>(); 

  constructor(private router: Router){}

  protected changeNumberOfRows(){
      this.numberOfRowsChange.emit(this.numberOfRows);
  }
  protected changeMaxLinesInRow(){
    this.maxLinesInRowChange.emit(this.maxLinesInRow);
  }
  protected changeCustumize(){
    this.custumizeChange.emit(this.custumize);
    if(this.custumizeChange) {
      this.custumeRows.push(1);
      this.custumeRowsChange.emit(this.custumeRows);
    } else {
      this.custumeRows = [];
      this.custumeRowsChange.emit(this.custumeRows);

    }
  } 


  trackByIndex(index: number, r: number): number {
    return index;
  }

  protected addRow():void {
    this.custumeRows.push(1);
    this.custumeRowsChange.emit(this.custumeRows);
  }

  protected removeRow(index:number):void {
    this.custumeRows.splice(index);
    this.custumeRowsChange.emit(this.custumeRows);
  }


  protected changeCustomRows(){
    this.custumeRows = [...this.custumeRows];
    this.custumeRowsChange.emit(this.custumeRows);
  } 

  protected toHome = () => {
    this.router.navigate(['/']);
  }


}
