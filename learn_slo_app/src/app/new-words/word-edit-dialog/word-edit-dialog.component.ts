import { Component,ElementRef,Input,ViewChild } from '@angular/core';
import { translate } from '../../game-util';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-edit-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './word-edit-dialog.component.html',
  styleUrl: './word-edit-dialog.component.css'
})
export class WordEditDialogComponent {

  @ViewChild('newWordsDialog') public dialog!: ElementRef<HTMLDialogElement>;  

  @Input() public sourceLanguage = '';
  @Input() public targetLanguage = '';  

  @Input() public submit:(textToTranslate:string,translatedText:string) => void;

  public textToTranslate = '';
  public translatedText = '';

  constructor(private http: HttpClient) {}  

  protected allowTranslate():boolean {
    return this.textToTranslate.length>0;
  }  

  protected allowSubmit():boolean {
    return this.textToTranslate.length>0 && this.translatedText.length>0;
  }

  protected async translate():Promise<void> {
    if(this.allowTranslate()) {
      this.translatedText = await translate(this.sourceLanguage,this.targetLanguage,this.textToTranslate,this.http);
    }
  } 

  public show():void {
    this.dialog.nativeElement.show();
  }  

  protected close():void {
    this.dialog.nativeElement.close();
  }  

  protected onSubmit():void {
    this.submit(this.textToTranslate,this.translatedText);
    this.dialog.nativeElement.close();
  }    

}
