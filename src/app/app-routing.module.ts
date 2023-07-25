import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MembersComponent } from './members/members.component';
import { TeamListComponent } from './team-list/team-list.component';
import { NewMemberComponent } from './new-member/new-member.component';

const routes: Routes = [
  {path: '', component: TeamListComponent},
  {path: 'teams', component: TeamListComponent},
  {path: 'dialog', component: NewMemberComponent},
  {path: 'members', component: MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
