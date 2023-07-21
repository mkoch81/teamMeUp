import { Component, OnInit } from '@angular/core';
import { Member, Team, TeamsService } from '../services/teams.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  constructor(public teamsService:TeamsService, public settingsService:SettingsService){}

  ngOnInit(): void {
    // this.teamsService.loadTeams();
    this.teamsService.loadMembers();
  }

}