import { Component, Inject } from '@angular/core';
import { DialogRef } from '../services/dialog.ref';
import { DIALOG_DATA } from '../services/dialog-token';
import { Member, TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-new-member-container',
  templateUrl: './new-member-container.component.html',
  styleUrls: ['./new-member-container.component.scss']
})
export class NewMemberContainerComponent {

  constructor(private teamsService: TeamsService, private dialogRef: DialogRef, @Inject(DIALOG_DATA) public data:string){}


  close(name:string) {
    this.dialogRef.close();
    const newMember:Member = new Member(1,name,true,'',0);
    this.teamsService.createNewMember(newMember);
    this.teamsService.createTeams();    

  }
}
