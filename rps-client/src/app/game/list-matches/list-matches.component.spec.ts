import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatchesComponent } from './list-matches.component';
import { HttpClientModule } from '@angular/common/http';

describe('ListMatchesComponent', () => {
  let component: ListMatchesComponent;
  let fixture: ComponentFixture<ListMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ListMatchesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
