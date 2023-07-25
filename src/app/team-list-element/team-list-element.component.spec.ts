import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListElementComponent } from './team-list-element.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamListElementComponent', () => {
  let component: TeamListElementComponent;
  let fixture: ComponentFixture<TeamListElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TeamListElementComponent]
    });
    fixture = TestBed.createComponent(TeamListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
