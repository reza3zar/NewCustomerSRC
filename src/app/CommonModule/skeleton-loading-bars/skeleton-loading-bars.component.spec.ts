import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoadingBarsComponent } from './skeleton-loading-bars.component';

describe('SkeletonLoadingBarsComponent', () => {
  let component: SkeletonLoadingBarsComponent;
  let fixture: ComponentFixture<SkeletonLoadingBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonLoadingBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonLoadingBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
