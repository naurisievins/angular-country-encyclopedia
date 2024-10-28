import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesDropdownComponent } from './favorites-dropdown.component';

describe('FavoritesDropdownComponent', () => {
  let component: FavoritesDropdownComponent;
  let fixture: ComponentFixture<FavoritesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
