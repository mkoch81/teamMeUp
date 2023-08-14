import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appResizeSidebar]'
})
export class ResizeSidebarDirective implements AfterViewInit, OnDestroy {

  // define breakpoints
  mobileBreakpoint = 768;
  desktopBreakpoint = 1023;

  sideBar: HTMLElement;
  sub: Subscription;

  constructor(
    private elementRef: ElementRef,
    private sidebarService: SidebarService,
    private router: Router) {
    this.sub = this.sidebarService.resizeSidebar$
      .pipe(distinctUntilChanged()) // resize only when changing to a different status
      .subscribe((resize: boolean) => this.onResizeSidebar(resize));
    
    this.sideBar = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    // this.sideBar = this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private onResizeSidebar(resize: boolean) {
    // TODO check values
    this.sideBar.style.width = resize ? '150px' : '0';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    if (
      event.target.innerWidth > this.mobileBreakpoint &&
      event.target.innerWidth <= this.desktopBreakpoint
    ) {
      this.sidebarService.onResize(true);
    } else if (event.target.innerWidth <= this.mobileBreakpoint) {
      this.sidebarService.onResize(false);
    }
  }
}
