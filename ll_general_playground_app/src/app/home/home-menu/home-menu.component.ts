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
    this.router.navigate(['/menu'], { queryParams: { language: 'eng_slo' } });
  }

  protected toIt = () => {
    this.router.navigate(['/menu'], { queryParams: { language: 'eng_it' } });
  }

  protected toDe = () => {
    this.router.navigate(['/menu'], { queryParams: { language: 'eng_de' } });
  }

  protected toSrb = () => {
    this.router.navigate(['/menu'], { queryParams: { language: 'eng_srb' } });
  }

  protected toNim = () => {
    this.router.navigate(['/nim']);
  }

  protected toCards = () => {
    this.router.navigate(['/cards']);
  }
  
  protected toImageSvgGenerator = () => {
    this.router.navigate(['/image-svg-generator']);
  }

  protected toImageBasicGenerator = () => {
    this.router.navigate(['/image-basic-generator']);
  }

  protected toPhysics = () => {
    this.router.navigate(['/physics']);
  }

  protected toFractal = () => {
    this.router.navigate(['/fractal']);
  }

  protected toModel3d = () => {
    this.router.navigate(['/model3d']);
  }

  protected toEnviorment = () => {
    this.router.navigate(['/enviorment']);
  }

  protected toCircleVisibility = () => {
    this.router.navigate(['/circle-visibility']);
  }


  
  

}
