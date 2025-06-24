import { Component,Input,OnDestroy,OnInit } from '@angular/core';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnDestroy, OnInit {;
  @Input() name!: string;
  @Input() description!: string;
  @Input() count!: number;
  @Input() protein!: number;
  @Input() public sheetName='';
  @Input() public image='';
  @Input() public image_name='';

  protected imageUrl ='';

  ngOnInit() {
    if (this.image) {
      this.imageUrl = this.cardUrl();
    }
  }


  ngOnDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

    private cardUrl():string{
      const byteCharacters = atob(this.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'JPG' });
      return URL.createObjectURL(blob);
    }

  

}
