import { Component } from '@angular/core';
import { Member } from '../services/teams.service';
import { Input } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-team-list-element',
  templateUrl: './team-list-element.component.html',
  styleUrls: ['./team-list-element.component.scss']
})
export class TeamListElementComponent {

  @Input() member:Member|undefined;

  constructor(private settingsService: SettingsService) {}

  toggleSelection() {
    if (this.member === undefined) return
    this.member!.active = !this.member!.active;
  }

  getElementColor(member:Member) {
    // color not active
    if (!this.settingsService.settings.colored) {
      return { 'background-color': '#fc1703' };
    }
    // member exists
    if (member !== undefined) {
      return { 'background-color': member.color };
    }
    // fallback
    return { 'background-color': 'transparent' };
  }
}
