import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberContainerComponent } from './new-member-container.component';

describe('NewMemberContainerComponent', () => {
  let component: NewMemberContainerComponent;
  let fixture: ComponentFixture<NewMemberContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMemberContainerComponent]
    });
    fixture = TestBed.createComponent(NewMemberContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
