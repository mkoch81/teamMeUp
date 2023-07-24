import { Component } from '@angular/core';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  constructor(public teamsService:TeamsService){};
}
