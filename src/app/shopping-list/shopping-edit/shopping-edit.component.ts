import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('shoppingListForm') shoppingListForm: NgForm;

  editMode: boolean = false;
  editID: number;
  editItem: Ingredient;
  constructor(private splService: ShoppingListService) { }

  ngOnInit(): void {
    this.splService.ingredientsSelected.subscribe(res => {
      this.editID = +res;
      this.editMode = !Number.isNaN(+res) ? true : false;
      this.initialize();
    })

  }
  private initialize() {
    this.editItem = this.splService.getShoppingListIndex(this.editID);
    this.shoppingListForm.setValue({
      'name': this.editItem.name,
      'amount': this.editItem.amount
    })
  }

  onSubmit(shoppingListForm: NgForm) {
    const newNameInput = shoppingListForm.value.name;
    const newAmountInput = shoppingListForm.value.amount;
    if (this.editMode) {
      this.splService.updateItemToShoppingList(this.editID, new Ingredient(newNameInput, newAmountInput));
    } else {
      this.splService.addItemToShoppingList(new Ingredient(newNameInput, newAmountInput));
    }
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.splService.deleteShoppingListItem(this.editID);
  }
}
