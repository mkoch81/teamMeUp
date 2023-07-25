import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRenameComponent } from './team-rename.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogComponent } from '../dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';

describe('TeamRenameComponent', () => {
  let component: TeamRenameComponent;
  let fixture: ComponentFixture<TeamRenameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PortalModule
      ],
      declarations: [TeamRenameComponent, DialogComponent]
    });
    fixture = TestBed.createComponent(TeamRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
