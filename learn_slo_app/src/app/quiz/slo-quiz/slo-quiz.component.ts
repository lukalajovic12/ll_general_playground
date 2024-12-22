import { Component } from '@angular/core';
import { QuizObject } from '../../game-util';
import { QuizComponent } from '../quiz.component'
import { Word, SheetsDataService } from '../../sheets-data.service';
import { Subject, takeUntil, Observable } from 'rxjs'; // Import Subject and takeUntil

@Component({
  selector: 'app-slo-quiz',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './slo-quiz.component.html',
  styleUrl: './slo-quiz.component.css'
})
export class SloQuizComponent {

//  public words:{ [key: string]: string[][]; }={};

  public title="";
  public chooseCategories="";

  public displayQuestion: (QuizObject) => string = (question) => "Kaj pomeni "+question.question+" ?";
  
  
  public datatable: Observable<Word[]>;

  private destroy$ = new Subject<void>(); // Subject to trigger unsubscription

  constructor(private sheetsDataService: SheetsDataService) {
    this.datatable=this.sheetsDataService.fetchSheetData();
  }

  ngOnDestroy() {
    this.destroy$.next(); // Emit a value to trigger unsubscription
    this.destroy$.complete(); // Complete the Subject
  }

  public loadData():{ [key: string]: string[][]; } {
    let words:{ [key: string]: string[][]; }={};
    let cc:string[] =[];
    this.datatable.pipe(
      takeUntil(this.destroy$) 
    ).subscribe({
      next: (tableData: Word[]) => {
        if (tableData && tableData.length>0) {
          this.title=tableData[0].slo+"";
          for (let w of tableData) {
            if (!words[w.category]) {
              this.title=this.title+" "+w.category+"";
              words[w.category] = [[w.slo, w.eng]];
              cc.push(w.category);
            } else {
              words[w.category].push([w.slo, w.eng]);
            }
          }
        } else {
          console.log("table data is null or empty");
        }
      },
      error: (error) => {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., display an error message to the user
      }
    });
    return words;
  }

}