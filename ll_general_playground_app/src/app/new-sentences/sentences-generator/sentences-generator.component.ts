import { Component,ElementRef,Input,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiWordGeneratorService, GeneratedSentence } from '../../gemini-word-generator.service';
import { SentenceEditDialogComponent } from '../sentence-edit-dialog/sentence-edit-dialog.component';

@Component({
  selector: 'app-sentences-generator',
  standalone: true,
  imports: [CommonModule,FormsModule,SentenceEditDialogComponent],
  templateUrl: './sentences-generator.component.html',
  styleUrl: './sentences-generator.component.css'
})
export class SentencesGeneratorComponent {
  @ViewChild('aiDialog') public aiDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('sentenceDialog') public sentenceEditDialogComponent!: SentenceEditDialogComponent;

  @Input() public submit:(generatedSenttences:GeneratedSentence[]) => void;
  @Input() public sourceLanguage = '';
  @Input() public targetLanguage = '';  
  public prompt = '';

  protected sentences: GeneratedSentence[] = [];
  protected error: string | null = null;
  protected loading = true;

  protected numberOfSentences = 10;
  protected index = -1;

  constructor(
  private geminiWordGeneratorService:GeminiWordGeneratorService) {
  }

  protected displaySentences(){
    if(this.numberOfSentences>1){
      return 'Generate ' + this.numberOfSentences +' sentences about';
    } else {
      return 'Generate 1 sentence about';
    }
  }

   async ngOnInit(): Promise<void> {
    this.loading=true;
    await this.geminiWordGeneratorService.fetchSheetKey();
    this.loading=false;
  }

  async generateSentences() {
    this.loading = true;
    this.sentences = await this.geminiWordGeneratorService.generateSentences(this.displaySentences(),this.prompt,this.sourceLanguage,this.targetLanguage);
    this.loading = false;
  }

  protected editSentence(sentence:GeneratedSentence) {
    this.sentenceEditDialogComponent.wordToTranslate=sentence.sourceLanguage;
    this.sentenceEditDialogComponent.translatedWord=sentence.targetLanguage;
    this.sentenceEditDialogComponent.generatedSentence=sentence.sentence;
    this.index= this.sentences.indexOf(sentence)
    this.sentenceEditDialogComponent.show();
  }

    protected deleteSentence(sentence:GeneratedSentence) {
      let index= this.sentences.indexOf(sentence);
      this.sentences.splice(index,1);
    }
    protected onSubmitEditSentence = (textToTranslate:string,translatedText:string) => {
        this.sentences[this.index].sourceLanguage=textToTranslate;
        this.sentences[this.index].targetLanguage=translatedText;
    }

  public show():void {
      this.sentences=[];
      this.aiDialog.nativeElement.show();
  }  

  protected toClose():void {
    this.sentences=[];
    this.aiDialog.nativeElement.close();
  }  

  protected toSubmit():void {
    this.submit(this.sentences);
    this.sentences=[];
    this.aiDialog.nativeElement.close();
  } 

}
