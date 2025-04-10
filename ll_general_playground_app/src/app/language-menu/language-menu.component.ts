import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuButtonComponent } from '../home/menu-button/menu-button.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-language-menu',
  standalone: true,
  imports: [MenuButtonComponent],
  templateUrl: './language-menu.component.html',
  styleUrl: './language-menu.component.css'
})
export class LanguageMenuComponent extends AreaBase {


  protected language = '';


  constructor(private router: Router,private route: ActivatedRoute,private location: Location) {
    super();
   }


  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => 
    this.language = params['language']);
  }

  protected toQuizWords = () => {
    this.router.navigate(['/quiz-words'], { queryParams: { language: this.language } });
  }

  protected toNewWords = () => {
    this.router.navigate(['/new-words'], { queryParams: { language: this.language } });
  }

  protected toNewSentences = () => {
    this.router.navigate(['/new-sentences'], { queryParams: { language: this.language } });
  }

  protected toQuizSentences = () => {
    this.router.navigate(['/quiz-sentences'], { queryParams: { language: this.language } });
  }

  protected toGenerator = () => {
    this.router.navigate(['/generator'], { queryParams: { language: this.language } });
  }

  protected toBack = () => {
    this.location.back();
  }  



}
