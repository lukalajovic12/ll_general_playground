import { Component,OnInit } from '@angular/core';
import { AreaBase } from '../area-base';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Circle {
  x: number;
  y: number;
  r: number;
  color:string;
}
@Component({
  selector: 'app-circle-fractal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './circle-fractal.component.html',
  styleUrl: './circle-fractal.component.css'
})
export class CircleFractalComponent extends AreaBase implements OnInit{ 

  

  protected depth = 2;

  protected perCircle =2;

  protected isRandom = false;

  protected circles:Circle[]=[];

  override ngOnInit() {
    super.ngOnInit();
    this.updateFractal();
  }

  protected updateFractal():void {
    this.windowWidth;
    this.windowHeight;
    this.circles=[];
    this.createCircles(this.depth,this.perCircle,this.windowWidth/2,this.windowWidth/2,this.windowWidth/2,0,"red",this.isRandom);
  }

  private createCircles(n:number,m:number,r:number,x:number,y:number,spin:number,color:string,isRandom:boolean):void {
    console.log('n:',n,'spin',spin);
    let circleColor="red";
    if(color === "red"){
        circleColor="blue";
    }

    let angles:number[] = [];
    let vv =m;
    let sp=spin;
    if(isRandom) {
        vv =2+Math.floor(Math.random()*(m-2));
        sp =Math.floor(Math.random()*24);
    }
    let circleWidth=r*Math.sin(Math.PI/vv)/(1+Math.sin(Math.PI/vv));

    for(let i = 0;i<vv;i++){
        angles.push(2* (Math.PI) * (i / vv)+sp/Math.PI);
    }
    this.circles.push({x:x,y:y,r:r,color:circleColor});
    if(n>1){
      for(let i = 0;i<angles.length;i++){
        this.createCircles(
          n-1,m,circleWidth,
          x+Math.cos(angles[i])*(r-circleWidth),
          y+Math.sin(angles[i])*(r-circleWidth),angles[i],
          circleColor,isRandom);
      }
    }
  }




}
