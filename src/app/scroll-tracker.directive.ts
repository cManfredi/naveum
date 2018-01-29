import { Directive } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTracker]'
})
export class ScrollTrackerDirective {

  scrollDir: string;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const tracker = event.tracker;
    console.log(tracker);
  }

}
