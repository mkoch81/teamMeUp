import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersRoutingModule } from './members.routing';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule,
    MatButtonModule
  ]
})
export class MembersModule { }
