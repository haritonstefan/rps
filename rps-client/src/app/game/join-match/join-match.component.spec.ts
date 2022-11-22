import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMatchComponent } from './join-match.component';

describe('JoinMatchComponent', () => {
  let component: JoinMatchComponent;
  let fixture: ComponentFixture<JoinMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
