import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySearchItemComponent } from './country-search-item.component';

describe('CountrySearchItemComponent', () => {
  let component: CountrySearchItemComponent;
  let fixture: ComponentFixture<CountrySearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySearchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
