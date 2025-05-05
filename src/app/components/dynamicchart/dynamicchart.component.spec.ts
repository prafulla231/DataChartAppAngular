import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicchartComponent } from './dynamicchart.component';

describe('DynamicchartComponent', () => {
  let component: DynamicchartComponent;
  let fixture: ComponentFixture<DynamicchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
