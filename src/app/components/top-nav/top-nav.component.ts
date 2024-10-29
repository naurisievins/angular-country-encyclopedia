import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { FavoritesDropdownComponent } from '../favorites-dropdown/favorites-dropdown.component';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [MatButtonModule, RouterLink, FavoritesDropdownComponent],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
})
export class TopNavComponent {}
