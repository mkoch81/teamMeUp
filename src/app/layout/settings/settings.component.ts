import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {

  resize = false;
  resizeSub: Subscription;

  constructor(
    public settingsService:SettingsService,
    private sidebarService: SidebarService,
    public router: Router
    ){
      // for screen sizes between mobile and desktop, resize Sidebar by Default (hide it)
      // app needs to check the size when initializing
      if (window.innerWidth > 768 &&
          window.innerWidth <= 1350) {
            this.resize = true;
          } else {
            this.resize = false;
          }

      this.resizeSub = this.sidebarService.resizeSidebar$.subscribe((result) => this.resize = result)
    }

  ngAfterViewInit(): void {
    this.sidebarService.onResize(this.resize);
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }

  onResizeSidebar() {
    this.sidebarService.onResize(!this.resize);
  }
}
