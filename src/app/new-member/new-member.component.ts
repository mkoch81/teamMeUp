import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Member, TeamsService } from '../services/teams.service';


@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent {
  @Output() newCreationEvent = new EventEmitter<string>();
  @Input() name = '';
  
  newMemberForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private teamsService: TeamsService,){}

  onSubmit() {
    const fv = this.newMemberForm.value;
    this.newCreationEvent.emit();

    const newMember:Member = new Member(1,fv.name!,true,'',-1);
    this.teamsService.createNewMember(newMember);
  }

}
