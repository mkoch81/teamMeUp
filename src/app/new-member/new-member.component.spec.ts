import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberComponent } from './new-member.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogComponent } from '../dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { By } from '@angular/platform-browser';

describe('NewMemberComponent', () => {
  let component: NewMemberComponent;
  let fixture: ComponentFixture<NewMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PortalModule
      ],
      declarations: [NewMemberComponent, DialogComponent]
    });
    fixture = TestBed.createComponent(NewMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call onSubmit with no input',async () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    let element = fixture.debugElement.query(By.css('button')).nativeElement;
    element.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when empty',async () => {
    component.newMemberForm.controls['name'].setValue('');
    expect(component.newMemberForm.valid).toBeFalsy();
  });

  it('form should be valid when filled',async () => {
    component.newMemberForm.controls['name'].setValue('any name');
    expect(component.newMemberForm.valid).toBeTruthy();
  });
});
