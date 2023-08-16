import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams.routing';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamListElementComponent } from './team-list-element/team-list-element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    TeamListComponent,
    TeamListElementComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class TeamsModule { }
