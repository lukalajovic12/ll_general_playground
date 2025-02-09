import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { GeminiWordGeneratorService } from '../gemini-word-generator.service';
@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.css'
})
export class ImageGeneratorComponent extends AreaBase {

  protected prompt: string = '';

  protected svgCode: string = '';

    constructor(private location: Location,private geminiWordGeneratorService:GeminiWordGeneratorService) {
    super();
    }

    protected async  generateImage():Promise<void> {
     this.svgCode = await this.geminiWordGeneratorService.generateSVG(this.prompt);
    }

    protected toHome():void {
      this.location.back();
    }    

}
