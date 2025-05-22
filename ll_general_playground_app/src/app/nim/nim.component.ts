import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subject } from 'rxjs';
import { Line, evenPosition,oddMove,randomMove, NimStatus } from './nim-logic'
import { AreaBase } from '../area-base';
import { NimMenuComponent } from './nim-menu/nim-menu.component';

@Component({
  selector: 'app-nim',
  standalone: true,
  imports:[NimMenuComponent],
  templateUrl: './nim.component.html',
  styleUrls: ['./nim.component.css']
})
export class NimComponent extends AreaBase implements OnInit, OnDestroy {

  protected firstPressX = -1;
  protected firstPressY = -1;
  protected secondPressX = -1;

  protected firstPressed = false;
  private markedElements = false;

  protected rows: Line[][] = [];

  protected playingGame = false;

  public status:NimStatus='instructions';
  
  private unsubscribe$: Subject<void> = new Subject<void>();
  protected radius =6;

  private originalRowsLength =6;

  public numberOfRows=3;

  public maxMatchesInRow=3;

  public custumeRows:number[] = [];

  public custumize = false;
  
  override ngOnInit() {
    super.ngOnInit();
    this.setupNimWidths();
  }

  private setupNimWidths():void {
    if(this.playingGame){
      let maks =0;
      for(let r of this.rows) {
        if(r.length>maks) {
          maks=r.length;
        }
      }
      const maksRatio=this.windowWidth/maks;
      for(let i=0; i<this.rows.length;i++) {
        for(let j=0; j<this.rows[i].length;j++) {
          this.rows[i][j].x=j*maksRatio+maksRatio/2
          this.rows[i][j].y=i*(this.windowHeight/this.rows.length)+10;
        }
      }
    }
  }

  private createRows(): void {
    let nimNumbers = [];

    if(this.custumize){
      nimNumbers=this.custumeRows;
      console.log('GOD: ',nimNumbers);
    } else {
      for(let i=0;i<this.numberOfRows;i++){
        let n = Math.floor(this.maxMatchesInRow*Math.random()+1);
          nimNumbers.push(n);
      }
    }
    this.originalRowsLength=nimNumbers.length;
    const maks = nimNumbers.reduce((a, b) => Math.max(a, b), -Infinity);
    const maksRatio=this.windowWidth/maks;
    for(let i=0; i<nimNumbers.length;i++) {
      let row: Line[] = []
      for(let j=0; j<nimNumbers[i];j++) {
        let l:Line = {x:j*maksRatio+maksRatio/2, y:i*(this.windowHeight/nimNumbers.length)+10,choosen:false};
        row.push(l);
      }
      this.rows.push(row);
    }
    if(evenPosition(this.rows) && this.custumize===false){
      oddMove(this.rows);
      this.removeChoosen();
    }
  }

  protected lineLength():number {
    return this.windowHeight/this.originalRowsLength-30;

  }

  public startGame = () => {
    this.createRows();
    this.playingGame = true;
  }

  protected startMark(event: MouseEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.clientX;
        point.y = event.clientY;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        const mouseY = svgPoint.y;
        this.firstPressX = mouseX;
        this.firstPressY = mouseY;
        this.firstPressed=true;
      }
  }
  }

  protected secondMark(event: MouseEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.clientX;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        this.secondPressX = mouseX;
      }
  }
  }  

  protected startMarkTouch(event: TouchEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.touches[0].clientX;
        point.y = event.touches[0].clientY;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        const mouseY = svgPoint.y;
        this.firstPressX = mouseX;
        this.firstPressY = mouseY;
        this.firstPressed=true;
      }
  }
  }

  protected secondMarkTouch(event: TouchEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.touches[0].clientX;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        this.secondPressX = mouseX;
      }
  }
  }  

  private markChoosen():void {
    this.markedElements=false;
    for(let row of this.rows){
      for(let line of row) {
        if(line.x>= Math.min(this.firstPressX,this.secondPressX) && line.x<= Math.max(this.firstPressX,this.secondPressX) 
        && line.y<=this.firstPressY && (line.y+this.lineLength())>=this.firstPressY
        ) {
          line.choosen=true;
          this.markedElements=true;
        }
      }
    }
  }

  private removeChoosen():void {
    for(let i=0; i<this.rows.length;i++){
      this.rows[i]= this.rows[i].filter(l => !l.choosen)
    }
    this.rows =this.rows.filter(r => r.length>0);
  }  

  protected async nimMove(): Promise<void> {
    this.firstPressed=false;
    this.markChoosen();
    if(this.markedElements) {
      await this.sleep(300);
      this.removeChoosen();
      if(this.rows.length>0) {
      await this.sleep(300);
      if(evenPosition(this.rows)){
        randomMove(this.rows);
      } else {
        oddMove(this.rows);
      }
      await this.sleep(300);
      this.removeChoosen();
      if(this.rows.length===0) {
        this.playingGame=false;
        this.status='loose';
      }
    } else {

      this.playingGame=false;
      this.status='win';
    }
    }
  }


  protected sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
