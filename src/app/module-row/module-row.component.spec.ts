import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRowComponent } from './module-row.component';

describe('ModuleRowComponent', () => {
  let component: ModuleRowComponent;
  let fixture: ComponentFixture<ModuleRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
