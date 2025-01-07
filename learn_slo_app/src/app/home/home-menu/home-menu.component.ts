import { Component ,Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
@Component({
  selector: 'app-home-menu',
  standalone:true,
  imports: [MenuButtonComponent],
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent {

  constructor(private router: Router) { }

  public toSlo = () => {
    this.router.navigate(['/slo']);      
  }

  public toIt = () => {
    this.router.navigate(['/it']);      
  }

  protected toNewSlo = () => {
    this.router.navigate(['/new'], { queryParams: { language: 'slo' } });
  }

  protected toNewIt = () => {
    this.router.navigate(['/new'], { queryParams: { language: 'it' } });
  }


   

}
