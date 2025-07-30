import { Component, ViewChild, ElementRef } from '@angular/core';
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

interface Polygon {
  x1:number,
  y1:number,
  x2:number,
  y2:number,
  xx1:number,
  yy1:number,
  xx2:number,
  yy2:number  
}



@Component({
  selector: 'app-circle-visibility',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './circle-visibility.component.html',
  styleUrl: './circle-visibility.component.css'
})
export class CircleVisibilityComponent extends AreaBase {

  protected r = 50;

  private selectedIndex = -1;

  protected circles: Circle[] = [];

  protected polygons: Polygon[] = [];

  protected lines: Line[] = [];

  private mouseDown = false;

  @ViewChild('svgCanvas', { static: false }) svgCanvas!: ElementRef<SVGSVGElement>;


  private calculateDistance(c1: Circle, c2: Circle): number {
    return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
  }  




  private calculateAngel(x:number,y:number) {
    return Math.atan(y/x);
  }

  private calculateLine(c1:Circle,c2:Circle):void {
    let c1Angle=this.calculateAngel(c1.x,c1.y);
    let c2Angle=this.calculateAngel(c2.x,c2.y);
    const alfa = Math.acos(((Math.abs(c1.r-c2.r)))/this.calculateDistance(c1,c2));
    const beta = Math.PI-alfa;
    let gama = this.calculateDotProductAngle(c1,c2);
    if(c1Angle<c2Angle){
      gama = 2*Math.PI-gama;
    }
    
    const psi = gama + alfa+c1Angle-Math.PI;
    let x1 = c1.x+c1.r*Math.cos(psi);
    let y1 = c1.y+c1.r*Math.sin(psi);
    let epsilon = this.calculateDotProductAngle(c2,c1);

    if(c1Angle<c2Angle){
      epsilon = 2*Math.PI-epsilon;
    }

    const lambda = Math.PI-(epsilon+beta-c2Angle);
    let x2 = c2.x+c2.r*Math.cos( lambda );
    let y2 = c2.y+c2.r*Math.sin( lambda );

    let line1:Line ={x1:x1,y1:y1,x2:x2,y2:y2};
   // this.lines.push(line1);
 
    const psi2 = gama - alfa+c1Angle-Math.PI;

    let xx1 = c1.x+c1.r*Math.cos(psi2);
    let yy1 = c1.y+c1.r*Math.sin(psi2);


    const lambda2 = Math.PI-(epsilon-beta-c2Angle);
    let xx2 = c2.x+c2.r*Math.cos(lambda2);
    let yy2 = c2.y+c2.r*Math.sin(lambda2);

    let line2:Line ={x1:xx1,y1:yy1,x2:xx2,y2:yy2};
   // this.lines.push(line2);


   this.polygons.push({
    x1:x1,
    y1:y1,
    x2:x2,
    y2:y2,
    xx1:xx1,
    yy1:yy1,
    xx2:xx2,
    yy2:yy2});  

  }


  protected showPoints(p:Polygon):number[] {

    return [    
      p.x1,
      p.y1,

      p.x2,
      p.y2,

      p.xx2,
      p.yy2,

      p.xx1,
      p.yy1,

    ];
  }

 
  private calculateLine2(c1:Circle,c2:Circle):void {
    let c1Angle=this.calculateAngel(c1.x,c1.y);
    let c2Angle=this.calculateAngel(c2.x,c2.y);
    const alfa = Math.acos(((Math.abs(c1.r+c2.r)))/this.calculateDistance(c1,c2));
    let gama = this.calculateDotProductAngle(c1,c2);
    if(c1Angle<c2Angle){
      gama = 2*Math.PI-gama;
    }
    
    const psi = gama + alfa+c1Angle-Math.PI;
    let x1 = c1.x+c1.r*Math.cos(psi);
    let y1 = c1.y+c1.r*Math.sin(psi);
    let epsilon = this.calculateDotProductAngle(c2,c1);

    if(c1Angle<c2Angle){
      epsilon = 2*Math.PI-epsilon;
    }

    const lambda = Math.PI-(epsilon+alfa-c2Angle);
    let x2 = c2.x+c2.r*Math.cos( lambda );
    let y2 = c2.y+c2.r*Math.sin( lambda );

 
    const psi2 = gama - alfa+c1Angle-Math.PI;

    let xx1 = c1.x+c1.r*Math.cos(psi2);
    let yy1 = c1.y+c1.r*Math.sin(psi2);


    const lambda2 = Math.PI-(epsilon-alfa-c2Angle);
    let xx2 = c2.x+c2.r*Math.cos(lambda2);
    let yy2 = c2.y+c2.r*Math.sin(lambda2);


    let line1:Line ={x1:x1,y1:y1,x2:xx2,y2:yy2};
    this.lines.push(line1);

    let line2:Line ={x1:xx1,y1:yy1,x2:x2,y2:y2};
    this.lines.push(line2);




  }


