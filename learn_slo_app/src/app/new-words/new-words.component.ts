import { Component, ViewChild, ElementRef } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SheetsDataService, Word } from '../sheets-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { WordsGeneratorComponent } from './words-generator/words-generator.component';
import { GeneratedWord } from '../gemini-word-generator.service';
import { translate } from '../game-util';
@Component({
  selector: 'app-new-words',
  standalone: true,
  imports: [CommonModule, FormsModule,WordsGeneratorComponent],
  templateUrl: './new-words.component.html',
  styleUrl: './new-words.component.css'
})
export class NewWordsComponent extends AreaBase {

  private  language = '';

  protected textToTranslate = '';
  protected translatedText = '';

  protected sourceLanguage = '';
  protected targetLanguage = '';

  public other = 'other';
  public newCategory = '';
  public selectedCategory = '';
  public categories: string[] = []; 

  protected loading = true;

  protected row = -1;

  protected index = -1;

  public words:{ [key: string]: Word[]; }={};

  @ViewChild('aiDialog') public aiDialog!: ElementRef<HTMLDialogElement>;

  public closeGenerator = () => {
    this.aiDialog.nativeElement.close();
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
      this.sheetsDataService.appendWord(gw.sourceLanguage, gw.targetLanguage,category,-1,this.language,false);
      this.words[category].push({sourceLanguage:gw.sourceLanguage,
        targetLanguage:gw.targetLanguage,
        category:category,row:totalLength+2+i});
    }    
  }

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
  private sheetsDataService: SheetsDataService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.loading=true;
    this.route.queryParams.subscribe(params => 
    this.language = params['language']);
    if(this.language==='eng_slo'){
      this.sourceLanguage='eng';
      this.targetLanguage='sl';
    } else if(this.language==='eng_it') {
      this.sourceLanguage='eng';
      this.targetLanguage='it';    
    }
    this.words = await this.sheetsDataService.loadData(this.language);
    this.categories = [];
    this.categories=Object.keys(this.words);
    this.categories.push(this.other);
    this.loading=false;
  }

  protected openDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
    this.row=-1;
  }

  protected editWord(word:Word,dialog: HTMLDialogElement){
    this.textToTranslate=word.sourceLanguage;
    const category = this.getCategory();
    this.translatedText=word.targetLanguage;
    this.row=word.row;
    this.index= this.words[category].indexOf(word)
    dialog.showModal();
  }

  protected deleteWord(word:Word) {
    let index= this.words[word.category].indexOf(word);
    this.words[word.category].splice(index,1);
    this.sheetsDataService.appendWord(word.sourceLanguage, word.targetLanguage,word.category,word.row,this.language,true);
    Object.values(this.words).forEach(words => {
      words.forEach(w =>{
        if(w.row>word.row){
          w.row-=1;
        }
      });
    });
  }

  protected closeDialog(dialog: HTMLDialogElement) {
    dialog.close();
  }

 protected displayWords():Word[] {
    if(this.selectedCategory===null || this.selectedCategory==='') {
      return [];
    } else {
      return this.words[this.selectedCategory];
    }
  }

  public getCategory():string{
    return this.selectedCategory===this.other ? this.newCategory :this.selectedCategory;
  }

  protected noCategory():boolean {
    return this.selectedCategory===null 
    || this.selectedCategory==='' 
    || (this.selectedCategory===this.other && (this.newCategory===null || this.newCategory===''));
  }

  protected allowTranslate():boolean {
    return this.textToTranslate.length>0;
  }

  protected allowSubmit():boolean {
    const category = this.getCategory();
    return this.textToTranslate.length>0 && this.translatedText.length>0 && category.length>0;
  }

  protected async translate():Promise<void> {
    if(this.allowTranslate()) {
      this.translatedText = await translate(this.sourceLanguage,this.targetLanguage,this.textToTranslate,this.http);
    }
  }  

  private setupCategory(category:string):void{
    if(this.selectedCategory === this.other) {
      this.categories.push(this.newCategory);
      this.words[category]=[];
      this.selectedCategory=this.newCategory;
      this.newCategory='';
    }
  }

  protected onSubmit(dialog: HTMLDialogElement):void {
    if(this.allowSubmit()) {
      const category = this.getCategory();
      this.sheetsDataService.appendWord(this.textToTranslate, this.translatedText,category,this.row,this.language,false);
      this.setupCategory(category);
      if(this.row === -1) {
        let totalLength = 0;
        for (const key in this.words) {
          if (Array.isArray(this.words[key])) {
            totalLength += this.words[key].length;
          }
        }
        this.words[category].push({sourceLanguage:this.textToTranslate,
          targetLanguage:this.translatedText,
          category:category,row:totalLength+2});
      } else {
        this.words[category][this.index].sourceLanguage=this.textToTranslate;
        this.words[category][this.index].targetLanguage=this.translatedText;

      }
      this.textToTranslate="";
      this.translatedText="";
      this.newCategory="";
      dialog.close();
    }
  }

  protected toHome():void {
    this.location.back();
  }  
}
