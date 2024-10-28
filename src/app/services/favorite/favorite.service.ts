import { Injectable } from '@angular/core';
import { Country } from '../../models/country.model';
import { FavCountry } from '../../models/country.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: Map<string, FavCountry> = new Map();
  private favoritesSubject = new BehaviorSubject<FavCountry[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {
    this.loadFavoritesFromStorage();
    this.favoritesSubject.next(this.getFavorites());
  }

  private loadFavoritesFromStorage(): void {
    const storedFavorites = localStorage.getItem('favoriteCountries');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      this.favorites = new Map(
        parsedFavorites.map((item: FavCountry) => [item.cca2!, item])
      );
      this.favoritesSubject.next(this.getFavorites());
    }
  }

  private saveFavoritesToStorage(): void {
    const favoritesArray = Array.from(this.favorites.values());
    localStorage.setItem('favoriteCountries', JSON.stringify(favoritesArray));
  }

  toggleFavorite(country: Country): void {
    if (!country) return;

    if (this.isFavorite(country.cca2)) {
      this.favorites.delete(country.cca2);
      this.showSnackbar(`${country.name.common} removed from favorites.`);
    } else {
      const countryData: FavCountry = {
        name: country.name.common,
        flag: country.flags.svg,
        cca2: country.cca2,
      };
      this.favorites.set(country.cca2, countryData);
      if (country.name.common === 'Latvia') {
        this.showSnackbar(`Latvija pievienota favorītiem! 🤘`);
      } else {
        this.showSnackbar(`${country.name.common} added to favorites.`);
      }
    }
    this.saveFavoritesToStorage();
    this.favoritesSubject.next(this.getFavorites());
  }

  isFavorite(cca2: string): boolean {
    return this.favorites.has(cca2);
  }

  removeFromFavorites(country: FavCountry) {
    if (!country.cca2) return;

    if (this.isFavorite(country.cca2)) {
      this.favorites.delete(country.cca2);
      this.showSnackbar(`${country.name} removed from favorites.`);
      this.saveFavoritesToStorage();
      this.favoritesSubject.next(this.getFavorites());
    }
  }

  getFavorites(): FavCountry[] {
    return Array.from(this.favorites.values());
  }

  getFavoritesObservable() {
    return this.favoritesSubject.asObservable();
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
