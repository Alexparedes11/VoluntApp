import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardManagmentComponent } from './event-card-managment.component';

describe('EventCardManagmentComponent', () => {
  let component: EventCardManagmentComponent;
  let fixture: ComponentFixture<EventCardManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCardManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
