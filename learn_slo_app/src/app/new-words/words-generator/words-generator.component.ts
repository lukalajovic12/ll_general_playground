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
  @Input() public prompt = '';

  protected words: GeneratedWord[] = [];
  protected error: string | null = null;
  protected loading = true;

  protected numberOfWords = 10;

  constructor(
  private geminiWordGeneratorService:GeminiWordGeneratorService) {
  super();
  }


  protected plusNumberOfWords(){
      this.numberOfWords+=1;
    
  }

  protected minusNumberOfWords(){
    if(this.numberOfWords>1){
      this.numberOfWords-=1;
    }
  }

  protected displaywords(){
    if(this.numberOfWords>1){
      return 'Generate ' + this.numberOfWords +' words about';
    } else {
      return 'Generate 1 word about';
    }
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    await this.geminiWordGeneratorService.fetchSheetKey();
    this.loading=false;
  }

  async generateWords() {
    this.loading = true;
    this.words = await this.geminiWordGeneratorService.generateWords(this.displaywords(),this.prompt,this.sourceLanguage,this.targetLanguage);
    this.loading = false;
  }



    protected deleteWord(word:GeneratedWord) {
      let index= this.words.indexOf(word);
      this.words.splice(index,1);
    }

  protected toClose():void {
    this.close();
    this.words=[];
  }  

  protected toSubmit():void {
    this.submit(this.words);
    this.close();
    this.words=[];
  } 

}
