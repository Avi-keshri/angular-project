import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  open = false;
  id: number;
  selectedRecipeItem: Recipe;
  paramsSubscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rpService: RecipeService) { }

  closeDropDown() {
    this.open = false;
  }
  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.id = +params.id
        this.selectedRecipeItem = this.rpService.getRecipeThroughIndex(+params.id);
      })
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onAddedToShoppingList(ingredients: Ingredient[]) {
    this.rpService.shoppingListChanged.next(ingredients);

  }

  onDeleteRecipe() {
    this.rpService.deleteRecipeListItem(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
