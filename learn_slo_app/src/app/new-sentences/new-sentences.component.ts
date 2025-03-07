import { Component, ViewChild } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute } from '@angular/router';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { SentenceEditDialogComponent } from './sentence-edit-dialog/sentence-edit-dialog.component';
import { Sentence, SheetsSentencesService } from '../sheets-sentences.service';
import { languages } from '../game-util';

@Component({
  selector: 'app-new-sentences',
  standalone: true,
  imports: [CommonModule, FormsModule,SentenceEditDialogComponent],
  templateUrl: './new-sentences.component.html',
  styleUrl: './new-sentences.component.css'
})
export class NewSentencesComponent extends AreaBase {


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

  public sentences:{ [key: string]: Sentence[]; }={};

  @ViewChild('sentenceEditDialogComponent') public sentenceEditDialogComponent!: SentenceEditDialogComponent;
 

  constructor(private route: ActivatedRoute,
    private location: Location,
  private sheetsSentenceService: SheetsSentencesService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    this.route.queryParams.subscribe(params => 
    this.language = params['language']);
    this.sourceLanguage=languages[this.language][0];
    this.targetLanguage=languages[this.language][1];

    this.sentences = await this.sheetsSentenceService.loadSentences(this.language);
    this.categories = [];
    this.categories=Object.keys(this.sentences);
    this.categories.push(this.other);
    this.loading=false;
  }

  protected openDialog() {
    this.sentenceEditDialogComponent.wordToTranslate='';
    this.sentenceEditDialogComponent.translatedWord='';
    this.sentenceEditDialogComponent.generatedSentence='';
    this.sentenceEditDialogComponent.show();
    this.row=-1;
  }

  protected editSentence(word:Sentence) {
    this.sentenceEditDialogComponent.wordToTranslate=word.sourceLanguage;
    const category = this.getCategory();
    this.sentenceEditDialogComponent.translatedWord=word.targetLanguage;
    this.sentenceEditDialogComponent.generatedSentence=word.sentence;

    this.row=word.row;
    this.index= this.sentences[category].indexOf(word)
    this.sentenceEditDialogComponent.show();
  }

  protected deleteSentence(word:Sentence) {
    let index= this.sentences[word.category].indexOf(word);
    this.sentences[word.category].splice(index,1);
    this.sheetsSentenceService.appendSentence(word.sourceLanguage, word.targetLanguage,word.sentence,word.category,word.row,this.language,true);
    Object.values(this.sentences).forEach(words => {
      words.forEach(w =>{
        if(w.row>word.row){
          w.row-=1;
        }
      });
    });
  }

 protected displaySentences():Sentence[] {
    if(this.selectedCategory===null || this.selectedCategory==='') {
      return [];
    } else {
      return this.sentences[this.selectedCategory];
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
      this.sentences[category]=[];
      this.selectedCategory=this.newCategory;
      this.newCategory='';
    }
  }

  protected onSubmitWord = (textToTranslate:string,translatedText:string,sentence:string) => {
      const category = this.getCategory();
      this.sheetsSentenceService.appendSentence(textToTranslate, translatedText,sentence,category,this.row,this.language,false);
      this.setupCategory(category);
      if(this.row === -1) {
        let totalLength = 0;
        for (const key in this.sentences) {
          if (Array.isArray(this.sentences[key])) {
            totalLength += this.sentences[key].length;
          }
        }
        this.sentences[category].push({sourceLanguage:textToTranslate,
          targetLanguage:translatedText,sentence:sentence,
          category:category,row:totalLength+2});
      } else {
        this.sentences[category][this.index].sourceLanguage=textToTranslate;
        this.sentences[category][this.index].targetLanguage=translatedText;

      }
      this.newCategory="";
  }

  protected onSubmitSentence = (textToTranslate:string,translatedText:string,sentence:string) => {
    const category = this.getCategory();
    this.sheetsSentenceService.appendSentence(textToTranslate, translatedText,sentence,category,this.row,this.language,false);
    this.setupCategory(category);
    if(this.row === -1) {
      let totalLength = 0;
      for (const key in this.sentences) {
        if (Array.isArray(this.sentences[key])) {
          totalLength += this.sentences[key].length;
        }
      }
      this.sentences[category].push({sourceLanguage:textToTranslate,
        targetLanguage:translatedText,sentence:sentence,
        category:category,row:totalLength+2});
    } else {
      this.sentences[category][this.index].sourceLanguage=textToTranslate;
      this.sentences[category][this.index].targetLanguage=translatedText;

    }
    this.newCategory="";
  }


  protected toHome():void {
    this.location.back();
  }  


}
