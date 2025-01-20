import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { SheetsDataService, Word } from '../sheets-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

interface GeminiResponse {
  candidates: { output: string }[];
}

@Component({
  selector: 'app-words-generator',
  standalone: true,
  imports: [],
  templateUrl: './words-generator.component.html',
  styleUrl: './words-generator.component.css'
})
export class WordsGeneratorComponent extends AreaBase {

  prompt: string = '';
  words: string[] = [];
  error: string | null = null;
  loading: boolean = false;

  private geminiApiKey = '';


  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
  private sheetsDataService: SheetsDataService) {
  super();
  }

  generateWords() {
    this.loading = true;
    this.error = null;
    this.words = [];

    const apiUrl = 'https://api.generativeai.googleapis.com/v1beta2/models/gemini-pro:generateText'; // Use the correct model name
    const apiKey = this.geminiApiKey; // Access API key from environment
    if (!apiKey) {
      this.error = "API key not found. Please set the 'geminiApiKey' environment variable.";
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    });

    const requestBody = {
      prompt: {
        text: this.prompt
      },
      temperature: 0.7, // Adjust temperature for creativity
      maxOutputTokens: 256 // Limit output length
    };

    this.http.post<GeminiResponse>(apiUrl, requestBody, { headers }).subscribe({
      next: (response) => {
        if (response.candidates && response.candidates.length > 0) {
          const generatedText = response.candidates[0].output;
          // Split the generated text into words. Improve this splitting as needed for your use case.
          this.words = generatedText.split(/\s+/).filter(word => word.trim() !== ''); //Splitting by whitespace and filtering out empty strings.
        } else {
          this.error = "No words generated.";
        }
        this.loading = false;
      },
      error: (err) => {
          this.error = err.message || "An error occurred.";
          console.error("Gemini API Error:", err); // Log the full error for debugging
          this.loading = false;
      }
    });
  }

  protected toHome():void {
    this.location.back();
  }  
}
