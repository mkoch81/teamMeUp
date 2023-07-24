import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamListComponent } from './team-list/team-list.component';
import {MatListModule} from '@angular/material/list';
import { TeamListElementComponent } from './team-list-element/team-list-element.component';
import { NewMemberComponent } from './new-member/new-member.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NewMemberContainerComponent } from './new-member-container/new-member-container.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DialogComponent } from './dialog/dialog.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    TeamListComponent,
    TeamListElementComponent,
    NewMemberContainerComponent,
    NewMemberComponent,
    DialogComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
