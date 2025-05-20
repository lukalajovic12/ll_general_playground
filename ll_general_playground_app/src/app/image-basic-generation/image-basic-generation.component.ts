import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiWordGeneratorService } from '../gemini-word-generator.service';
@Component({
  selector: 'app-image-basic-generation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-basic-generation.component.html',
  styleUrl: './image-basic-generation.component.css'
})
export class ImageBasicGenerationComponent extends AreaBase {

  protected prompt: string = '';

  protected loading:'empty'|'loading'|'done' = 'empty';

  imageUrl: string | null = null;

    constructor(private geminiWordGeneratorService:GeminiWordGeneratorService) {
      super();
    }

    protected async  generateImage():Promise<void> {
      this.loading='loading';
      this.imageUrl = await this.geminiWordGeneratorService.generateImage(this.prompt);
  
      this.loading='done';
    }
 
}
