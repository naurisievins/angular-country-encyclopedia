import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryItemLg } from './country-item-lg.component';

describe('CountrySearchItemComponent', () => {
  let component: CountryItemLg;
  let fixture: ComponentFixture<CountryItemLg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryItemLg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryItemLg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
