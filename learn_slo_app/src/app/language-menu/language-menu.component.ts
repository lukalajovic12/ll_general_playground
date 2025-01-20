import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuButtonComponent } from '../home/menu-button/menu-button.component';

@Component({
  selector: 'app-language-menu',
  standalone: true,
  imports: [MenuButtonComponent],
  templateUrl: './language-menu.component.html',
  styleUrl: './language-menu.component.css'
})
export class LanguageMenuComponent extends AreaBase {


  protected language = '';


  constructor(private router: Router,private route: ActivatedRoute) {
    super();
   }


  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => 
    this.language = params['language']);
  }

 
  protected toQuiz = () => {
    this.router.navigate(['/'+this.language] );
  }

  protected toNewWords = () => {
    this.router.navigate(['/new-words'], { queryParams: { language: this.language } });
  }

  protected toGenerator = () => {
    this.router.navigate(['/generator']);
  }





}
