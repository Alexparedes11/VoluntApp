import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventValidationComponent } from './event-validation.component';

describe('EventValidationComponent', () => {
  let component: EventValidationComponent;
  let fixture: ComponentFixture<EventValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
