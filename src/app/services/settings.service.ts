import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings:Settings = {
    noOneIsLeftBehind:true,
    oneAgainstAll: true,
    groups: true,
    numberOfMembers:2,
    members: true,
    numberOfTeams:2,
    colored: true
  };

  settings2 = new BehaviorSubject<Settings>(this.settings);
  
  constructor(private http:HttpClient) { 
    this.startUp();
  }

  startUp() {
    this.loadSettings();
  }

  loadSettings() {
    this.http.get<Settings>('http://localhost:3000/settings').subscribe({
      next: result => this.settings = result,
      error: err => console.log('Error loading settings: ' + err)
    });
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

  patch(settings:Partial<Settings>) {
    this.settings2.next({ ...this.settings2.getValue(), ...settings});
  }
  
  toggleGroups() {

    this.settings.groups = !this.settings.groups;
    // reset member selection if set since both can not be active at the same time
    if (this.settings.groups) this.settings.members = false;
    // reset oneAgainstAll since can't both be active
    this.settings.oneAgainstAll = false;
    
    this.storeSettingsOnline();
  }

  updateGroupCount(count:number) {
    if (count < 0) return;

    this.settings.numberOfTeams = count;
    this.storeSettingsOnline();
  }

  toggleMembers() {
    this.settings.members = !this.settings.members;
    // reset group selection if set since both can not be active at the same time
    if (this.settings.members) this.settings.groups = false;
    this.settings.oneAgainstAll = false;
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
    this.settings.groups = false;
    this.settings.members = false;
    this.storeSettingsOnline();
  }

  toggleColored() {
    // const {colored} = this.settings2.getValue();
    // this.patch({colored:  !colored});
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

