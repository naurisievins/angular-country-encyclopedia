import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { FavoriteService } from '../../services/favorite/favorite.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-item-sm',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule, MatButtonModule],
  templateUrl: './country-item-sm.component.html',
  styleUrl: './country-item-sm.component.css',
})
export class CountryItemSm {
  @Input() country!: Country;

  constructor(private favoriteService: FavoriteService) {}

  toggleFavorite(country: Country): void {
    this.favoriteService.toggleFavorite(country);
  }

  isFavorite(country: Country): boolean {
    return this.favoriteService.isFavorite(country.cca2);
  }
}
