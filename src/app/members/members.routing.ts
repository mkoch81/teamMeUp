import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { NewMemberComponent } from '../new-member/new-member.component';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
