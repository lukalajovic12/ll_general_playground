import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface WindowSize { width: number, height: number }

@Directive()
export abstract class AreaBase implements OnInit {
    @HostBinding('style.--window-width.px')
    protected windowWidth: number = 700;  
  
    @HostBinding('style.--window-height.px')
    protected windowHeight: number = 700;

    constructor() {}

    ngOnInit() {
        this.updateSizes();
        
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
            this.updateSizes();
    } 
      
    private updateSizes() {
        const sizes = this.updateWindowSizes();
        this.windowWidth = sizes.width;
        this.windowHeight = sizes.height;
    }    

    private updateWindowSizes(): WindowSize {
        const width = window.innerWidth;
        const  height = window.innerHeight - 120;
        const maxSize = 700;
        let svgWidth = Math.min(maxSize, width);
        let svgHeight = Math.min(maxSize, height);
        
        if (svgWidth > svgHeight) {
            svgWidth = svgHeight;
        } else {
            svgHeight = svgWidth;
        }

        return { width: svgWidth, height: svgHeight };
    }
}