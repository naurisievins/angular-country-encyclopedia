import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FavoriteService } from '../../services/favorite/favorite.service';
import { FavCountry, Country } from '../../models/country.model';

@Component({
  selector: 'app-favorites-dropdown',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './favorites-dropdown.component.html',
  styleUrls: ['./favorites-dropdown.component.css'],
})
export class FavoritesDropdownComponent {
  @Input() country!: Country;

  favoriteCountries: FavCountry[] = [];
  private favoritesSubscription: Subscription;
  isMenuOpen = false;

  constructor(private favoriteService: FavoriteService) {
    this.favoritesSubscription = this.favoriteService
      .getFavoritesObservable()
      .subscribe(favorites => {
        this.favoriteCountries = favorites;
      });
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }

  removeFromFavorites(country: FavCountry) {
    this.favoriteService.removeFromFavorites(country);
  }

  onMenuOpen(): void {
    this.isMenuOpen = true;
  }
  onMenuClose(): void {
    this.isMenuOpen = false;
  }
}
