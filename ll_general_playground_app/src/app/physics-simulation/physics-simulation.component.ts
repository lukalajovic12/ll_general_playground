import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AreaBase } from '../area-base';
import { ParticleDialogComponent } from './particle-dialog/particle-dialog.component';

export interface Particle {
  x: number;
  y: number;
  m: number;
  vx:number;
  vy:number;
}

@Component({
  selector: 'app-physics-simulation',
  standalone: true,
  imports: [ParticleDialogComponent],
  templateUrl: './physics-simulation.component.html',
  styleUrl: './physics-simulation.component.css'
})
export class PhysicsSimulationComponent extends AreaBase implements AfterViewInit {



 
  @ViewChild('particleEditDialog') public particleEditDialog!: ParticleDialogComponent;

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  protected particles: Particle[];
    
  public gravitationalConstant=3000;

  private animationFrameId: number = 0;
   isRunning = false;

  private lastTimestamp = 0;



  private calculateDistance(p1:Particle,p2:Particle):number {
      return Math.sqrt((p1.x-p2.x)**2+  (p1.y-p2.y)**2 );
  }


  private calculateSpeed(p1:Particle,p2:Particle,t:number):void {
    let k = (this.gravitationalConstant*(p1.m*p2.m)/this.calculateDistance(p1,p2)**3);
    let fx  = k*(p1.x-p2.x);
    let fy  = k*(p1.y-p2.y);
    p1.vx-=t*fx/p1.m;
    p1.vy-=t*fy/p1.m;
    p2.vx+=t*fx/p2.m;
    p2.vy+=t*fy/p2.m;
  }

  private calculateSpeeds(t:number):void{
    for(let i=0;i<this.particles.length-1;i++){
      for(let j=i+1;j<this.particles.length;j++){
        this.calculateSpeed(this.particles[i],this.particles[j],t);
      }
    }
  }

  private radius(p:Particle):number {
    return p.m;
  }

  private moveParticles(t:number):void{
    const canvas = this.canvasRef.nativeElement;
    this.particles.forEach(p=>{
      if((p.x-this.radius(p))<0 && p.vx<0){
        p.vx=-p.vx;
      }
      if((p.x+this.radius(p))>canvas.width && p.vx>0){
        p.vx=-p.vx;
      }
      if((p.y-this.radius(p))<0 && p.vy<0){
        p.vy=-p.vy;
      }
      if((p.y+this.radius(p))>canvas.height && p.vy>0){
        p.vy=-p.vy;
      }   
      p.x+=p.vx*t;
      p.y+=p.vy*t;
    });
  }


  protected onSubmitParticle = (x:number,y:number,vx:number,vy:number,m:number) => {
    this.particles.push({x:x,y:y,vx:vx,vy:vy,m:m});
    this.draw();
  }

  protected clearAll() {
    this.particles = [];
    this.isRunning=false;
    this.stop();
    this.draw();
  }

  ngAfterViewInit() {
    this.particles = [];
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.draw(); // Draw initial frame
  }


  public addParticle() {
    this.isRunning=false;
    this.stop();
    this.particleEditDialog.show();
  }


  toggleAnimation() {
    this.isRunning ? this.stop() : this.start();
  }

  private start() {
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.animate(this.lastTimestamp);
  }

  private stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
  }

  private animate = (timestamp: number) => {
    if (!this.isRunning) return;

    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // seconds
    this.calculateSpeeds(deltaTime);
    this.moveParticles(deltaTime);

    this.lastTimestamp = timestamp;

    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach(p=>{
      this.drawParticle(p);
    });

    this.animationFrameId = requestAnimationFrame(this.animate);
  };


  private drawParticle(p:Particle):void {
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, this.radius(p), 0, Math.PI * 2);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.closePath();
  }

  private draw():void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.particles.forEach(p=>{
      this.drawParticle(p);
    });
  }

  ngOnDestroy() {
    this.stop();
  }


}
