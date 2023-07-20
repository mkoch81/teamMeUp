import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Member, TeamsService } from '../teams.service';
@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent {

  newMemberForm = this.fb.group({
    name: ['', Validators.required],
    meta: this.fb.group({
      description: [''],
      price: [1, Validators.min(0)]
    })
  });

  constructor(private fb: FormBuilder, private teamsService:TeamsService){}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.newMemberForm.value);
    const fv = this.newMemberForm.value;
    const newMember:Member = new Member(1,fv.name!,true,'');
    this.teamsService.createNewMember(newMember);
    
  }
}
