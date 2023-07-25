import { Component, OnInit } from '@angular/core';
import { Team, TeamsService } from '../services/teams.service';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  constructor(public teamsService:TeamsService, public settingsService:SettingsService, private router: Router){}

  ngOnInit(): void {
    this.teamsService.loadMembers();
    this.teamsService.loadTeams();
  }

  checkInactiveMembers(): boolean {
    return this.teamsService.members.find(e => !e.active) != undefined;
  }

  checkNotSelectedMembers(): boolean {
    return this.teamsService.members.find(e => e.team === -1 && e.active) != undefined;
  }

  renameTeam(team: Team) {
    this.router.navigateByUrl(`rename-team/${team.id}`);
  }
}