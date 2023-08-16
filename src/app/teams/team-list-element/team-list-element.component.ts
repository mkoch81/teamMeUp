import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Member } from 'src/app/services/teams.service';

@Component({
  selector: 'app-team-list-element',
  templateUrl: './team-list-element.component.html',
  styleUrls: ['./team-list-element.component.scss']
})
export class TeamListElementComponent {

  @Input() member:Member|undefined;

  constructor(private settingsService: SettingsService) {}

  getElementColor(member:Member) {
    // color not active
    if (!this.settingsService.settings.colored) {
      return { 'background-color': '#dddddd' };
    }
    // member exists
    if (member !== undefined) {
      return { 'background-color': member.color };
    }
    // fallback
    return { 'background-color': 'transparent' };
  }
}
