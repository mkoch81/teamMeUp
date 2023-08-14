import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container/main-container.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ResizeSidebarDirective } from './directives/resize-sidebar.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    MainContainerComponent,
    SettingsComponent,
    HeaderComponent,
    FooterComponent,
    ResizeSidebarDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [
    MainContainerComponent, 
    FooterComponent
  ],
  providers: [ResizeSidebarDirective]
})
export class LayoutModule { }
