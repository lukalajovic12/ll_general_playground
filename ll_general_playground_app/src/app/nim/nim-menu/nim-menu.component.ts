import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NimStatus } from './../nim-logic';
import { MenuButtonComponent } from '../../home/menu-button/menu-button.component';
@Component({
  selector: 'app-nim-menu',
  standalone: true,
  imports:[MenuButtonComponent],
  templateUrl: './nim-menu.component.html',
  styleUrl: './nim-menu.component.css'
})
export class NimMenuComponent {

  @Input() action: () => void;
  @Input() status:NimStatus;

  @Input()
  public numberOfRows = 3;
  @Output() protected numberOfRowsChange = new EventEmitter<number>();

  constructor(private router: Router){}

  protected plusNumberOfRows(){
      this.numberOfRows+=1;
      this.numberOfRowsChange.emit(this.numberOfRows);
  }

  protected minusNumberOfRows(){
    if(this.numberOfRows>1){
      this.numberOfRows-=1;
      this.numberOfRowsChange.emit(this.numberOfRows);
    }
  }


  protected toHome = () => {
    this.router.navigate(['/']);
  }


}
