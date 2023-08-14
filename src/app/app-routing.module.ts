import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MainContainerComponent } from './layout/main-container/main-container.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TeamRenameComponent } from './team-rename/team-rename.component';
import { NewMemberComponent } from './new-member/new-member.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'app/teams', 
    pathMatch: 'full'
  },
  {
    path: 'app',
    canActivate: [AuthGuardService],
    component: MainContainerComponent,
    children: [
      {
        path: 'teams',
        loadChildren: () =>
          import('./teams/teams.module').then(m => m.TeamsModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule)
      },
      {
        path: 'tutorials',
        component: TutorialComponent
      },
      { 
        path: 'rename-team/:id', 
        component: TeamRenameComponent 
      },
      {
        path: 'new-member',
        component: NewMemberComponent
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
