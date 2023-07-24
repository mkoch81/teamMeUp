import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { NewMemberContainerComponent } from '../new-member-container/new-member-container.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // @Input() memberCreationActive = false;
  // @Output() newCreationEvent = new EventEmitter<boolean>();

  constructor(private teamsService:TeamsService, public router:Router){}

  
  openCreateMemberForm() {
    this.router.navigateByUrl('dialog');
    // const dialogRef = this.dialogService.open(NewMemberContainerComponent, {data: 'John'});

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('Dialog closed! with result: ' + result);
    // })
  }

  navigateToMembers() {
    this.router.navigateByUrl('members');
  }

  createTeams() {

    this.teamsService.createTeams();
  }
}
