import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.color = '#e35e6b';
  }
}

// diretiva de atributo