  private calculatingLines(c1:Circle,c2:Circle):void {
    if(c1.r>c2.r) {
      this.calculateLine(c1,c2);
    } else {
      this.calculateLine(c2,c1);
    }
 //   this.calculateLine2(c2,c1);
  }

  private calculateLines():void {
    this.lines = [];
    this.polygons = [];
    if(this.selectedIndex !== -1 && this.circles.length > 1) {
      let sortedlines =  this.circles.filter((c,index)=>index!=this.selectedIndex)
      .sort( (l1,l2) => this.calculateDistance(this.circles[this.selectedIndex],l1)-this.calculateDistance(this.circles[this.selectedIndex],l2));
      sortedlines.forEach(l=>this.calculatingLines(this.circles[this.selectedIndex],l));
    }
  }

  private calculateDotProductAngle(c1:Circle,c2:Circle){
    let dotProductUpper= c1.x*(c1.x-c2.x)+c1.y*(c1.y-c2.y);
    let dotProductLower=Math.sqrt(c1.x**2+c1.y**2)*Math.sqrt((c1.x-c2.x)**2+(c1.y-c2.y)**2);
    return Math.acos(dotProductUpper/dotProductLower);
    
  }


  private updateSelection() {
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].choosen=false;
    }
    this.circles[this.selectedIndex].choosen=true;
    this.calculateLines();
  }

  protected addCircle() {
    this.r=50;
    this.circles.push({ x: 300, y: 300, r: this.r ,choosen:false});
    this.selectedIndex=this.circles.length-1;
    this.updateSelection();
    this.calculateLines();

  }

  protected clearAll() {
    this.circles = [];
        this.calculateLines();
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
    this.calculateLines();
  }  


  protected up() {
    this.mouseDown = false;
  }

  


  private isInCircle(c: Circle, x:number,y:number): boolean {
    return (c.x -x) ** 2 + (c.y -y) ** 2<c.r**2;
  }  


  private select(x:number,y:number):void {
      this.mouseDown = false;
      for (let i = 0; i < this.circles.length; i++) {
        this.circles[i].choosen=false;
      }
      for (let i = 0; i < this.circles.length; i++) {
        if(this.isInCircle(this.circles[i],x,y)){
          this.mouseDown = true;
          this.selectedIndex=i;
          this.r=this.circles[i].r;
          this.updateSelection();
          break;
        }
      }
}


  private findSelected(clickX:number,clickY:number):void {
      if (this.selectedIndex !== -1) {
        for (let i = 0; i < this.circles.length; i++) {
          this.circles[i].choosen=false;
        }
        this.circles[this.selectedIndex].x = clickX;
        this.circles[this.selectedIndex].y = clickY;
        this.circles[this.selectedIndex].choosen = true;
      }
  }

  protected onCanvasClick(event: MouseEvent) {
    const svgElement = this.svgCanvas.nativeElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.clientX;
        point.y = event.clientY;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const clickX = svgPoint.x;
        const clickY = svgPoint.y;
        this.select(clickX,clickY);
      }
      this.calculateLines();
  }

  protected onCanvasTouch(event: TouchEvent) {

    const svgElement = this.svgCanvas.nativeElement;
    const point = svgElement.createSVGPoint();
    if (svgElement && point && svgElement.getScreenCTM()) {
      point.x = event.touches[0].clientX;
      point.y = event.touches[0].clientY;
      const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
      const clickX = svgPoint.x;
      const clickY = svgPoint.y;
      this.select(clickX, clickY);
    }
    this.calculateLines();
  }

  protected onCanvasClickMove(event: MouseEvent) {
    if(this.mouseDown){
      const svgElement = this.svgCanvas.nativeElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {

        point.x = event.clientX;
        point.y = event.clientY;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const clickX = svgPoint.x;
        const clickY = svgPoint.y;
        this.findSelected(clickX,clickY);
      }
      this.calculateLines();
    }
  }


  protected onCanvasTouchMove(event: TouchEvent) {
  if (this.mouseDown) {
    const svgElement = this.svgCanvas.nativeElement;
    const point = svgElement.createSVGPoint();
    if (svgElement && point && svgElement.getScreenCTM()) {
      point.x = event.touches[0].clientX;
      point.y = event.touches[0].clientY;
      const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
      const clickX = svgPoint.x;
      const clickY = svgPoint.y;
      this.findSelected(clickX, clickY);
    }
    this.calculateLines();
  }
  }



}
