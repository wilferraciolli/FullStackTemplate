import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPhotoComponent } from './person-photo.component';

describe('PersonPhotoComponent', () => {
  let component: PersonPhotoComponent;
  let fixture: ComponentFixture<PersonPhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonPhotoComponent]
    });
    fixture = TestBed.createComponent(PersonPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
