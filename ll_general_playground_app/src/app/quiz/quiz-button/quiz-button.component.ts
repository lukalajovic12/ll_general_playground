import { Component, Input } from '@angular/core';
import { AreaBase } from '../../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  imports: [CommonModule, FormsModule],
  selector: 'app-quiz-button',
  templateUrl: './quiz-button.component.html',
  styleUrls: ['./quiz-button.component.css']
})
export class QuizButtonComponent extends AreaBase {
  @Input() action: () => void;

  @Input() text: string;

  @Input() correctAnwser: boolean;
  @Input() wrongAnwser:boolean;

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }
}
