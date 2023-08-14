import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamRenameComponent } from '../team-rename/team-rename.component';

const routes: Routes = [
  {
    path: '', 
    component: TeamListComponent,
    children: [
      
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
