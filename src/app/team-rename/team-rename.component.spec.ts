import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRenameComponent } from './team-rename.component';

describe('TeamRenameComponent', () => {
  let component: TeamRenameComponent;
  let fixture: ComponentFixture<TeamRenameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamRenameComponent]
    });
    fixture = TestBed.createComponent(TeamRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
