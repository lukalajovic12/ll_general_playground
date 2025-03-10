import { Component,ElementRef,Input,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiWordGeneratorService } from '../../gemini-word-generator.service';
import { translate } from '../../game-util';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sentence-edit-dialog',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sentence-edit-dialog.component.html',
  styleUrl: './sentence-edit-dialog.component.css'
})
export class SentenceEditDialogComponent {
  @ViewChild('sentenceDialog') public sentenceDialog!: ElementRef<HTMLDialogElement>;

  @Input() public submit:(textToTranslate:string,translatedText:string,sentence:string) => void;
  @Input() public sourceLanguage = '';
  @Input() public targetLanguage = '';  
  
  public wordToTranslate = '';
  public translatedWord = '';
  public generatedSentence = '';
  protected error: string | null = null;
  protected loading = true;

  protected index = -1;

  constructor(
  private geminiWordGeneratorService:GeminiWordGeneratorService,private http: HttpClient) {
  }

   async ngOnInit(): Promise<void> {
    this.loading=true;
    await this.geminiWordGeneratorService.fetchSheetKey();
    this.loading=false;
  }

  async generateSentence() {
    this.loading = true;
    this.generatedSentence= await this.geminiWordGeneratorService.generateSentence(this.wordToTranslate,this.targetLanguage);

    this.loading = false;
  }



  public show():void {
      this.sentenceDialog.nativeElement.show();
  }  

  protected allowTranslate():boolean {
    return this.wordToTranslate.length>0;
  }  

  protected allowSubmit():boolean {
    return this.wordToTranslate.length>0 && this.translatedWord.length>0;
  }

  protected async translate():Promise<void> {
    if(this.allowTranslate()) {
      this.translatedWord = await translate(this.sourceLanguage,this.targetLanguage,this.wordToTranslate,this.http);
    }
  } 


  protected toClose():void {
    this.generatedSentence="";
    this.sentenceDialog.nativeElement.close();
  }  

  protected toSubmit():void {
    this.submit(this.wordToTranslate,this.translatedWord,this.generatedSentence);
    this.generatedSentence="";
    this.sentenceDialog.nativeElement.close();
  } 
}
