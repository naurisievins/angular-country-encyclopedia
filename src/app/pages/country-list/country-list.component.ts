import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CountryItemLg } from '../../components/country-item-lg/country-item-lg.component';

import { PopulationRankingService } from '../../services/population-ranking/population-ranking.service';

import { Country } from '../../models/country.model';

import config from '../../config/config.json';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    CommonModule,
    CountryItemLg,
    SpinnerComponent,
  ],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css',
})
export class CountryListComponent {
  countries: Country[] = [];
  searchTerm = '';
  visibleSearchTerm = '';
  private searchSubject: Subject<string> = new Subject<string>();
  displayedColumns: string[] = ['number', 'name', 'code', 'favorites'];
  favorites: Set<string> = new Set();
  loading = false;

  ngOnInit() {
    this.fetchCountries('');

    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe(searchTerm => this.fetchCountries(searchTerm));
  }

  constructor(
    private http: HttpClient,
    private populationRankingService: PopulationRankingService
  ) {}

  fetchCountries(searchTerm: string) {
    const sanitizedTerm = this.sanitizeSearchTerm(searchTerm);

    const fields = 'name,cca2,flags,area,population,capital';
    const apiUrl = `${config.countriesApi}all?fields=${fields}`;
    const searchApiUrl = `${config.countriesApi}translation/${sanitizedTerm}?fields=${fields}`;

    this.loading = true;
    this.visibleSearchTerm = sanitizedTerm;

    this.http.get<Country[]>(sanitizedTerm ? searchApiUrl : apiUrl).subscribe({
      next: data => {
        this.countries = data;
        this.loading = false;

        if (!sanitizedTerm.length) {
          const populationArray = data
            .map(country => country.population)
            .filter(pop => pop != null);
          this.populationRankingService.setPopulation(populationArray);
        }
      },
      error: error => {
        this.countries = [];
        this.loading = false;
      },
    });
  }

  onSearchTermChange() {
    this.searchSubject.next(this.searchTerm);
  }

  toggleFavorite(country: Country): void {
    if (this.isFavorite(country)) {
      this.favorites.delete(country.cca2);
    } else {
      this.favorites.add(country.cca2);
    }
  }

  isFavorite(country: Country): boolean {
    return this.favorites.has(country.cca2);
  }

  // Only allows letters (A-Z, a-z) and latin-based characters
  sanitizeSearchTerm(searchTerm: string): string {
    return searchTerm.replace(/[^a-zA-Z\u00C0-\u017F]/g, '');
  }
}
