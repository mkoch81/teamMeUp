import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Member, TeamsService } from '../services/teams.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent {
  @Input() name = '';
  
  newMemberForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private teamsService: TeamsService,private router: Router){}

  onSubmit() {
    const fv = this.newMemberForm.value;

    const newMember:Member = new Member(1,fv.name!,true,'',-1);
    this.teamsService.createNewMember(newMember);
    this.router.navigateByUrl('/members');
  }

  cancel() {
    this.router.navigateByUrl('/members');
  }
}
