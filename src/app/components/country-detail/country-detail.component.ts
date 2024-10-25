import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and ngFor

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Country {
  flags: Flag;
  name: Name;
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  languages: { [key: string]: string };
  borders: string[];
  area: number;
  population: number;
}

interface Flag {
  png: string;
  svg: string;
  alt: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

interface NativeName {
  official: string;
  common: string;
}

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent {
  countryCca2Code: string | null = null;
  countryData: Country | null = null

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Access the route parameter here
    this.countryCca2Code = this.route.snapshot.paramMap.get('id');
    
    // Alternatively, if you want to subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      this.countryCca2Code = params.get('cca2');
      if (this.countryCca2Code) {
        this.getCountrByCode(this.countryCca2Code)
      }
    });
  }

  getCountrByCode(countryCode: string): void {
    const fields = 'name,cca2,ccn3,cca3,cioc,population,flags,area,languages,borders';
    const apiUrl = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=${fields}`;

    this.http.get<Country>(apiUrl).subscribe({
      next: (data) => {
        this.countryData = data
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      }
    });
  }
}
