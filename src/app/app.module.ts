import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';

import { ReactiveFormsModule } from '@angular/forms';
import { TutorialComponent } from './tutorial/tutorial.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogComponent } from './dialog/dialog.component';
import { TeamRenameComponent } from './team-rename/team-rename.component';
import { NewMemberComponent } from './new-member/new-member.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    DialogComponent,
    TeamRenameComponent,
    NewMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    ReactiveFormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    PortalModule,
    OverlayModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
