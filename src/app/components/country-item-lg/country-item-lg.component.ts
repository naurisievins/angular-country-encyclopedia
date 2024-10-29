import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { FavoriteService } from '../../services/favorite/favorite.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-item-lg',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    CommonModule,
    MatButtonModule,
    NgOptimizedImage,
    LazyLoadImageModule,
  ],
  templateUrl: './country-item-lg.component.html',
  styleUrl: './country-item-lg.component.css',
})
export class CountryItemLg {
  @Input() country!: Country;

  constructor(private favoriteService: FavoriteService) {}

  toggleFavorite(country: Country): void {
    this.favoriteService.toggleFavorite(country);
  }

  isFavorite(country: Country): boolean {
    return this.favoriteService.isFavorite(country.cca2);
  }
}
