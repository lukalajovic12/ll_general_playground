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

@Component({
  selector: 'app-circle-visibility',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './circle-visibility.component.html',
  styleUrl: './circle-visibility.component.css'
})
export class CircleVisibilityComponent extends AreaBase implements AfterViewInit {

  protected x = 0;
  protected y = 0;
  protected r = 0;

  private selectedIndex = -1;

  protected circles: Circle[] = [];


  ngAfterViewInit() {
    this.circles = [];
 
  }

  protected addCircle() {
    this.circles.push({ x: this.r, y: this.y, r: this.r ,choosen:false});
  }

  protected clearAll() {
    this.circles = [];
  }

  protected updateSelected() {
    if (this.selectedIndex !== -1) {
      this.circles[this.selectedIndex].x = this.x;
      this.circles[this.selectedIndex].y = this.y;
      this.circles[this.selectedIndex].r = this.r;
    }
  }

  protected removeSelected() {
    if (this.selectedIndex !== -1) {
      this.circles.splice(this.selectedIndex, 1);
      this.selectedIndex = -1;
    }
  }  

  protected onCanvasClick(event: MouseEvent) {
      const clickX = event.clientX;
      const clickY = event.clientY;
      let found = false;
      for (let i = 0; i < this.circles.length; i++) {
        const p = this.circles[i];
        if (Math.sqrt((p.x - clickX) ** 2 + (p.y - clickY) ** 2) < p.r**2) {
          this.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (this.selectedIndex !== -1 && !found) {
        for (let i = 0; i < this.circles.length; i++) {
          this.circles[i].choosen=false;
        }
        this.circles[this.selectedIndex].x = clickX;
        this.circles[this.selectedIndex].y = clickY;
        this.circles[this.selectedIndex].choosen = true;
      }
  }

}
