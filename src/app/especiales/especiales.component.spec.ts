import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialesComponent } from './especiales.component';

describe('EspecialesComponent', () => {
  let component: EspecialesComponent;
  let fixture: ComponentFixture<EspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
