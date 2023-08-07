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
  fileName = '';
  base64PlainData:string = "assets/img/avatars/blank.png";

  newMemberForm = this.fb.group({
    name: ['', Validators.required],
    file: ['']
  });

  constructor(private fb: FormBuilder, private teamsService: TeamsService,private router: Router){}

  

  onSubmit() {
    const fv = this.newMemberForm.value;

    let file = this.newMemberForm.value.file;
    // if nothing has been selected set the default
    if (!file || file === "") {
      file = this.base64PlainData;
    }

    let username = fv.name;
    if (!username) {
      alert('You have to provide a username');
      return;
    }

    const newMember:Member = new Member(1,username,true,'',-1,file);
    this.teamsService.createNewMember(newMember);
    this.router.navigateByUrl('/members');
  }

  cancel() {
    this.router.navigateByUrl('/members');
  }

  onFileSelected(event:any) {
    const target = (event.target as HTMLInputElement)
    
    if (target.files === null) {
      console.warn('No files found in the event');
      return;
    }

    const file:File = target.files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onloadend = () => {
        let result = reader.result;
        if (!result) {
          console.warn('file could not be read');
          return;
        }
        // get string from buffer 
        this.base64PlainData = result.toString();
        this.newMemberForm.setValue({name: this.newMemberForm.value.name || '', file: this.base64PlainData});
      };
      reader.readAsDataURL(file);
    }
  }
}
