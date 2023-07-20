import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() memberCreationActive = false;
  @Output() newCreationEvent = new EventEmitter<boolean>();

  constructor(private teamsService:TeamsService){}
  createMember() {
    this.memberCreationActive = !this.memberCreationActive;
    this.newCreationEvent.emit(this.memberCreationActive);
  }

  createTeams() {

    this.teamsService.createTeams();
  }
}
