import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private teamsService:TeamsService, public router:Router){}
  
  openCreateMemberForm() {
    this.router.navigateByUrl('new-member');
  }

  navigateToMembers() {
    this.router.navigateByUrl('members');
  }

  createTeams() {
    this.teamsService.createTeams();
  }
}
