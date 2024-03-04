import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private splServie: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.splServie.getShoppingList();
    this.splServie.ingredientsChanged.
      subscribe((ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      })
  }

  onEdit(index: number) {
    this.splServie.ingredientsSelected.next(index);
  }
}
