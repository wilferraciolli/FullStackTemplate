import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsProfileComponent } from './user-details-profile.component';

describe('UserDetailsProfileComponent', () => {
  let component: UserDetailsProfileComponent;
  let fixture: ComponentFixture<UserDetailsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
