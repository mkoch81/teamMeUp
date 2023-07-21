import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewMemberComponent } from './new-member/new-member.component';

const routes: Routes = [
  {path: 'members', component: NewMemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
