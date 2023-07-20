import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnInit {

  settings:Settings = {
    noOneIsLeftBehind:true,
    oneAgainstAll: true,
    groups: true,
    numberOfMembers:2,
    members: true,
    numberOfTeams:2,
    colored: true
  };

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    console.log('Woop');
    this.http.get<Settings>('http://localhost:3000/settings').subscribe(result =>
      this.storeResult(result)
    );
  }

  storeResult(result:Settings){
    this.settings.noOneIsLeftBehind = result.noOneIsLeftBehind;
    this.settings.oneAgainstAll = result.oneAgainstAll;
    this.settings.groups = result.groups;
    this.settings.numberOfTeams = result.numberOfTeams;
    this.settings.members = result.members;
    this.settings.numberOfMembers = result.numberOfMembers;
    this.settings.colored = result.colored;
    console.log('nlb = ' + this.settings.noOneIsLeftBehind);
  }

  storeSettingsOnline() {
    this.http.post('http://localhost:3000/settings', {
      "nooneIsLeftBehind":this.settings.noOneIsLeftBehind,
      "oneAgainstAll":this.settings.oneAgainstAll,
      "groups": this.settings.groups,
      "numberOfTeams": this.settings.numberOfTeams,
      "members": this.settings.members,
      "numberOfMembers": this.settings.numberOfMembers,
      "colored": this.settings.colored
    }).subscribe();
  }


  
  toggleGroups() {
    this.settings.groups = !this.settings.groups;
    this.storeSettingsOnline();
  }

  updateGroupCount(count:number) {
    if (count < 0) return;

    this.settings.numberOfTeams = count;
    this.storeSettingsOnline();
  }

  toggleMembers() {
    this.settings.members = !this.settings.members;
    this.storeSettingsOnline();
  }

  updateMemberCount(count:number) {
    if (count < 0) return;

    this.settings.numberOfMembers = count;
    this.storeSettingsOnline();
  }
  
  toggleNooneIsLeftBehind() {
    this.settings.noOneIsLeftBehind = !this.settings.noOneIsLeftBehind;
    this.settings.oneAgainstAll = false;
    this.storeSettingsOnline();
  }

  toggleOneAgainstAll() {
    this.settings.oneAgainstAll = !this.settings.oneAgainstAll;
    this.settings.noOneIsLeftBehind = false;
    this.storeSettingsOnline();
  }

  toggleColored() {
    this.settings.colored = !this.settings.colored;
    this.storeSettingsOnline();
  }
}

export interface Settings {
  noOneIsLeftBehind:boolean;
  oneAgainstAll:boolean;
  groups:boolean;
  numberOfTeams:number;
  members:boolean;
  numberOfMembers:number;
  colored:boolean;
}

