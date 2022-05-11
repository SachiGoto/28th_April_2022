import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUSerComponent } from './update-user.component';

describe('UpdateUSerComponent', () => {
  let component: UpdateUSerComponent;
  let fixture: ComponentFixture<UpdateUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
