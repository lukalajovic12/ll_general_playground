import { Component,ElementRef,Input,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiWordGeneratorService, GeneratedWord } from '../../gemini-word-generator.service';
import { WordEditDialogComponent } from '../word-edit-dialog/word-edit-dialog.component';
import { languageCodes } from '../../game-util';
@Component({
  selector: 'app-words-generator',
  standalone: true,
  imports: [CommonModule,FormsModule,WordEditDialogComponent],
  templateUrl: './words-generator.component.html',
  styleUrl: './words-generator.component.css'
})
export class WordsGeneratorComponent {

  @ViewChild('aiDialog') public aiDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('wordDialog') public wordEditDialogComponent!: WordEditDialogComponent;

  @Input() public submit:(generatedWords:GeneratedWord[]) => void;
  @Input() public sourceLanguage = '';
  @Input() public targetLanguage = '';  
  public prompt = '';

  protected words: GeneratedWord[] = [];
  protected error: string | null = null;
  protected loading = true;

  protected numberOfWords = 10;
  protected index = -1;

  constructor(
  private geminiWordGeneratorService:GeminiWordGeneratorService) {
  }

  protected displayWords(){
      return 'Generate ' + this.numberOfWords +' words in '+ languageCodes[this.sourceLanguage] + ' and translate them to ' + languageCodes[this.targetLanguage]+'. The words should be about ';
  }

   async ngOnInit(): Promise<void> {
    this.loading=true;
    await this.geminiWordGeneratorService.fetchSheetKey();
    this.loading=false;
  }

  async generateWords() {
    this.loading = true;
    this.words = await this.geminiWordGeneratorService.generateWords(this.displayWords(),this.prompt);
    this.loading = false;
  }

  protected editWord(word:GeneratedWord) {
    this.wordEditDialogComponent.textToTranslate=word.sourceLanguage;
    this.wordEditDialogComponent.translatedText=word.targetLanguage;
    this.index= this.words.indexOf(word)
    this.wordEditDialogComponent.show();
  }

    protected deleteWord(word:GeneratedWord) {
      let index= this.words.indexOf(word);
      this.words.splice(index,1);
    }
    protected onSubmitEditWord = (textToTranslate:string,translatedText:string) => {
        this.words[this.index].sourceLanguage=textToTranslate;
        this.words[this.index].targetLanguage=translatedText;
    }

  public show():void {
      this.words=[];
      this.aiDialog.nativeElement.show();
  }  

  protected toClose():void {
    this.words=[];
    this.aiDialog.nativeElement.close();
  }  

  protected toSubmit():void {
    this.submit(this.words);
    this.words=[];
    this.aiDialog.nativeElement.close();
  } 

}
