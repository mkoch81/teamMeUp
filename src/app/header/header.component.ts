import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { NewMemberComponent } from '../new-member/new-member.component';
import { DialogService } from '../services/dialog.service';
import { NewMemberContainerComponent } from '../new-member-container/new-member-container.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // @Input() memberCreationActive = false;
  // @Output() newCreationEvent = new EventEmitter<boolean>();

  constructor(private teamsService:TeamsService, private dialogService: DialogService){}

  
  openCreateMemberForm() {
    const dialogRef = this.dialogService.open(NewMemberContainerComponent, {data: 'John'});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed! with result: ' + result);
    })
  }

  createTeams() {

    this.teamsService.createTeams();
  }
}
