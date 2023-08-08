import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Member, Team, TeamsService } from '../services/teams.service';
import { SettingsService } from '../services/settings.service';
import { HttpClient } from '@angular/common/http';

class MockTeamsService extends TeamsService {
  override members: Member[] = [
    new Member(1, 'Peter', true, '#a8e6cf', 1, ''),
    new Member(2, 'Gerda', true, '#dcedc1', 2, ''),
    new Member(3, 'Tim', false, '', -1, '')
  ];
  override teams: Team[] = [
    new Team(1,'Team Helden', [new Member(1, 'Peter', true, '#a8e6cf', 1, '')],''),
    new Team(2,'Team Satan', [new Member(2, 'Gerda', true, '#dcedc1', 1, '')],'')
  ];

  override loadMembers(): void {
    
  }
  override loadTeams(): void {
    
  }
}

class MockSettingsService extends SettingsService {

}


describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let service: MockTeamsService;
  let settingsService: MockSettingsService;
  let httpClient:HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MembersComponent],
      providers: [
        {provide: TeamsService, useClass:MockTeamsService},
        {provide: SettingsService, useClass:MockSettingsService}
      ]
    });
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    settingsService = new MockSettingsService(httpClient);
    service = new MockTeamsService(httpClient,settingsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle active state of users', async () => {
    let peter = component.teamsService.members[0];
    peter.active = true;
    component.toggleActive(peter);
    expect(peter.active).toBeFalse();
  })

  it('should remove member from list',async () => {
    let tim = component.teamsService.members[2];
    component.deleteMember(tim);
    expect(component.teamsService.members.length).toBe(2);
  });
});
