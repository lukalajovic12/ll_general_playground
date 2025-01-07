import { Component, Input, OnInit } from '@angular/core';
import { AreaBase } from '../../area-base';
@Component({
  selector: 'app-menu-button',
  standalone:true,
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent extends AreaBase {

  @Input() action: () => void;

  @Input() text: string;

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }

}
