import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { HomeMenuComponent } from './home-menu/home-menu.component'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports:[HomeMenuComponent]
})
export class HomeComponent extends AreaBase {


}
