import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SheetsDataService, Word } from '../sheets-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-words',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-words.component.html',
  styleUrl: './new-words.component.css'
})
export class NewWordsComponent extends AreaBase {

  private  language = '';

  protected textToTranslate: string = '';
  protected translatedText: string = '';

  protected sourceLanguage='';
  protected targetLanguage='';

  protected other = 'other';

  protected newCategory = '';

  protected selectedCategory="";


  protected row=-1;

  protected index=-1;

  public words:{ [key: string]: Word[]; }={};

    public categories: string[] = [];

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
  private sheetsDataService: SheetsDataService) {
  super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => 
    this.language = params['language']);
    if(this.language==='slo'){
      this.sourceLanguage='en';
      this.targetLanguage='sl';
    } else if(this.language==='it') {
      this.sourceLanguage='sl';
      this.targetLanguage='it';    
    }
    this.words = await this.sheetsDataService.loadData(this.language);
    this.categories = [];
    this.categories=Object.keys(this.words);
    this.categories.push(this.other);
  }

  protected openDialog(dialog: HTMLDialogElement) {
    dialog.showModal();
    this.row=-1;
  }


  protected editWord(word:Word,dialog: HTMLDialogElement){
    this.textToTranslate=word.sourceLanguage;
    const category = this.selectedCategory===this.other ? this.newCategory :this.selectedCategory;
    this.translatedText=word.targetLanguage;
    this.row=word.row;
    this.index= this.words[category].indexOf(word)
    dialog.showModal();
  }

  protected deleteWord(word:Word){

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

  protected noCategory():boolean {
    return this.selectedCategory===null || this.selectedCategory==='';
  }

  protected allowTranslate():boolean {
    return this.textToTranslate.length>0;
  }

  protected allowSubmit():boolean {
    const category = this.selectedCategory===this.other ? this.newCategory :this.selectedCategory;
    return this.textToTranslate.length>0 && this.translatedText.length>0 && category.length>0;
  }

  protected translate() {
    if(this.allowTranslate()) {
      const url = 'https://translate.googleapis.com/translate_a/single';
      const params = new HttpParams()
        .set('client', 'gtx') // Required parameter
        .set('sl', this.sourceLanguage)
        .set('tl', this.targetLanguage)
        .set('dt', 't') // Data type: text
        .set('q', this.textToTranslate); // The text to translate

      this.http.get(url, { params, responseType: 'text' }).subscribe({
        next: (response: any) => {
          try {
            // The response is a complex nested array. We need to parse it carefully.
            const parsedResponse = JSON.parse(response);
            if (parsedResponse && parsedResponse[0] && parsedResponse[0][0] && parsedResponse[0][0][0]) {
              this.translatedText = parsedResponse[0][0][0];
            } else {
              console.error('Unexpected translation response format:', parsedResponse);
            }
          } catch (error) {
            console.error('Error parsing translation response:', error, response);
          }
        },
        error: (error) => {
          console.error('Translation request failed:', error);
        }
      });
  }
  }  

  protected onSubmit(dialog: HTMLDialogElement):void {
    if(this.allowSubmit()) {
      const category = this.selectedCategory===this.other ? this.newCategory :this.selectedCategory;
      this.sheetsDataService.appendWord(this.textToTranslate, this.translatedText,category,this.row,this.language,false);
      if(this.selectedCategory === this.other) {
        this.categories.push(this.newCategory);
      }
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
