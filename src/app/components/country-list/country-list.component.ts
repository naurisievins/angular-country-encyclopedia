import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterLink } from '@angular/router'; // Import RouterLink
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and ngFor
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { CountrySearchItemComponent } from '../country-search-item/country-search-item.component';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Interface for country names
interface Country {
  name: {
    common: string
  }; // Common name of the country
  cca2: string; // Official name of the country
  flags: {}
}

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatTableModule,
    MatIconModule,
    CountrySearchItemComponent
  ],  
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})

export class CountryListComponent {
  countries: Country[] = [];
  searchTerm = '';
  private searchSubject: Subject<string> = new Subject<string>();
  displayedColumns: string[] = ['number', 'name', 'code', 'favorites'];
  favorites: Set<string> = new Set();

  ngOnInit() {
    this.fetchCountries('');

    this.searchSubject
    .pipe(debounceTime(500))
    .subscribe((searchTerm) => this.fetchCountries(searchTerm));
  }

  constructor(private http: HttpClient) {}

  fetchCountries(searchTerm: string) {
    const fields = 'name,cca2,flags,area,population,capital';
    const apiUrl = `https://restcountries.com/v3.1/all?fields=${fields}`;
    const searchApiUrl = `https://restcountries.com/v3.1/translation/${searchTerm}?fields=${fields}`;

    this.http.get<Country[]>(searchTerm ? searchApiUrl : apiUrl).subscribe({
      next: (data) => {
        this.countries = data
      },
      error: (error) => {
        this.countries = []
        // console.error('Error fetching countries:', error);
      }
    });
  }

  onSearchTermChange() {
    this.searchSubject.next(this.searchTerm);
  }

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