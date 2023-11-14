/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {
  private currenSectionSubject = new Subject<any>();
  curentSection$ = this.currenSectionSubject.asObservable();
  constructor() { }

  updateCurrentSection(section: string){
    this.currenSectionSubject.next(section);
  }
}
