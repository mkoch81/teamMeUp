import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'team-me-up';
  settingsActive = true;
  memberCreating = false;

  toggleSettings() {
    this.settingsActive = !this.settingsActive;
  }
  toggleNewMemberCreation() {
    this.memberCreating = !this.memberCreating;
  }
}
