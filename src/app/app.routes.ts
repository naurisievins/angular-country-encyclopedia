import { Routes } from '@angular/router';

import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { CountryListComponent } from './pages/country-list/country-list.component';

export const routes: Routes = [
  { path: 'country/:cca2', component: CountryDetailComponent },
  { path: '', component: CountryListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
