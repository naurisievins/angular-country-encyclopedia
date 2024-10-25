import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { FavoriteService } from '../../services/favorite/favorite.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Country {
  name: {
    common: string
  }; // Common name of the country
  cca2: string; // Official name of the country
}

@Component({
  selector: 'app-country-search-item',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './country-search-item.component.html',
  styleUrl: './country-search-item.component.css'
})
export class CountrySearchItemComponent {
  @Input() country: any; // Define your country type appropriately

  constructor(private favoriteService: FavoriteService) {}

  toggleFavorite(country: Country): void {
    this.favoriteService.toggleFavorite(country);
  }

  isFavorite(country: Country): boolean {
    return this.favoriteService.isFavorite(country);
  }
}
