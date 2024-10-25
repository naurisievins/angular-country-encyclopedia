import { Routes } from '@angular/router';

import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';

export const routes: Routes = [
    { path: 'country/:cca2', component: CountryDetailComponent },
    { path: '', component: CountryListComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
