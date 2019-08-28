import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  private recipes: Recipe[] = [
    {
      id: '1',
      title: "Gado Gado",
      imageUrl: "https://cdn.idntimes.com/content-images/community/2018/04/big-slider-gado-gado-enak-dan-lezat-d15989179c334422677c80293a7b51c0_600x400.jpg",
      ingredients: ['Ketupat', 'Bumbu-Kacang', 'Timun', 'Tauge', 'Bihun']
    },
    {
      id: '2',
      title: "Mie Ayam",
      imageUrl: "http://www.dapurkobe.co.id/wp-content/uploads/mie-goreng-saus-tiram.jpg",
      ingredients: ['Mie']
    }
  ];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
    ;
  }

  getRecipe(recipeId: String) {
    return {
      ...this.recipes.find(recipe => recipe.id === recipeId)
    };
  }

  deleteRecipe(recipeId: String) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id != recipeId;
    });
  }
}
