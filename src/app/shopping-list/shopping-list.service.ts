import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsSelected = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 50),
    new Ingredient('Orange', 10)
  ];

  constructor(private recipeService: RecipeService) {
    this.recipeService.shoppingListChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients.push(...ingredients);
    })
  }

  getShoppingList() {
    return this.ingredients.slice();
  }

  getShoppingListIndex(index: number) {
    return this.ingredients[index];
  }

  addItemToShoppingList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateItemToShoppingList(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteShoppingListItem(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addedToShoppingList() {

  }

}
