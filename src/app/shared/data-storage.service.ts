import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }


  saveRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put<Recipe[]>(
      "https://ng-angular-course-projec-b6d01-default-rtdb.firebaseio.com/recipes.json", recipes,
    ).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      "https://ng-angular-course-projec-b6d01-default-rtdb.firebaseio.com/recipes.json",
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] };
        });
      })
      , tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }
      ));
  }
}
