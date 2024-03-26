/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class OffcanvasService {
  
  constructor(private offcanvasService: NgbOffcanvas) { }

  openOffCanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {position: 'end'});
  }
}
