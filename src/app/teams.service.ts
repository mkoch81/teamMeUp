import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService implements OnInit {

  teamURL = 'http://localhost:3000/teams';
  memberURL = 'http://localhost:3000/members';

  colors = ['#a442f5', '#e642f5', '#f5426c', '#57f542', '#f5ec42', '#f57e42'];
  teams: Team[] = [];
  members: Member[] = [];

  constructor(private httpClient: HttpClient, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.clearTeams();
  }

  loadTeams() {
    this.httpClient.get(this.teamURL)
      .subscribe(result => this.teams = result as Team[]);
  }

  loadMembers() {
    this.httpClient.get(this.memberURL)
      .subscribe(result => {
        this.storeResult(result as Member[]);
      });
  }

  storeResult(result: Member[]) {
    this.members = result;
  }

  createTeams() {
    this.clearTeams();
    // maybe also clear all teams from the members to avoid issues

    let teamCount = 0;
    let teamSize = 0;
    if (this.settingsService.settings.groups) {
      console.log('Groups selected');
      teamCount = this.settingsService.settings.numberOfTeams;
      teamSize = Math.floor(this.members.length / teamCount);
      if (teamSize < 1) {
        alert('You do not have enough members to create this number of teams');
        return;
      }
    } else if (this.settingsService.settings.members) {
      console.log('Members selected');
      teamSize = this.settingsService.settings.numberOfMembers;
      teamCount = this.members.length / teamSize;
      // if not enough members show alert
      if (teamCount <= 1) {
        alert('You do not have enough members to create at least 2 teams');
        return;
      }
    } else {
      console.log('Nothing selected');
      alert('Please select at least the teams OR the member count to create teams.')
      return;
    }


    // insert branch for oneAgainstAll
    this.teams = [];
    let tmpMembers = Array.from(this.members);
    if (this.settingsService.settings.oneAgainstAll) {
      let randomizer = this.getRandomInt(0, tmpMembers.length)

      let soloTeam: Team = new Team(0, `Solo Team`, [], this.colors[0]);
      this.teams.push(soloTeam);

      let foundMember = tmpMembers[randomizer];
      foundMember.color = soloTeam.color;
      soloTeam.members.push(foundMember);
      foundMember.team = soloTeam.id;
      tmpMembers.splice(randomizer, 1);

      let team: Team = new Team(1, `Team against 1`, [...tmpMembers], this.colors[1]);
      this.teams.push(team);
      this.postTeams();
      return;
    }

    // normal creation of teams
    for (let i = 0; i < teamCount; i++) {

      let team: Team = new Team(i, `Team ${i}`, [], this.colors[i]);
      this.teams.push(team);

      for (let i = 0; i < teamSize; i++) {
        let randomizer = this.getRandomInt(0, tmpMembers.length)

        // while (usedIDs.includes(randomizer)) {
        //   randomizer = this.getRandomInt(0,this.members.length)
        // }

        let foundMember = tmpMembers[randomizer];
        foundMember.color = team.color;
        team.members.push(foundMember);
        foundMember.team = team.id;
        tmpMembers.splice(randomizer, 1);
      }
      console.log(`created team members ${team.members}`);
    }
    // insert option for nooneIsLeftBehind
    if (this.settingsService.settings.noOneIsLeftBehind && tmpMembers.length > 0) {
      console.log(`NooneLeftBehind spreading remaining ${tmpMembers.length} members`);
      let firstTeam = this.teams[0];
      let remainingMember = tmpMembers[0];
      remainingMember.color = firstTeam.color;
      remainingMember.team = firstTeam.id;
      firstTeam.members.push(remainingMember);
    }
    this.postTeams();
  }

  postTeams() {
    this.teams.forEach(element => {
      this.httpClient.post(this.teamURL, element).subscribe();
    });
  }

  clearTeams() {
    let ids: number[] = [];
    this.httpClient.get(this.teamURL).subscribe(e => {
      (e as Team[]).forEach(element => {
        ids.push(element.id);
      });
      ids.forEach(e => {
        this.httpClient.delete(this.teamURL + '/' + e).subscribe();
      })
    })
  }

  createNewMember(member: Member) {
    let ids: number[] = [];
    this.httpClient.get(this.memberURL).subscribe(e => {
      (e as Member[]).forEach(element => {
        ids.push(element.id);
      });
    });
    ids.sort((a, b) => a - b);
    member.id = ids[ids.length - 1] + 1;
    this.postMember(member);
  }

  postMember(member: Member) {
    this.httpClient.post(this.memberURL, member).subscribe();
  }

  getRandomInt(min: number, max: number) {
    // only for safety not really required when providing int values
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export class Member {
  id: number;
  name: string;
  active: boolean;
  color: string;
  team: number | undefined;
  constructor(id: number, name: string, active: boolean, color: string) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.color = color;
  }
}

export class Team {
  id: number;
  name: string;
  members: Member[];
  color: string;
  constructor(id: number, name: string, members: Member[], color: string) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.color = color;
  }
}