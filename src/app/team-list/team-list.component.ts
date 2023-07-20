import { Component, OnInit } from '@angular/core';
import { Member, Team, TeamsService } from '../teams.service';
import { SettingsService } from '../settings.service';

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

  getElementColor(member:Member) {
    // color not active
    if (!this.settingsService.settings.colored) {
      return { 'background-color': '#fc1703' };
    }
    // member exists
    if (member !== undefined) {
      return { 'background-color': member.color};
    }
    // fallback
    return { 'background-color': 'transparent'};
  }
}