import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<boolean>();

  constructor(private teamsService:TeamsService, public router:Router){}

  ngOnInit(): void {
    
  }

  onToggle() {
    this.toggleSidebar.emit();
  }
  
  openCreateMemberForm() {
    this.router.navigateByUrl('/app/new-member');
  }

  navigateToMembers() {
    this.router.navigate(['/app/members']);
  }

  createTeams() {
    this.teamsService.createTeams();
  }
}
