import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CountryItemSm } from '../../components/country-item-sm/country-item-sm.component';

import { FavoriteService } from '../../services/favorite/favorite.service';
import { PopulationRankingService } from '../../services/population-ranking/population-ranking.service';

import { Country } from '../../models/country.model';

import config from '../../config/config.json';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    SpinnerComponent,
    MatTableModule,
    CountryItemSm,
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
})
export class CountryDetailComponent {
  countryCca2Code: string | null = null;
  countryData: Country | null = null;
  countriesByLang: Country[] | null = null;
  loadingCountryData = false;
  loadingCountriesByLang = false;
  selectedLanguage = '';
  dataSource: Array<{ [key: string]: string }> = [];
  displayedColumns = ['CCA2', 'CCN3', 'CCA3', 'CIOC'];
  rankByPopulation: number | string = 'unknown';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private favoriteService: FavoriteService,
    private location: Location,
    private populationRankingService: PopulationRankingService
  ) {}

  ngOnInit(): void {
    this.countryCca2Code = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(params => {
      this.countryCca2Code = params.get('cca2');
      if (this.countryCca2Code) {
        this.getCountryByCode(this.countryCca2Code);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(country: Country): void {
    this.favoriteService.toggleFavorite(country);
  }

  isFavorite(country: Country): boolean {
    return this.favoriteService.isFavorite(country.cca2);
  }

  getCountryByCode(countryCode: string): void {
    const fields =
      'name,cca2,ccn3,cca3,cioc,population,flags,area,languages,borders';
    const apiUrl = `${config.countriesApi}alpha/${countryCode}?fields=${fields}`;

    this.loadingCountryData = true;
    this.http.get<Country>(apiUrl).subscribe({
      next: data => {
        this.countryData = data;
        this.dataSource = [
          {
            CCA2: this.countryData.cca2 || 'N/A',
            CCN3: this.countryData.ccn3 || 'N/A',
            CCA3: this.countryData.cca3 || 'N/A',
            CIOC: this.countryData.cioc || 'N/A',
          },
        ];

        this.rankByPopulation =
          this.populationRankingService.getRankByPopulation(data.population);
        this.loadingCountryData = false;

        const firstKey = Object.keys(data.languages)[0];
        if (firstKey) {
          this.getCountriesByLang(data.languages[firstKey]);
        }
      },
      error: error => {
        this.loadingCountryData = false;
        console.error('Error fetching country data:', error);
      },
    });
  }

  getCountriesByLang(language: string): void {
    const fields = 'name,cca2,flags';
    const apiUrl = `${config.countriesApi}lang/${language}?fields=${fields}`;

    this.loadingCountriesByLang = true;
    this.selectedLanguage = language;
    this.http.get<Country[]>(apiUrl).subscribe({
      next: data => {
        this.countriesByLang = data;
        this.loadingCountriesByLang = false;
      },
      error: error => {
        this.loadingCountriesByLang = false;
        console.error('Error fetching countries:', error);
      },
    });
  }
}
