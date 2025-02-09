import { Component,Input } from '@angular/core';
import { AreaBase } from '../../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiWordGeneratorService, GeneratedWord } from '../../gemini-word-generator.service';

@Component({
  selector: 'app-words-generator',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './words-generator.component.html',
  styleUrl: './words-generator.component.css'
})
export class WordsGeneratorComponent extends AreaBase {

  @Input() public close:() => void;
  @Input() public submit:(generatedWords:GeneratedWord[]) => void;
  @Input() public sourceLanguage = '';
  @Input() public targetLanguage = '';  
  @Input() public generatorPrompt = '';
  @Input() public generatorPromptEnd = '';



  protected prompt: string = '';
  protected words: GeneratedWord[] = [];
  protected error: string | null = null;
  protected loading = true;

  constructor(
  private geminiWordGeneratorService:GeminiWordGeneratorService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    await this.geminiWordGeneratorService.fetchSheetKey();
    this.loading=false;
  }

  async generateWords() {
    this.words = await this.geminiWordGeneratorService.generateWords(this.generatorPrompt,this.generatorPromptEnd,this.prompt,this.sourceLanguage,this.targetLanguage);
  }

  protected toClose():void {
    this.close();
  }  

  protected toSubmit():void {
    this.submit(this.words);
    this.close();
  } 

}
