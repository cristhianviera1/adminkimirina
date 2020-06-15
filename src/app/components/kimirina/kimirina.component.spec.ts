import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KimirinaComponent } from './kimirina.component';

describe('KimirinaComponent', () => {
  let component: KimirinaComponent;
  let fixture: ComponentFixture<KimirinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KimirinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KimirinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
