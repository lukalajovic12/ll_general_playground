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

  public generatorPrompt = '';
  public generatorPromptEnd = '';
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
    const category = this.selectedCategory===this.other ? this.newCategory :this.selectedCategory;
    let totalLength = 0;
    for (const key in this.words) {
      if (Array.isArray(this.words[key])) {
        totalLength += this.words[key].length;
      }
    }
    for(let i=0; i<generatedWord.length;i++) {
      let gw =generatedWord[i];
      this.sheetsDataService.appendWord(gw.sourceLanguage, gw.targetLanguage,category,-1,this.language,false);
      this.words[category].push({sourceLanguage:this.textToTranslate,
        targetLanguage:this.translatedText,
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
    if(this.language==='slo_eng'){
      this.sourceLanguage='sl';
      this.targetLanguage='en';
      this.generatorPrompt='Generiraj 10 besed o:';
      this.generatorPromptEnd='ločenih z vejico.';
    } else if(this.language==='slo_it') {
      this.sourceLanguage='sl';
      this.targetLanguage='it';    
      this.generatorPrompt='Generiraj 10 besed o:'
      this.generatorPromptEnd='ločenih z vejico.';
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
