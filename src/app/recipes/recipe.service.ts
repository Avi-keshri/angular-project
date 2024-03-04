import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();
  shoppingListChanged = new Subject<Ingredient[]>();

  private recipes: Recipe[] = [
    // new Recipe("Tasty Schnitzel", "A super-tasty Schnitzel - just awesome", 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
    //   new Ingredient('Meat', 1),
    //   new Ingredienngt('French Fries', 20)
    // ]),

    // new Recipe("Big fay Burger", "What else you need to say?", 'https://bigfatburgers.com/wp-content/uploads/2019/07/about-2.jpg', [
    //   new Ingredient('Burns', 2),
    //   new Ingredient('Meat', 1)]),

    // new Recipe("Club Sandwich Recipe", "Club Sandwich as suggests is loaded with veggies", 'https://img.freepik.com/free-photo/grilled-sandwich-with-bacon-fried-egg-tomato-lettuce-served-wooden-cutting-board_1150-42571.jpg', [
    //   new Ingredient('Carrot', 10),
    //   new Ingredient('Bread', 20)
    // ])
  ];
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeThroughIndex(index: number) {
    return this.recipes.slice()[index];
  };

  updateRecipeItem(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipeItem(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipeListItem(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
