import { Component } from '@angular/core';
import { Member } from '../teams.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-team-list-element',
  templateUrl: './team-list-element.component.html',
  styleUrls: ['./team-list-element.component.scss']
})
export class TeamListElementComponent {

  @Input() member:Member|undefined;

  constructor() {}

  toggleSelection() {
    if (this.member === undefined) return
    this.member!.active = !this.member!.active;
  }
}
