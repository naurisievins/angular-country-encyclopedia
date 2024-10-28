import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Country } from '../../models/country.model';
import { LazyLoadImageModule } from 'ng-lazyload-image';

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
