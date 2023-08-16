import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-team-rename',
  templateUrl: './team-rename.component.html',
  styleUrls: ['./team-rename.component.scss']
})
export class TeamRenameComponent {

  renameTeamForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private teamsService: TeamsService,private router: Router, private activatedRoute: ActivatedRoute){
    
    const helperId = this.activatedRoute.snapshot.paramMap.get('id')
    const helper = teamsService.teams.filter(team => team.id === Number(helperId));
    let teamName = '';
    if (helper.length > 0) {
      teamName = helper[0].name;
    }
    this.renameTeamForm.setValue({name: teamName});
  }

  onSubmit() {
    const name = this.renameTeamForm.value.name!;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === null) {
      alert('Could not resolve id from route');
      return;
    }
    this.teamsService.updateTeamName(Number(id), name);
    this.router.navigateByUrl('/app/teams');
  }

  cancel() {
    this.router.navigateByUrl('/app/teams');
  }
}
