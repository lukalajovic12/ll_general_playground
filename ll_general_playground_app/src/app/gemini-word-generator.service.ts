import { Injectable, inject } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { lastValueFrom } from 'rxjs';

export interface GeneratedWord {
  sourceLanguage: string;
  targetLanguage: string;
}

export interface GeneratedSentence {
  sourceLanguage: string;
  targetLanguage: string;
  sentence: string
}

interface GeminiKey {
  geminiApi: string;
}


@Injectable({
  providedIn: 'root'
})
export class GeminiWordGeneratorService {


  private url = 'https://script.google.com/macros/s/AKfycbyvNbZMdaZLe_1QgTwlCIp9nAOo_eZVX1OCYfFOKr2yJIivSDQxNupLEEuLEMa_oczgDg/exec';



  public geminiApiKey = '';

  private readonly http = inject(HttpClient);

  constructor() { }


  public async fetchSheetKey(): Promise<void> {
    if (this.geminiApiKey.length === 0) {
      const scriptURL = `${this.url}`;
      try {
        const geminiKey = await lastValueFrom(this.http.get<GeminiKey>(scriptURL));
        if (geminiKey) {
          this.geminiApiKey = geminiKey.geminiApi;
        } else {
          console.warn('No data received or empty values array.');
          this.geminiApiKey = '';
        }
      } catch (error) {
        console.error('Error fetching words:', error);
        this.geminiApiKey = '';
      }
    }
  }

  

  public async generateWords(prefixPrompt: string, prompt: string): Promise<GeneratedWord[]> {
    await this.fetchSheetKey();
    const genAI = new GoogleGenerativeAI(this.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const fullPrompt =prefixPrompt + ' ' + prompt + '. Return the result in a javascript dictionary in the form word:translation,word:translation,... Only return a dictionary.'
     console.log('fullPrompt: ', fullPrompt);
    const result = await model.generateContent(fullPrompt);
    const generatedText = result.response.text();

    const startIndex = generatedText.indexOf('{');
    const endIndex = generatedText.lastIndexOf('}');
   const dictionaryString = generatedText.substring(startIndex, endIndex+1);

    console.log('Generated text: ', dictionaryString);
    const dictionary: Record<string, any> = JSON.parse(dictionaryString);

    let generatedWords: GeneratedWord[] = [];

    for (const [word, translation] of Object.entries(dictionary)) {
      let w: GeneratedWord = { sourceLanguage: word, targetLanguage: translation };
      generatedWords.push(w);
    }
    return generatedWords;
  }

  public async generateSentence(prompt: string, targetLanguage: string): Promise<string> {
    await this.fetchSheetKey();

    const genAI = new GoogleGenerativeAI(this.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let tl = '';
    if (targetLanguage === 'sl') {
      tl = 'slovenian';
    }
    if (targetLanguage === 'it') {
      tl = 'italian';
    }
    if (targetLanguage === 'de') {
      tl = 'german';
    }
    if (targetLanguage === 'sr') {
      tl = 'serbian using the cirilic alphabet';
    }
    const p = 'Generate a sentence in ' + tl + ' using the word' + ' ' + prompt + '. Use the word only once. Instead of the word '+ prompt + ' write ___. Do not add a translation or that word.';  
    const result = await model.generateContent(p);
    const generatedText = result.response.text();
    return generatedText;
  }


  public async generateSVG(prompt: string): Promise<string> {
    await this.fetchSheetKey();
    const genAI = new GoogleGenerativeAI(this.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent('generate an SVG containing ' + prompt + '. your response must only contain an SVG');

    const generatedSVG = this.extractSvgContent(result.response.text());
    return generatedSVG;
  }

  private extractSvgContent(svgString: string): string {
    const match = svgString.match(/<svg(.*?)<\/svg>/s); // The 's' flag allows '.' to match newline characters
    if (match && match[1]) {
      return "<svg " + match[1] + " </svg>";
    } else {
      return "";
    }
  }

  public async generateImage(prompt: string): Promise<string> {
    await this.fetchSheetKey();
    let imageUrl = "";
    try {
      const genAI = new GoogleGenerativeAI(this.geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      // Handle the image generation response.  Gemini returns a few different structures, so we need to handle them.
      if (result && result.response.candidates && result.response.candidates.length > 0) {
        const candidate = result.response.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          const part = candidate.content.parts[0];
          if (part.inlineData && part.inlineData.data) {  // Check for the new blob format
            imageUrl = part.inlineData.data;
          } else if (part.text) { // Fallback for older format (base64 encoded image)
            imageUrl = `data:image/png;base64,${part.text}`;
          } else {
            //   this.error = "Unexpected image response format.";
          }
        } else {
          //   this.error = "Invalid response format: No content parts found.";
        }
      } else if (result && result.response.promptFeedback && result.response.promptFeedback.blockReason) {
        //   this.error = `Image generation blocked: ${result.response.promptFeedback.blockReason}`;
      } else {
        //   this.error = "Invalid API response or no image generated.";
        console.error("API Response:", result); // Log the full response for debugging
      }

    } catch (err: any) {
      //   this.error = `Error generating image: ${err.message}`;
      console.error("Generation Error:", err); // Log the error for debugging
    }
    return imageUrl;

  }

}
