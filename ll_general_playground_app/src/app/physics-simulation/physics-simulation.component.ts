import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AreaBase } from '../area-base';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  m: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-physics-simulation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './physics-simulation.component.html',
  styleUrl: './physics-simulation.component.css'
})
export class PhysicsSimulationComponent extends AreaBase implements AfterViewInit {

  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private selectedIndex = -1;

  public vx = 0;
  public vy = 0;

  public m = 10;

  protected particles: Particle[] = [];

  public gravitationalConstant = 3000;

  private animationFrameId: number = 0;



  protected isRunning= false;

  private lastTimestamp = 0;

  private calculateDistance(p1: Particle, p2: Particle): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }


  private calculateSpeed(p1: Particle, p2: Particle, t: number): void {
    let k = (this.gravitationalConstant * (p1.m * p2.m) / this.calculateDistance(p1, p2) ** 3);
    let fx = k * (p1.x - p2.x);
    let fy = k * (p1.y - p2.y);
    p1.vx -= t * fx / p1.m;
    p1.vy -= t * fy / p1.m;
    p2.vx += t * fx / p2.m;
    p2.vy += t * fy / p2.m;
    if (this.calculateDistance(p1, p2) < this.radius(p1) + this.radius(p2)) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p2.y;
      const distSq = dx * dx + dy * dy;
      const dvx = p1.vx - p2.vx;
      const dvy = p1.vy - p2.vy;
      const dot = dvx * dx + dvy * dy;
      const totalMass = p1.m + p2.m;
      const collisionScale = (2 * dot) / (totalMass * distSq);

      p1.vx = p1.vx - collisionScale * p2.m * dx,
        p1.vy = p1.vy - collisionScale * p2.m * dy
      p2.vx = p2.vx + collisionScale * p1.m * dx,
        p2.vy = p2.vy + collisionScale * p1.m * dy

    }
  }

  private calculateSpeeds(t: number): void {
    for (let i = 0; i < this.particles.length - 1; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        this.calculateSpeed(this.particles[i], this.particles[j], t);
      }
    }
  }

  private radius(p: Particle): number {
    return p.m;
  }

  private moveParticles(t: number): void {
    const canvas = this.canvasRef.nativeElement;
    this.particles.forEach(p => {
      if ((p.x - this.radius(p)) < 0 && p.vx < 0) {
        p.vx = -p.vx;
      }
      if ((p.x + this.radius(p)) > canvas.width && p.vx > 0) {
        p.vx = -p.vx;
      }
      if ((p.y - this.radius(p)) < 0 && p.vy < 0) {
        p.vy = -p.vy;
      }
      if ((p.y + this.radius(p)) > canvas.height && p.vy > 0) {
        p.vy = -p.vy;
      }
      p.x += p.vx * t;
      p.y += p.vy * t;
    });
  }

  protected clearAll() {
    this.particles = [];
    this.isRunning = false;
    this.stop();
    this.draw();
  }

  protected updateSelected() {
    if (this.selectedIndex !== -1) {
      this.particles[this.selectedIndex].m = this.m;
      this.particles[this.selectedIndex].vx = this.vx;
      this.particles[this.selectedIndex].vy = this.vy;
    }
    this.draw();
  }

  protected removeSelected() {
    if (this.selectedIndex !== -1) {
      this.particles.splice(this.selectedIndex, 1);
      this.selectedIndex = -1;
    }
    this.draw();
  }

  ngAfterViewInit() {
    this.particles = [];
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.draw();
  }


  public addParticle() {
    this.particles.push({ x: 10, y: 10, vx: this.vx, vy: this.vy, m:  this.m  });
    this.selectedIndex = this.particles.length - 1;
    this.isRunning = false;
    this.draw();
  }

  public editParticle() {
    this.isRunning = false;
  }

  protected onCanvasClick(event: MouseEvent) {
    if (this.isRunning === false) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();

      // Account for canvas scaling
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const clickX = (event.clientX - rect.left) * scaleX;
      const clickY = (event.clientY - rect.top) * scaleY;
      let found = false;
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (Math.sqrt((p.x - clickX) ** 2 + (p.y - clickY) ** 2) < this.radius(p)) {
          this.selectedIndex = i;
          found = true;
          break;
        }
      }

      if (this.selectedIndex !== -1 && !found) {
        this.particles[this.selectedIndex].x = clickX;
        this.particles[this.selectedIndex].y = clickY;
      }
    }
    this.draw();
  }

  public toggleAnimation() {
    this.isRunning === true ? this.stop() : this.start();
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
    if (this.isRunning !== true) return;

    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // seconds
    this.calculateSpeeds(deltaTime);
    this.moveParticles(deltaTime);

    this.lastTimestamp = timestamp;

    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach((_p, i) => {
      this.drawParticle(i);
    });

    this.animationFrameId = requestAnimationFrame(this.animate);
  };


  private drawParticle(index: number): void {
    const p = this.particles[index];
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.m, 0, Math.PI * 2);
    if (this.selectedIndex === index && this.isRunning === false) {
      this.ctx.fillStyle = 'red';
    } else {
      this.ctx.fillStyle = 'blue';
    }
    this.ctx.fill();
    this.ctx.closePath();
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.particles.forEach((_p, i) => {
      this.drawParticle(i);
    });
  }

  ngOnDestroy() {
    this.stop();
  }


}
