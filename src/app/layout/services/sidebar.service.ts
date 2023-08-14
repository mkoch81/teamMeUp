import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private expand = new Subject<number>();
  expand$ = this.expand.asObservable();

  private resizeSidebar = new Subject<boolean>();
  resizeSidebar$ = this.resizeSidebar.asObservable();
  
  constructor() { }

  onResize(re: boolean) {
    this.resizeSidebar.next(re);
  }
}
