import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SheetsDataService } from '../sheets-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Category } from '../game-util';

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

  public words:{ [key: string]: string[][]; }={};

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

  protected onSubmit() {
    if(this.allowSubmit()) {
      const category = this.selectedCategory===this.other ? this.newCategory :this.selectedCategory;
      this.sheetsDataService.appendWord(this.textToTranslate, this.translatedText,category,this.language);
      if(this.selectedCategory === this.other) {
        this.categories.push(this.newCategory);
      }
      this.textToTranslate="";
      this.translatedText="";
      this.newCategory="";
      this.selectedCategory="";
    }
  }

  protected toHome():void {
    this.location.back();
  }  
}
