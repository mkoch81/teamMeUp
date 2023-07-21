import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


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

  constructor(private fb: FormBuilder){}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const fv = this.newMemberForm.value;
    this.newCreationEvent.emit(fv.name!);
  }

}
