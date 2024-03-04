import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe: Recipe;
  @Input('recipeIndex') recipeIndex: number;

  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
  }
}