import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AreaBase } from '../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Circle {
  x:number,
  y:number,
  r:number,
  choosen:boolean
}

interface Line {
  x1:number,
  y1:number,
  x2:number,
  y2:number
}

@Component({
  selector: 'app-circle-visibility',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './circle-visibility.component.html',
  styleUrl: './circle-visibility.component.css'
})
export class CircleVisibilityComponent extends AreaBase implements AfterViewInit {

  protected r = 50;

  private selectedIndex = -1;

  protected circles: Circle[] = [];
  protected lines: Line[] = [];


  ngAfterViewInit() {
    this.circles = [];
    this.circles.push({ x: 200, y: 200, r: 75 ,choosen:false});
    this.circles.push({ x: 500, y: 50, r: 10 ,choosen:false});

    this.circles.push({ x: 100, y: 500, r: 10 ,choosen:false});
    this.circles.push({ x: 500, y: 500, r: 10 ,choosen:false});

    this.circles.push({ x: 50, y: 50, r: 20 ,choosen:false});

    this.calculateLines();
  
  }

  private calculateDistance(c1: Circle, c2: Circle): number {
    return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
  }  




  private calculateAngel(x:number,y:number) {
    return Math.atan(y/x);
  }



  private calculateLine(c1:Circle,c2:Circle):void {
    let alfa = Math.acos(((Math.abs(c1.r-c2.r)))/this.calculateDistance(c1,c2));
    let beta = Math.PI-alfa;
    let gama = this.calculateDotProductAngle(c1,c2);
    let delta = gama - alfa;

    

    let c1Angle=this.calculateAngel(c1.x,c1.y);
    let c2Angle=this.calculateAngel(c2.x,c2.y);
    let x1 = c1.x-c1.r*Math.cos(c1Angle+delta);
    let y1 = c1.y-c1.r*Math.sin(c1Angle+delta);
    let epsilon = this.calculateDotProductAngle(c2,c1);
    let zeta=beta-epsilon;

    let x2 = c2.x-c2.r*Math.cos(c2Angle+zeta);
    let y2 = c2.y-c2.r*Math.sin(c2Angle+zeta);

    let line1:Line ={x1:x1,y1:y1,x2:x2,y2:y2};
    this.lines.push(line1);


    

    let eta = gama+alfa;

    let theta = beta+epsilon;

    let xx1 = c1.x-c1.r*Math.cos(c1Angle+eta);
    let yy1 = c1.y-c1.r*Math.sin(c1Angle+eta);
    let xx2 = c2.x-c2.r*Math.cos(c2Angle-theta);
    let yy2 = c2.y-c2.r*Math.sin(c2Angle-theta);

    let line2:Line ={x1:xx1,y1:yy1,x2:xx2,y2:yy2};
    this.lines.push(line2);
    


/*
    let line3:Line ={x1:c1.x,y1:c1.y,x2:x1,y2:y1};
    let line4:Line ={x1:c1.x,y1:c1.y,x2:xx1,y2:yy1};
    let line5:Line ={x1:c2.x,y1:c2.y,x2:x2,y2:y2};
    let line6:Line ={x1:c2.x,y1:c2.y,x2:xx2,y2:yy2};

    this.lines.push(line3);
    this.lines.push(line4);
    this.lines.push(line5);
    this.lines.push(line6);

    let line7:Line ={x1:c1.x,y1:c1.y,x2:c2.x,y2:c2.y};

    this.lines.push(line7);
    */

  }

  private calculatingLines(c1:Circle,c2:Circle):void {
    if(c1.r<c2.r) {
      this.calculateLine(c1,c2);
    } else {
      this.calculateLine(c2,c1);
    }


  }

  private calculateLines():void {
    this.lines = [];
    this.calculatingLines(this.circles[0],this.circles[1]);
    this.calculatingLines(this.circles[0],this.circles[2]);
    this.calculatingLines(this.circles[0],this.circles[3]);
    this.calculatingLines(this.circles[0],this.circles[4]);
  }





  private calculateDotProductAngle(c1:Circle,c2:Circle){
    let dotProductUpper= c1.x*(c1.x-c2.x)+c1.y*(c1.y-c2.y);
    let dotProductLowwer=Math.sqrt(c1.x**2+c1.y**2)*this.calculateDistance(c1,c2);
    return Math.acos(dotProductUpper/dotProductLowwer);


  }


  private updateSelection() {
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].choosen=false;
    }
    this.circles[this.selectedIndex].choosen=true;
  }

  protected addCircle() {
    this.circles.push({ x: 100, y: 100, r: this.r ,choosen:false});
    this.selectedIndex=this.circles.length-1;
    this.updateSelection();
    this.calculateLines();

  }

  protected clearAll() {
    this.circles = [];
  }

  protected updateSelected() {
    if (this.selectedIndex !== -1) {
      this.circles[this.selectedIndex].r = this.r;
    }
    this.calculateLines();
  }

  protected removeSelected() {
    if (this.selectedIndex !== -1) {
      this.circles.splice(this.selectedIndex, 1);
      this.selectedIndex = -1;
    }
  }  



  protected onCircleClick(event: MouseEvent,index:number) {
    this.selectedIndex=index;
    this.r=this.circles[index].r;
    this.updateSelection();
    event.stopPropagation();
  }

  protected onCanvasClick(event: MouseEvent) {

    const svgElement = event.target as SVGSVGElement;
    const point = svgElement.createSVGPoint();
    if (svgElement && point && svgElement.getScreenCTM()) {
      point.x = event.clientX;
      point.y = event.clientY;
      const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
      const clickX = svgPoint.x;
      const clickY = svgPoint.y;
      if (this.selectedIndex !== -1) {
        for (let i = 0; i < this.circles.length; i++) {
          this.circles[i].choosen=false;
        }
        this.circles[this.selectedIndex].x = clickX;
        this.circles[this.selectedIndex].y = clickY;
        this.circles[this.selectedIndex].choosen = true;
      }
    }
    this.calculateLines();
  }


}
