import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService implements OnInit {

  teamURL = 'http://localhost:3000/teams';
  memberURL = 'http://localhost:3000/members';

  colors = ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'];
  teams: Team[] = [];
  members: Member[] = [];

  constructor(private httpClient: HttpClient, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.loadTeams();
    this.loadMembers();
  }

  loadTeams() {
    this.httpClient.get<Team[]>(this.teamURL)
      .subscribe({
        next: result => this.teams = result,
        error: err => console.log('Error loading teams: ' + err)
      });
  }

  loadMembers() {
    this.httpClient.get<Member[]>(this.memberURL)
      .subscribe({
        next: result => this.members = result,
        error: err => console.log('Error loading teams: ' + err)
      });
  }

  async createTeams() {
    this.clearTeamsOnline().subscribe({
      error: err => console.log('Error clearing teams ' + err),
      complete: () => {
        this.creatTeams();
      } 
    });    
  }

  creatTeams() {
    let sett = this.settingsService.settings;
    this.teams = [];
    // could be we will have remaining members without teams so remove references to old teams
    this.members.forEach(element => element.team = -1);
    // remove all inactive members for new team creation
    let tmpMembers = Array.from(
      this.members.filter(member => member.active)
    );

    let teamCount = 0;
    let teamSize = 0;
    if (sett.groups) {

      teamCount = sett.numberOfTeams;
      teamSize = Math.floor(tmpMembers.length / teamCount);

      if (teamSize < 1) {
        alert('You do not have enough (active) members to create this number of teams');
        return;
      }
    } else if (sett.members) {

      teamSize = sett.numberOfMembers;
      teamCount = Math.floor(tmpMembers.length / teamSize);
      // if not enough members show alert
      if (teamCount <= 1) {
        alert('You do not have enough (active) members to create at least 2 teams');
        return;
      }
    } else if (!sett.oneAgainstAll) {

      alert('Please select at least the teams, the member count  OR the "One Against All" option to create teams.')
      return;
    }

    if (sett.oneAgainstAll) {
      let randomizer = this.getRandomInt(0, tmpMembers.length)

      let soloTeam: Team = new Team(1, `Solo Team`, [], this.colors[0]);
      this.teams.push(soloTeam);

      let foundMember = tmpMembers[randomizer];
      foundMember.color = soloTeam.color;
      soloTeam.members.push(foundMember);
      foundMember.team = soloTeam.id;
      tmpMembers.splice(randomizer, 1);

      let team: Team = new Team(2, `Team against 1`, [...tmpMembers], this.colors[1]);
      team.members.forEach(member => {
        member.color = team.color;
        member.team = team.id;
      });
      this.teams.push(team);
      this.createOrUpdateTeams();
      this.updateMembers();
      return;
    }

    // normal creation of teams
    for (let i = 0; i < teamCount; i++) {
      let colorId = i % this.colors.length;
      let team: Team = new Team(i+1, `Team ${i+1}`, [], this.colors[colorId]);
      this.teams.push(team);

      for (let i = 0; i < teamSize; i++) {
        let randomizer = this.getRandomInt(0, tmpMembers.length)

        let foundMember = tmpMembers[randomizer];
        foundMember.color = team.color;
        team.members.push(foundMember);
        foundMember.team = team.id;
        tmpMembers.splice(randomizer, 1);
      }
    }
    // nooneIsLeftBehind spreading all remaining members onto created teams
    if (tmpMembers.length > 0) {
      if (sett.noOneIsLeftBehind) {

        for (let i = 0; i < tmpMembers.length; i++) {
          let randomizer = this.getRandomInt(0, tmpMembers.length)
          let foundMember = tmpMembers[randomizer];

          let fillupTeam = this.teams[i];
          foundMember.color = fillupTeam.color;
          fillupTeam.members.push(foundMember);
          foundMember.team = fillupTeam.id;
          tmpMembers.splice(randomizer, 1);
        }
      }
    }
    this.createOrUpdateTeams();
    this.updateMembers();
  }

  createOrUpdateTeams() {
    this.teams.forEach(element => {
      this.httpClient.post(this.teamURL, element).subscribe(
        {
          error: (e) => {
            console.log('Error posting team ' + element.id)
            this.httpClient.put(this.teamURL + '/' + element.id, element).subscribe({
              error: err => console.log('Error updating Team ' + element.id + 'with error ' + err),
              complete: () => console.log('Success updating team ' + element.id)
            })
        },
          complete: () => console.info('Success createOrUpdateTeams')
        }
      );
    });
  }

  clearTeamsOnline():Observable<any> {
    let obsArray:Observable<any>[] = []
    this.teams.forEach(team => {
      obsArray.push(this.httpClient.delete(this.teamURL + '/' + team.id));
    });
    return combineLatest(obsArray);
  }

  updateTeam(team: Team) {
    this.httpClient.put(this.teamURL + '/' + team.id, team).subscribe();
  }

  updateTeamName(id: number, name: string) {
    let team = this.teams.find(e => e.id === id)
    if (team != undefined) {
      team!.name = name;
      this.updateTeam(team);
    }
  }

  createNewMember(member: Member) {
    let ids: number[] = [];
    this.httpClient.get<Member[]>(this.memberURL).subscribe(e => {
      e.forEach(element => {
        ids.push(element.id);
      });
    });
    ids.sort((a, b) => a - b);
    member.id = ids[ids.length - 1] + 1;
    this.postMember(member);
    this.members.push(member);
  }

  postMember(member: Member) {
    this.httpClient.post(this.memberURL, member).subscribe();
  }

  updateMembers() {
    this.members.forEach(element => this.updateMember(element));
  }

  updateMember(member: Member) {
    this.httpClient.put(this.memberURL + '/' + member.id, member).subscribe();
  }

  deleteMember(member: Member) {
    this.httpClient.delete(this.memberURL + '/' + member.id).subscribe();
    this.members.splice(this.members.findIndex(element => element === member), 1);
  }

  getRandomInt(min: number, max: number) {
    // only for safety not really required when providing int values
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export class Member {
  constructor(public id: number, public name: string, public active: boolean, public color: string, public team: number, public image: string) { }
}

export class Team {
  constructor(public id: number, public name: string, public members: Member[], public color: string) { }
}