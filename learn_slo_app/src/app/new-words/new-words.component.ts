import { Component, ViewChild } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute } from '@angular/router';

import { SheetsWordsService, Word } from '../sheets-words.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { WordsGeneratorComponent } from './words-generator/words-generator.component';
import { GeneratedWord } from '../gemini-word-generator.service';
import { WordEditDialogComponent } from './word-edit-dialog/word-edit-dialog.component';
import { languages } from '../game-util';

@Component({
  selector: 'app-new-words',
  standalone: true,
  imports: [CommonModule, FormsModule,WordsGeneratorComponent,WordEditDialogComponent],
  templateUrl: './new-words.component.html',
  styleUrl: './new-words.component.css'
})
export class NewWordsComponent extends AreaBase {

  private  language = '';

  public sourceLanguage = '';
  public targetLanguage = '';

  public other = 'other';
  public newCategory = '';
  public selectedCategory = '';
  public categories: string[] = []; 

  protected loading = true;

  protected row = -1;

  protected index = -1;

  public words:{ [key: string]: Word[]; }={};

  @ViewChild('wordEditDialogComponent') public wordEditDialogComponent!: WordEditDialogComponent;
  @ViewChild('wordsGeneratorComponent') public wordsGeneratorComponent!: WordsGeneratorComponent;


  constructor(private route: ActivatedRoute,
    private location: Location,
  private sheetsWordsService: SheetsWordsService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    this.route.queryParams.subscribe(params => 
    this.language = params['language']);
        this.sourceLanguage=languages[this.language][0];
        this.targetLanguage=languages[this.language][1];

    this.words = await this.sheetsWordsService.loadWords(this.language);
    this.categories = [];
    this.categories=Object.keys(this.words);
    this.categories.push(this.other);
    this.loading=false;
  }

  protected openDialog() {
    this.wordEditDialogComponent.textToTranslate='';
    this.wordEditDialogComponent.translatedText='';
    this.wordEditDialogComponent.show();
    this.row=-1;
  }

  protected openAIDialog() {
    this.wordsGeneratorComponent.show();
    this.wordsGeneratorComponent.prompt = this.getCategory();
    this.row=-1;
  }


  protected editWord(word:Word) {
    this.wordEditDialogComponent.textToTranslate=word.sourceLanguage;
    const category = this.getCategory();
    this.wordEditDialogComponent.translatedText=word.targetLanguage;
    this.row=word.row;
    this.index= this.words[category].indexOf(word)
    this.wordEditDialogComponent.show();
  }

  protected deleteWord(word:Word) {
    let index= this.words[word.category].indexOf(word);
    this.words[word.category].splice(index,1);
    this.sheetsWordsService.appendWord(word.sourceLanguage, word.targetLanguage,word.category,word.row,this.language,true);
    Object.values(this.words).forEach(words => {
      words.forEach(w =>{
        if(w.row>word.row){
          w.row-=1;
        }
      });
    });
  }

 protected displayWords():Word[] {
    if(this.selectedCategory===null || this.selectedCategory==='') {
      return [];
    } else {
      return this.words[this.selectedCategory];
    }
  }

  private getCategory():string{
    return this.selectedCategory===this.other ? this.newCategory :this.selectedCategory;
  }

  protected noCategory():boolean {
    return this.selectedCategory===null 
    || this.selectedCategory==='' 
    || (this.selectedCategory===this.other && (this.newCategory===null || this.newCategory===''));
  }


  private setupCategory(category:string):void{
    if(this.selectedCategory === this.other) {
      this.categories.push(this.newCategory);
      this.words[category]=[];
      this.selectedCategory=this.newCategory;
      this.newCategory='';
    }
  }

  protected onSubmitWord = (textToTranslate:string,translatedText:string) => {
      const category = this.getCategory();
      this.sheetsWordsService.appendWord(textToTranslate, translatedText,category,this.row,this.language,false);
      this.setupCategory(category);
      if(this.row === -1) {
        let totalLength = 0;
        for (const key in this.words) {
          if (Array.isArray(this.words[key])) {
            totalLength += this.words[key].length;
          }
        }
        this.words[category].push({sourceLanguage:textToTranslate,
          targetLanguage:translatedText,
          category:category,row:totalLength+2});
      } else {
        this.words[category][this.index].sourceLanguage=textToTranslate;
        this.words[category][this.index].targetLanguage=translatedText;

      }
      this.newCategory="";
  }

  public submitGenerator = (generatedWord:GeneratedWord[]) => {
    const category = this.getCategory();
    this.setupCategory(category);
    let totalLength = 0;
    for (const key in this.words) {
      if (Array.isArray(this.words[key])) {
        totalLength += this.words[key].length;
      }
    }
    for(let i=0; i<generatedWord.length;i++) {
      let gw =generatedWord[i];
      this.sheetsWordsService.appendWord(gw.sourceLanguage, gw.targetLanguage,category,-1,this.language,false);
      this.words[category].push({sourceLanguage:gw.sourceLanguage,
        targetLanguage:gw.targetLanguage,
        category:category,row:totalLength+2+i});
    }    
  }  

  protected toHome():void {
    this.location.back();
  }  
}
