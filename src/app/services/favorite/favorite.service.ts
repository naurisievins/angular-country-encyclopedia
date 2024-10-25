// favorite.service.ts
import { Injectable } from '@angular/core';

interface Country {
  name: {
    common: string
  }; // Common name of the country
  cca2: string; // Official name of the country
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Set<string> = new Set();

  toggleFavorite(country: Country): void {
    if (this.isFavorite(country)) {
      this.favorites.delete(country.cca2); // Remove from favorites
    } else {
      this.favorites.add(country.cca2); // Add to favorites
    }
  }

  isFavorite(country: Country): boolean {
    return this.favorites.has(country.cca2); // Check if the country is a favorite
  }
}