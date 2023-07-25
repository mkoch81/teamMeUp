import { Component, OnInit } from '@angular/core';
import { Member, TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(public teamsService:TeamsService){};

  ngOnInit(): void {
    if (this.teamsService.members.length === 0) {
      this.teamsService.loadMembers();
    }
  }

  toggleActive(member:Member) {
    member.active = !member.active;
    this.teamsService.updateMember(member);
  }

  deleteMember(member:Member) {
    this.teamsService.deleteMember(member);
  }
}
