import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessColumnComponent } from './process-column.component';

describe('ProcessColumnComponent', () => {
  let component: ProcessColumnComponent;
  let fixture: ComponentFixture<ProcessColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
