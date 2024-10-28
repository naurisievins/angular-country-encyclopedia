import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryItemSm } from './country-item-sm.component';

describe('CountrySearchItemComponent', () => {
  let component: CountryItemSm;
  let fixture: ComponentFixture<CountryItemSm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryItemSm],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryItemSm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
