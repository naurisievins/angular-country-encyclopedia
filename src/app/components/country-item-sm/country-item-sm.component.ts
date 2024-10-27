import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { FavoriteService } from '../../services/favorite/favorite.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-item-sm',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './country-item-sm.component.html',
  styleUrl: './country-item-sm.component.css'
})
export class CountryItemSm {
  @Input() country: any; // TODO

  constructor(private favoriteService: FavoriteService) {}

  toggleFavorite(country: Country): void {
    this.favoriteService.toggleFavorite(country);
  }

  isFavorite(country: Country): boolean {
    return this.favoriteService.isFavorite(country.cca2);
  }
}
