import { Component } from '@angular/core';
import { AreaBase } from '../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { GeminiWordGeneratorService } from '../gemini-word-generator.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-svg-generator.component.html',
  styleUrl: './image-svg-generator.component.css'
})
export class ImageSvgGeneratorComponent extends AreaBase {

  protected prompt: string = '';

  protected svgCode: string = '';

  protected loading:'empty'|'loading'|'done' = 'empty';

  protected safeSvg: SafeHtml;

    constructor(private location: Location,
      private geminiWordGeneratorService:GeminiWordGeneratorService,
      private sanitizer: DomSanitizer) {
    super();
    }

    protected async  generateImage():Promise<void> {
      this.loading='loading';
      this.svgCode = await this.geminiWordGeneratorService.generateSVG(this.prompt);
      this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(this.svgCode);
      this.loading='done';
    }

    protected toHome():void {
      this.location.back();
    }    

}
