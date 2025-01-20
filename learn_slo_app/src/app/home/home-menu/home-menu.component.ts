import { Component } from '@angular/core';
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

  protected toSlo = () => {
    this.router.navigate(['/menu'], { queryParams: { language: 'slo' } });
  }

  protected toIt = () => {
    this.router.navigate(['/menu'], { queryParams: { language: 'it' } });
  }

}
