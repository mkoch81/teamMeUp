import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Team, TeamsService } from '../services/teams.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-rename',
  templateUrl: './team-rename.component.html',
  styleUrls: ['./team-rename.component.scss']
})
export class TeamRenameComponent {

  renameTeamForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private teamsService: TeamsService,private router: Router, private activatedRoute: ActivatedRoute){}

  onSubmit() {
    const name = this.renameTeamForm.value.name!;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === null) {
      alert('Could not resolve id from route');
      return;
    }
    this.teamsService.updateTeamName(Number(id), name);
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
