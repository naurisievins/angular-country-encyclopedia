import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopulationRankingService {
  private population: number[] = [];

  constructor() {
    this.loadPopulationFromStorage();
  }

  private loadPopulationFromStorage(): void {
    const storedPopulation = localStorage.getItem('populationRanking');

    if (storedPopulation) {
      this.population = JSON.parse(storedPopulation);
    }
  }
  setPopulation(populationArray: number[]): void {
    this.population = Array.from(new Set(populationArray)).sort(
      (a, b) => b - a
    );
    this.savePopulationToStorage();
  }

  private savePopulationToStorage(): void {
    localStorage.setItem('populationRanking', JSON.stringify(this.population));
  }

  getRankByPopulation(populationNumber: number): number | string {
    const index = this.population.indexOf(populationNumber);
    return index !== -1 ? index + 1 : 'unknown';
  }
}
